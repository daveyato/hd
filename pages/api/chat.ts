import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
const API_URL = 'http://157.230.120.53:3005'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question, history, namespace } = req.body

  console.log(req.body)
  try {
    const resp = await axios.post(API_URL + '/api/higherai/chat', {
      question,
      history,
      namespace
    })
    console.log('response', resp.data.answer)
    res.status(200).json(resp.data.answer)
  } catch (error: any) {
    console.log('error', error)
    res.status(500).json({ error: error.message || 'Something went wrong' })
  }
}
