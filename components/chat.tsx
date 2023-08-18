'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState, Dispatch, SetStateAction, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'
import Spinner from './ui/Spinner'
import { generateRandomString, type Message } from '@/components/utils'

import { loadQAChain } from 'langchain/chains'
import { API_URL } from '@/utils/constants'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { pinecone } from "@/utils/pinecone-client.js";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  RetrievalQAChain,
  loadQAStuffChain
} from "langchain/chains";
import { OpenAIChat } from "langchain/llms/openai";
import { CallbackManager } from 'langchain/callbacks';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import useHigherAIStore from "@/store"
import { PromptTemplate } from 'langchain/prompts'
import { QA_PROMPT } from '@/utils/prompt'
import { Header } from './header'


const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
  const { PDFList, setPDFList } = useHigherAIStore()

  const [isUploading, setLoading] = useState<boolean>(false)
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [text, setText] = useState<string>("asdfasdfs")

  const [stop, setStop] = useState(false)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const namespaceRef = useRef<any>(null)
  const respRef = useRef<string>("")
  useEffect(() => {
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

  useEffect(() => {
    if (text == "")
      return
    if (messages.length > 1)
      setMessages((prevState) => {
        const newState = [...prevState];
        newState[newState.length - 1].content = text
        return newState
      })
  }, [text])

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const reload = async () => {
    console.log("reload called ---------")
    const newMsg = messages[messages.length - 2]
    append(newMsg)
  }
  const append = async (msg: Message) => {
    setIsLoading(true)
    const ctrl = new AbortController()
    setMessages(prevState => [...prevState, msg])
    const sanitizedQuestion = (
      input + " Explain as much as detail you can."
    )

    let content = "";
    // for (let i = 0; i < PDFList.length; i++) [
    //   content += `
    //   --------------------------------------
    //   Profile Name :  
    //   This is profile of ${PDFList[i].metadata.source.toString().slice(0, -4)}
    //   Profile Content :
    //   ${PDFList[i].pageContent}
    //   -------------------------------------- \n
    //   `
    // ]

    const DocList = []
    DocList.push({
      metadata: {
        source: "Profile"
      },
      pageContent: content
    })
    console.log("DocList : ", DocList)

    console.log("PDFList : ", PDFList)
    let data = ""
    setMessages((prevState) => {
      return [...prevState, {
        content: "",
        role: "assistant"
      }]
    })

    const chain = loadQAChain(new OpenAIChat({
      openAIApiKey: "sk-" + process.env.NEXT_PUBLIC_KEY,
      temperature: 0.3,
      modelName: "gpt-3.5-turbo-16k",
      verbose: true,
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        async handleLLMNewToken(token) {
          data += token;
          console.log(token)
          setText(data)
        },
      }),
    }), {
      type: "stuff",
      prompt: QA_PROMPT
    })
    const res = await chain.call({
      input_documents: DocList,
      question: sanitizedQuestion,
    });
    console.log(res)
    setText("")
    setIsLoading(false)
  }
  return (
    <>
      <Header />
      {isUploading ? <Spinner /> : ''}
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        reload={reload}
        messages={messages}
        input={input}
        setInput={setInput}
        setLoading={setLoading}
      />

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
