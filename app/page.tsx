'use client'
import { CarouselImageViewer, Faq, PriceTable } from '@/app/ui';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ListCard from './ui/cards/list-card';
import List from './ui/common/list';
import { faChartGantt } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine';

export const ChartWiseBenefits = [
  'Detailed overview of any chart',
  'Tailored trade execution plans',
  'Risk management',
  'Extra confluence'
  ]

export const TraderProblems = [
'Difficulty understanding chart',
'No execution plan',
'Poor risk management'
]

export const HowItWorksGuide = [
'Enter chart mode and take a snapshot of the chart, or use an existing image.',
'Switch to analysis mode, upload the chart, and optionally add strategy, criteria, and risk tolerance details.'
]


const Hero = () => {
  return (
    <section className='relative w-full h-screen bg-gray-900'>
      <Image
        src={'/background.jpg'}
        alt='bg'
        width={2048}
        height={2048}
        priority={true}
        className='absolute top-0 bottom-0 left-0 w-full h-screen opacity-20 object-cover'
      />
      <div className="animate-fadeIn relative flex flex-col max-w-5xl  w-full mx-auto items-center  text-center opacity-90 p-8 h-full">
        <div className="w-full z-[10] flex flex-col py-16 pt-16 md:pt-48 justify-center items-center ">
          <h1 className="text-center lg:text-7xl md:text-5xl text-5xl my-4 px-3 font-bold text-gray-200">
            Chart analysis made easy! <span className="bg-gradient-to-r from-emerald-400 to-emerald-700 text-transparent bg-clip-text">Upload</span>.{" "}
            <span className="bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text">Analyse</span>
          </h1>
         
          <div className='absolute bottom-48 sm:relative sm:bottom-auto flex flex-col w-full justify-center items-center'>
            <p className="text-md md:text-lg lg:text-xl font-medium mb-5 px-3 mt-4 max-w-[90%] md:max-w-[80%]">
            ChartWise helps traders identify patterns and trends, offering insights for precise trade strategies.</p>
            <Link
                href={'/dashboard'}
                className={`flex flex-row items-center gap-2 justify-center w-[80%] md:max-w-[60%] lg:max-w-[40%] bg-emerald-700 hover:bg-emerald-500 border-2 border-emerald-400 text-gray-200 font-semibold p-2 md:p-4 rounded-full shadow-md text-lg md:text-xl lg:text-2xl mt-4 `}>
                {'Get started for free'}
            </Link>
          </div>
        
        </div>
      </div>
    </section>
  )
}

const Pricing = () => {
  return (
    <section id='pricing' className="relative  flex flex-col bg-neutral-100 dark:bg-gray-800 w-full mx-auto items-center justify-center text-center py-16 mb-16">
    <h1 className="text-center text-3xl my-4 px-3 font-bold">Pricing</h1>
    <p className="max-w-5xl mb-5 px-3">
    Invest in your trading success, start your subscription now!    
    </p>
    <div className='container justify-center py-16'>
      <PriceTable/>
    </div>
  </section>
  )
}

const Benefits = () => {
  return (
    <section id='benefits' className="w-full mx-auto flex flex-col items-center justify-center text-center py-16  bg-gradient-to-r from-white to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-center text-3xl my-4 px-3 font-bold">Looking to improve your trading success?</h1>
      <div className="flex flex-col  md:flex-row w-full max-w-7xl justify-center items-center gap-8 my-8 p-4">
        <ListCard
          title={'Trading Challenges'}
          items={TraderProblems}
          titleClassName='text-red-500'
          icon={faChartGantt}
          iconColor='red'
        />
          <ListCard
          title={'ChartWise Solutions'}
          items={ChartWiseBenefits}
          titleClassName='text-emerald-400'
          icon={faChartLine}
          iconColor='#34D399'
        />
    </div>
    </section>
  )
}

const HowItWorks = () => {
  return (
    <section id='how-it-works' className=" w-full mx-auto flex flex-col items-center justify-center text-center py-16  bg-gradient-to-r from-white to-gray-200 dark:from-gray-900 dark:to-gray-800" >
      <h1 className="text-center text-3xl my-4 px-3 font-bold">How to analyse charts with ChartWise?</h1>
      <div className="flex flex-col md:flex-row  w-full max-w-7xl justify-between items-center gap-8 my-8 p-4 mb-auto">
          <CarouselImageViewer images={['/chartwise-chart-mode.png', '/chartwise-analysis-mode.png']}  switchInterval={5000}/>
        <div className='w-full justify-start font-medium'>
          <List items={HowItWorksGuide} listType='numbered' />
        </div>
    </div>
    </section>
  )
}


const Page = () => {
  return (
    <div className='w-full my-auto'>
      <Hero/>
      <Benefits/>
      <HowItWorks/>
      <Pricing/>
      <Faq />
    </div>
  );
}

export default Page;
