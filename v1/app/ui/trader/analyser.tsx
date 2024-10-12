'use client'
import { DefaultToastOptions, StorageKeys, Time } from "@/app/constants/app";
import {PopUp, LoaderDialog, AnalysisForm} from "@/app/ui/";
import {LocalStorage} from "@/app/lib/storage"
import { PollOptions } from "@/app/types";
import { DEFAULT_ERROR_MESSAGE, JobErrors, ServiceUsageErrors } from "@/app/constants/errors";
import { getJobStatus } from "@/app/lib/requests/chartwise-client";
import { useRouter } from "next/navigation";
import { FREE_USAGE_LIMIT_DESC, FREE_USAGE_LIMIT_TITLE, PLAN_USAGE_LIMIT_TITLE } from "@/app/constants/content";
import { usePopUp, usePolling, useLoading } from "@/app/hooks";
import { toast } from "react-toastify";
import { useChartwise } from "@/app/providers/chartwise";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LOADER_DESCRIPTION = "Chart analysis in progress. This can take a few seconds. Please do not refresh the page.";
const LOADER_TITLE = "Analysing chart...";

export function ChartAnalyser ({email}: {email: string | null | undefined}){
  const router = useRouter();
  const {onAnalysisComplete, newAnalysis} = useChartwise();
  const {showPopUp, closePopUp, popUpDescription, popUpTitle} = usePopUp();
  const { loading, setLoading, minimizeLoader, showLoadingDialog } = useLoading();

  const onJobFinished = () => {
    stopPolling();
    setLoading(false);

  }
  const onJobComplete = (chartAnalysis: string) => {
    onJobFinished();
    onAnalysisComplete(chartAnalysis);
  };

  const onJobFail = () => {
    onJobFinished();
    toast.error(DEFAULT_ERROR_MESSAGE, DefaultToastOptions);
  };

  const handleJobInProgress = (jobId: string) => {
    LocalStorage.set(StorageKeys.jobId, jobId);
    setTimeout(startPolling, 5 * Time.sec);
  };

  const handleFailedJobStart = async (error: Error) => {
    setLoading(false);
    
    if (error.message === ServiceUsageErrors.EXCEEDED_FREE_LIMIT) {
      return onReachedFreeUseLimit();
    } 
    if (error.message === ServiceUsageErrors.EXCEEDED_PLAN_LIMIT) {
      return onReachedSubUsageLimit();
    } 
    if(error.message.includes('429')){
      return toast.error('We are currently overloaded at the moment', DefaultToastOptions);
    }
    console.error("Unexepcted error here: ",error.message)
    toast.error(DEFAULT_ERROR_MESSAGE, DefaultToastOptions);
  };

  const pollJobStatus = async () => {
    try {
      const jobId = LocalStorage.get<string>(StorageKeys.jobId);
      if (!jobId) throw new Error(JobErrors.INVALID_JOB_ID);
  
      const { data, status } = await getJobStatus(jobId);
  
      if (status === 'completed') {
        onJobComplete(data.output);
      } else if (status === 'failed') {
        onJobFail();
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE, DefaultToastOptions);
      setLoading(false);
      throw error;
    }
  };
  
  const pollOptions: PollOptions = {
    interval: 5 * Time.sec,
    maxDuration: Time.min,
    maxErrors: 3,
    onMaxDuration: () => setLoading(false),
    onMaxErrors: () => setLoading(false),
  };

  const { startPolling, stopPolling } = usePolling(pollJobStatus, pollOptions);

  const onReachedFreeUseLimit = () => {
    showPopUp(FREE_USAGE_LIMIT_TITLE, FREE_USAGE_LIMIT_DESC)
  };

  const onReachedSubUsageLimit = () => {
    toast.error(PLAN_USAGE_LIMIT_TITLE, DefaultToastOptions);
  };


  const handleSubscripe = () => {
    router.push('/#pricing')
  }

  return (
    <div className="w-full flex flex-col mx-auto items-center  mb-auto md:my-auto py-8">
      <div className='w-full flex flex-row gap-4 justify-between items-center'>
        <h1 className="text-left text-xl md:text-3xl my-4 font-bold">Upload & Analyse</h1>
        <button
          className="flex w-auto items-center justify-center text-sm md:text-md lg:text-lg font-semibold gap-1"
          onClick={newAnalysis}
          >
          <FontAwesomeIcon icon={faPlusCircle} className="w-4 md:w-4 h-4 md:h-4"  />
          <span className="">New Analysis</span>
        </button>
      </div>
      <p className="w-full flex text-sm md:text-md lg:text-lg text-left opacity-80 mb-4">You can upload up to 3 charts for different timeframes.</p>
      <AnalysisForm email={email} handleFailedJobStart={handleFailedJobStart} handleJobInProgress={handleJobInProgress} loading={loading} setLoading={setLoading}/>
      {(popUpTitle && popUpDescription) && <PopUp title={popUpTitle} description={popUpDescription} onConfirm={handleSubscripe} onClose={closePopUp} cta="Subscribe"/>}
      {showLoadingDialog && (
        <LoaderDialog
          onMinimize={minimizeLoader}
          position="BOTTOM_RIGHT"
          title={LOADER_TITLE}
          description={LOADER_DESCRIPTION}/>
      )}
    </div>
  );
}