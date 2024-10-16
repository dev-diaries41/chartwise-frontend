'use client'
import { AnalysisSchemaWithoutUserId } from "@/app/constants/schemas";
import { AuthErrors, JobErrors } from "../../constants/errors";
import {JobReceipt, JobResult, IAnalyse, TradeJournalEntry, AnalysisParams} from "@/app/types"
import { GetDocsResponse } from "@/app/types/response";


async function fetchWithError<T>(endpointUrl: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(endpointUrl, options);
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message);
  }
  return await response.json();
}

export async function getNewToken({ userId }: { userId: string}){
    if (!userId) throw new Error(AuthErrors.INVALID_USER_ID);

    const body = JSON.stringify({userId})
    const response = await fetch('/api/cwauth/token', { method: 'POST', body });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message)
    };
}

export async function getJobStatus(jobId: string): Promise<JobResult<{ output: string }>> {
  const endpointUrl = `/api/analysis/results?jobId=${encodeURIComponent(jobId)}`;
  const  {data} = await fetchWithError<{data: JobResult<{ output: string }>}>(endpointUrl, { method: 'GET', credentials: 'include' });
  return data;
}

export async function submitAnalysisRequest(analysis: AnalysisParams): Promise<string> {
  const body = JSON.stringify(analysis);
  const endpointUrl = '/api/analysis';
  const {data} = await fetchWithError<{data: JobReceipt}>(endpointUrl, { method: 'POST', body, credentials: 'include' });
  if (!data?.jobId) throw new Error(JobErrors.INVALID_JOB_ID);
  return data.jobId;
}

// User id sent via jwt
export async function saveAnalysis(analysis: Omit<IAnalyse, 'userId'>): Promise<string | null> {
  try {
    const validatedAnalysis = AnalysisSchemaWithoutUserId.safeParse(analysis);
    if (!validatedAnalysis.success) throw new Error(JSON.stringify(validatedAnalysis.error));

    const body = JSON.stringify(validatedAnalysis.data);
    const response = await fetchWithError<{ data: string }>('/api/analysis/save', {method: 'POST', body, credentials: 'include'});
    const id = response.data;
    const shareableUrl = `${window.location.origin}/share/${id}`;
    return shareableUrl;
  } catch (error: any) {
    // console.log('Error saving analysis: ', error.message)
    return null;
  }
}


export async function addJournalEntry(entry: TradeJournalEntry): Promise<string> {
  const endpointUrl = '/api/journal';
  const body = JSON.stringify(entry); 
  const { message } = await fetchWithError<{ message: string }>(endpointUrl, { method: 'POST', body , credentials: 'include'});
  return message;
}

export async function getJournalEntries (page: string | number, perPage: string | number): Promise<GetDocsResponse<TradeJournalEntry>> {
  const endpointUrl = `/api/journal?page=${page}&perPage=${perPage}`;
  const  {data} = await fetchWithError<{data: GetDocsResponse<TradeJournalEntry>}>(endpointUrl, { method: 'GET' , credentials: 'include'});
  return data;
};

export async function refreshOnError(error: Error, userId: string){
if (error.message.trim() === AuthErrors.MISSING_JWT_TOKEN || error.message.trim() === AuthErrors.EXPIRED_TOKEN ) {
  await getNewToken({ userId });
  return true;
  }
return false;
}