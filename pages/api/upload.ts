import { NextApiRequest, NextApiResponse, PageConfig } from 'next'
import axios from 'axios'
import { generateRandomString } from '@/components/utils'
import { API_URL } from '@/utils/constants'

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(404).end()
  try {
    console.log('/api/upload called -------------------')
    const result = await axios.post(API_URL + '/api/higherai/upload', {
      namespace: req.body.namespace,
      contents: req.body.text
    })
    console.log(result)
    return res.status(200).json({ response: true })
  } catch (err) {
    console.log('err --------------')
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const config: PageConfig = {}

export default handler
