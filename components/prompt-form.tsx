import * as React from 'react'
import Link from 'next/link'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from 'ai/react'
import axios from 'axios'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import * as Tooltip from '@radix-ui/react-tooltip'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist'
import { generateRandomString } from './utils'

GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.8.162/pdf.worker.js`

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  onSubmit: (value: string) => Promise<void>
  isLoading: boolean
  setLoading: React.Dispatch<React.SetStateAction<any>>
}

export function PromptForm({
  onSubmit,
  input,
  setInput,
  isLoading,
  setLoading
}: PromptProps) {
  const inputRef = React.useRef<any>(null)
  const namespaceRef = React.useRef<any>(null)
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputReactRef = React.useRef<HTMLTextAreaElement>(null)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('namespace')
      if (result) {
        console.log('namespace exist : ', result)
        namespaceRef.current = result
      } else {
        const namespace = generateRandomString(10)
        localStorage.setItem('namespace', namespace)
        console.log('namespace not exist : ', namespace)
      }
    }
  }, [])

  React.useEffect(() => {
    if (inputReactRef.current) {
      inputReactRef.current.focus()
    }
  }, [])

  const onUpload = () => {
    console.log('onUpload called')
    inputRef.current.value = ''
    inputRef.current.click()
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('onFileChange called ----------')
    if (event.target.files?.length) {
      setLoading(true)
      const reader = new FileReader()
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        getDocument(ev.target?.result as ArrayBuffer).promise.then(pdf => {
          const promises = Array.from({ length: pdf.numPages }, (_, i) =>
            pdf
              .getPage(i + 1)
              .then(page => page.getTextContent())
              .then(content =>
                content.items.map((item: any) => item.str).join(' ')
              )
          )

          Promise.all(promises).then(async pages => {
            try {
              console.log(pages.join('\n'))
              const result = await axios.post('/api/upload', {
                text: pages.join('\n'),
                namespace: namespaceRef.current
              })
              console.log(
                'File successfully uploaded and stored in Pinecone database ',
                result
              )
              alert("Uploading completed")
              setLoading(false)
            } catch (err) {
              setLoading(false)
              console.log(err)
            }
          })
        })
      }
      reader.readAsArrayBuffer(event.target.files[0])
    }
  }

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        if (!input?.trim()) {
          return
        }
        setInput('')
        await onSubmit(input)
      }}
      ref={formRef}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 rounded-[40px] border">
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          type="file"
          onChange={onFileChange}
        />
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Link
                href="#"
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'absolute left-0 top-4 h-8 w-8 p-0 left-4 border-none shadow-none'
                )}
                onClick={onUpload}
              >
                <IconPlus />
                <span className="sr-only">Upload PDF file</span>
              </Link>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="TooltipContent" sideOffset={5}>
                Upload 1-4 PDF files
                <Tooltip.Arrow className="TooltipArrow" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>



        <Textarea
          ref={inputReactRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute top-4 right-4 ">
          {/* <Tooltip>
            <TooltipTrigger asChild> */}
          <Button
            className='bg-white shadow-none'
            type="submit"
            size="icon"
            disabled={isLoading || input === ''}
          >
            <IconArrowElbow />
            <span className="sr-only">Send message</span>
          </Button>
          {/* </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip> */}
        </div>
      </div>
    </form>
  )
}
