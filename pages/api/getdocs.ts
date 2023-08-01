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

    const resp = await axios.post(`${API_URL}/api/higherai/getDocs`, {
        question,
        history,
        namespace
    })
    console.log(resp)
    res.status(200).json(resp.data)
}
