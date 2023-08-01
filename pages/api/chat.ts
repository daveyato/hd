import { API_URL } from '@/utils/constants'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { pinecone } from "@/utils/pinecone-client.js";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import {
  RetrievalQAChain,
} from "langchain/chains";
import { OpenAIChat } from "langchain/llms/openai";
import { CallbackManager } from 'langchain/callbacks';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import useHigherAIStore from "@/utils/store"
import { loadQAChain } from 'langchain/chains'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question, history, namespace } = req.body


  const sanitizedQuestion = (
    question + " Explain as much as detail you can."
  )

  const docs = await axios.post(`${API_URL}/api/higherai/getDocs`, {
    question,
    history,
    namespace,
  })
  console.log("docs is : ", docs)

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
  });

  const sendData = (data: string) => {
    res.write(`data: ${data}\n\n`);
  };
  try {
    const chain = loadQAChain(new OpenAIChat({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
      modelName: "gpt-4",
      verbose: true,
      streaming: true,
      callbackManager: CallbackManager.fromHandlers({
        async handleLLMNewToken(token) {
          console.log(token)
          sendData(JSON.stringify({ data: token }))
        },
      }),
    }),)

    const resp = await chain.call({
      input_documents: docs.data,
      question: sanitizedQuestion,
    });

    console.log(resp)

  } catch (err) {
    console.log(err)
  } finally {
    sendData('[DONE]')
    res.end()

  }

  // try {
  //   fetchEventSource(API_URL + '/api/higherai/chat', {
  //     method: "POST",
  //     body: JSON.stringify({
  //       question,
  //       history,
  //       namespace
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     onmessage: (event) => {
  //       if (event.data === '[DONE]') {
  //         console.log("done : ")
  //         res.status(200).json(event.data)
  //       } else {
  //         const data = JSON.parse(event.data)
  //         console.log(data)
  //       }
  //     }
  //   })
  // console.log('response', resp.data.answer)
  // } catch (error: any) {
  //   console.log('error', error)
  //   res.status(500).json({ error: error.message || 'Something went wrong' })
  // }

  // try {
  //   const sanitizedQuestion = (
  //     question + "Explain more detail like explaining for children"
  //   )
  //     .trim()
  //     .replaceAll("\n", " ");
  //   const index = pinecone.Index(process.env.PINECONE_INDEX_NAME + "")
  //   const vectorStore = await PineconeStore.fromExistingIndex(
  //     new OpenAIEmbeddings({ openAIApiKey: process.env.OPENAI_API_KEY }),
  //     {
  //       pineconeIndex: index,
  //       textKey: "text",
  //       namespace: namespace,
  //     }
  //   );
  //   console.log("vectorStore is : ", vectorStore)
  //   const chain = RetrievalQAChain.fromLLM(
  //     new OpenAIChat({
  //       openAIApiKey: process.env.OPENAI_API_KEY,
  //       temperature: 0.7,
  //       modelName: "gpt-3.5-turbo",
  //       verbose: true,
  //       streaming: true,
  //       callbackManager: CallbackManager.fromHandlers({
  //         async handleLLMNewToken(token: any) {
  //           console.log(token)
  //         }
  //       })
  //     }),
  //     vectorStore.asRetriever()
  //   );
  //   const response = await chain.call({
  //     query: sanitizedQuestion,
  //   });
  //   console.log("response : ", response);
  //   res.status(200).json(response)
  // } catch (err) {
  //   console.log("error is ", err)
  // }



}
