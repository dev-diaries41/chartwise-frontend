import { faBook, faChartLine, faClock, faLayerGroup, faMagnifyingGlassChart, faShieldAlt, IconDefinition } from '@fortawesome/free-solid-svg-icons';

export const CHARTWISE_DESCRIPTION = 'ChartWise helps traders identify patterns, trends, and insights, providing execution plans to enable smarter trading.';

export const HowItWorksGuide = [
  'If you don’t have a chart image, go to the charts page and capture a snapshot using the `snapshot` button in the top right corner. Otherwise, proceed to the next step. ',
  'On the analysis page, upload your chart, and optionally add a strategy and set your risk tolerance. Choose from the default strategies or add a custom one.'
];


    
    export const ChartWiseBenefits: {
      title: string;
      description: string;
      icon: IconDefinition
    }[] = [
      {
        title: "AI-Powered Chart Analysis",
        description: "Our AI analyzes charts, identifying trends, patterns, and anomalies to give you clear, actionable insights.",
        icon: faMagnifyingGlassChart
      },
      {
        title: "Strategy Optimization",
        description: "Receive AI-generated trade strategies that align with your risk tolerance and trading goals, making precise decisions easier.",
        icon: faChartLine
      },
      {
        title: "Multi-Timeframe Insights",
        description: "Upload multiple charts across different timeframes and get a comprehensive analysis that correlates data for better understanding.",
        icon: faLayerGroup
      },
      {
        title: "Risk Management",
        description: "Get tailored risk management advice, including stop loss and take profit levels, based on your trade setup and market volatility.",
        icon: faShieldAlt
      },
      {
        title: "Save Time",
        description: "Quickly understand complex charts without spending hours manually analyzing trends and data.",
        icon: faClock
      },
    ];
    