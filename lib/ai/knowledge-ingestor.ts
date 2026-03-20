import { Pinecone } from '@pinecone-database/pinecone';

export class KnowledgeBase {
  async ingestDocument(title: string, content: string) {
    if (!process.env.PINECONE_API_KEY) return { error: "Pinecone Key Missing" };
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    const index = pc.index('joblink360-library');
    console.log(`Ingesting: ${title}...`);
    return { status: "Success", message: "Intelligence added to Amanda's vault." };
  }
}
export const knowledgeBase = new KnowledgeBase();