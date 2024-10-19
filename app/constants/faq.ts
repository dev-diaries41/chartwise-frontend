import { FAQ } from "../types";

export const Faqs: FAQ[] = [
    {
        question: 'Is there a free trial?',
        answer: ['Users who are not subscribed can use the tool 5 times a day for free, with a max of 30 times a month.'],
    },
    {
        question: 'How do payments work?',
        answer: ["Once you subscribe, you'll allocated a set amount of uses corresponding to the plan you chose. These will be reset every month."],
    },
    {
        question: 'Will new features be added?',
        answer: ["Yes, we'll add new features based on user needs. An idea currently being explored is scheduling weekly analysis reports for specific assets and receiving results via Telegram."],
    },
    {
      question: 'How long does the analysis take?',
      answer: [ "The analysis usually takes a 10 - 15 seconds, but it can take longer during peak times."]
  
    },
    {
        question: 'Is the analysis always accurate?',
        answer: [
            'The analysis is AI generated and may not always be 100% accurate and should be used as guidance or to build confluence, not as financial advice.',
        ],
    },
  ];
  