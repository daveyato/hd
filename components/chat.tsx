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
import useHigherAIStore from "@/utils/store"


const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
}

export function Chat({ id, initialMessages, className }: ChatProps) {
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
  // const { messages, append, reload, stop, isLoading, input, setInput } =
  //   useChat({
  //     initialMessages,
  //     id,
  //     body: {
  //       id,
  //       previewToken
  //     },
  //     onResponse(response) {
  //       if (response.status === 401) {
  //         toast.error(response.statusText)
  //       }
  //     }
  //   })
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [reload, setReload] = useState<boolean>(true)
  const append = async (msg: Message) => {
    const ctrl = new AbortController()
    setMessages(prevState => [...prevState, msg])

    // const res = await axios.post("/api/chat", {
    //   question: input,
    //   history: '',
    //   namespace: namespaceRef.current
    // }, {
    //   responseType : 'stream'
    // })
    // console.log(res)



    // const sanitizedQuestion = (
    //   input + " Explain as much as detail you can."
    // )
    // const docs = await axios.post(`${API_URL}/api/higherai/getDocs`, {
    //   question: input,
    //   history: '',
    //   namespace: namespaceRef.current
    // })
    // console.log("docs is : ", docs)

    // let data = ""
    // setMessages((prevState) => {
    //   return [...prevState, {
    //     content: "",
    //     role: "assistant"
    //   }]
    // })
    // const chain = loadQAChain(new OpenAIChat({
    //   openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    //   temperature: 0.7,
    //   modelName: "gpt-3.5-turbo",
    //   verbose: true,
    //   streaming: true,
    //   callbackManager: CallbackManager.fromHandlers({
    //     async handleLLMNewToken(token) {
    //       data += token;
    //       console.log(token)
    //       setText(data)
    //     },
    //   }),
    // }),)
    // const res = await chain.call({
    //   input_documents: docs.data,
    //   question: sanitizedQuestion,
    // });
    // console.log(res)
    // setText("")

    // const resA = await axios
    //   .post('/api/chat', {
    //     question: input,
    //     history: '',
    //     namespace: namespaceRef.current
    //   })

    // console.log("res A : ", resA)

    try {
      let data = ""
      setMessages((prevState) => {
        return [...prevState, {
          content: "",
          role: "assistant"
        }]
      })
      fetchEventSource('/api/chat', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: input,
          history: '',
          namespace: namespaceRef.current
        }),
        signal: ctrl.signal,
        onmessage: (event) => {
          console.log("event is : ", event)
          if (event.data === '[DONE]') {
            console.log("done : ")
            setText("")
            ctrl.abort();
          } else {
            console.log(event.data)
            data += JSON.parse(event.data).data
            setText(data)
            // const data = JSON.parse(event.data)
          }
        }
      })
    } catch (err) {
      console.log("error is : ", err)
    }





    // axios
    //   .post('/api/chat', {
    //     question: input,
    //     history: '',
    //     namespace: namespaceRef.current
    //   })
    //   .then(res => {
    //     console.log(res)
    //     setMessages(prevState => [
    //       ...prevState,
    //       { content: res.data.text, role: 'assistant' }
    //     ])
    //     setIsLoading(false)
    //   })
    // setIsLoading(true)


    // const response = await fetch(`${API_URL}/api/higherai/chat`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     question: input,
    //     history: '',
    //     namespace: namespaceRef.current
    //   }),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Connection: "keep-alive"
    //   },
    // });
    // let clone = response.clone();
    // if (response.ok) {
    //   const reader = response.body!.getReader()
    //   let data = ""
    //   const textDecoder = new TextDecoder("utf-8")
    //   while (true) {
    //     const { done, value } = await reader?.read()
    //     if (done) break;
    //     const chunk = textDecoder.decode(value, { stream: !done })
    //     console.log(chunk)
    //   }
    // }


    // const stream = response.data
    // stream.on('data', (data:any) => {
    //   console.log("data ---------------")
    //   data = data.toString()
    //   console.log(data)
    // })
  }
  return (
    <>
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
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
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
