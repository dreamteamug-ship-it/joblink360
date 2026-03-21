// lib/documents/response/response-handler.ts
// Response Handler for Funding Applications

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder'
);

export interface ResponseData {
  document_id: string;
  pdf_url: string;
  cover_letter: string;
  attachments: string[];
  metadata?: any;
  response_text?: string;
}

export class ResponseHandler {
  
  async processResponse(responseText: string): Promise<any> {
    try {
      const parsed = JSON.parse(responseText);
      return await this.saveResponse({
        document_id: parsed.document_id,
        pdf_url: parsed.pdf_url,
        cover_letter: parsed.cover_letter,
        attachments: parsed.attachments || [],
        metadata: parsed.metadata,
        response_text: responseText
      });
    } catch (error) {
      console.error('Error processing response:', error);
      throw error;
    }
  }

  private async saveResponse(responseData: ResponseData): Promise<any> {
    const { data, error } = await supabase
      .from('funding_responses')
      .insert({
        document_id: responseData.document_id,
        pdf_url: responseData.pdf_url,
        cover_letter: responseData.cover_letter,
        attachments: responseData.attachments,
        metadata: responseData.metadata || {},
        status: 'draft',
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getResponse(documentId: string): Promise<any> {
    const { data, error } = await supabase
      .from('funding_responses')
      .select('*')
      .eq('document_id', documentId)
      .single();

    if (error) throw error;
    return data;
  }

  async updateResponse(documentId: string, updates: Partial<ResponseData>): Promise<any> {
    const { data, error } = await supabase
      .from('funding_responses')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('document_id', documentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

export default ResponseHandler;
