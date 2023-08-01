import { PineconeClient } from "@pinecone-database/pinecone";

// if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
//   throw new Error('Pinecone environment or api key vars missing');
// }
const new_pinecone_environement = process.env.PINECONE_ENVIRONMENT ;
const new_pinecone_api_key = process.env.PINECONE_API_KEY;
async function initPinecone() {
  try {
    const pinecone = new PineconeClient();
    await pinecone.init({
      environment: new_pinecone_environement, //this is in the dashboard
      apiKey: new_pinecone_api_key,
    });
    return pinecone;
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to initialize Pinecone Client");
  }
}

export const pinecone = await initPinecone();
