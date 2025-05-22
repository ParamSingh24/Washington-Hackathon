import { toast } from "@/components/ui/sonner";

// Types for our AI system
export type Symptom = {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: 'acute' | 'chronic';
};

export type Location = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'severe';
  reportCount: number;
};

export type SymptomReport = {
  id: string;
  userId: string;
  symptoms: Symptom[];
  location: Location;
  timestamp: Date;
};

export type AIInsight = {
  id: string;
  title: string;
  description: string;
  confidenceScore: number;
  relatedSymptoms: string[];
  timestamp: Date;
  severity: 'info' | 'warning' | 'alert';
};

// Mock symptoms for our system
export const availableSymptoms: Symptom[] = [
  { id: 's1', name: 'Fever', severity: 'moderate', duration: 'acute' },
  { id: 's2', name: 'Cough', severity: 'mild', duration: 'acute' },
  { id: 's3', name: 'Shortness of Breath', severity: 'severe', duration: 'acute' },
  { id: 's4', name: 'Fatigue', severity: 'moderate', duration: 'chronic' },
  { id: 's5', name: 'Headache', severity: 'mild', duration: 'acute' },
  { id: 's6', name: 'Muscle Pain', severity: 'moderate', duration: 'acute' },
  { id: 's7', name: 'Sore Throat', severity: 'mild', duration: 'acute' },
  { id: 's8', name: 'Loss of Taste/Smell', severity: 'moderate', duration: 'chronic' },
  { id: 's9', name: 'Nausea', severity: 'moderate', duration: 'acute' },
  { id: 's10', name: 'Diarrhea', severity: 'moderate', duration: 'acute' },
];

// Mock locations with outbreaks
export const monitoredLocations: Location[] = [
  { id: 'l1', name: 'Seattle', lat: 47.6062, lng: -122.3321, riskLevel: 'moderate', reportCount: 37 },
  { id: 'l2', name: 'Spokane', lat: 47.6588, lng: -117.4260, riskLevel: 'low', reportCount: 12 },
  { id: 'l3', name: 'Tacoma', lat: 47.2529, lng: -122.4443, riskLevel: 'high', reportCount: 58 },
  { id: 'l4', name: 'Bellevue', lat: 47.6101, lng: -122.2015, riskLevel: 'low', reportCount: 8 },
  { id: 'l5', name: 'Vancouver', lat: 45.6387, lng: -122.6615, riskLevel: 'severe', reportCount: 103 },
  { id: 'l6', name: 'Everett', lat: 47.9790, lng: -122.2021, riskLevel: 'moderate', reportCount: 29 },
  { id: 'l7', name: 'Renton', lat: 47.4829, lng: -122.2171, riskLevel: 'high', reportCount: 64 },
  { id: 'l8', name: 'Olympia', lat: 47.0379, lng: -122.9007, riskLevel: 'moderate', reportCount: 41 },
];

// Mock AI insights
export const aiInsights: AIInsight[] = [
  {
    id: 'i1',
    title: 'Potential Respiratory Outbreak',
    description: 'Cluster of similar respiratory symptoms detected in Vancouver area with 78% confidence.',
    confidenceScore: 0.78,
    relatedSymptoms: ['Cough', 'Shortness of Breath', 'Fever'],
    timestamp: new Date('2025-05-08T10:23:00'),
    severity: 'warning'
  },
  {
    id: 'i2',
    title: 'Unusual Fever Pattern',
    description: 'Significant increase in reported fever cases in Tacoma, requires monitoring.',
    confidenceScore: 0.65,
    relatedSymptoms: ['Fever', 'Fatigue', 'Muscle Pain'],
    timestamp: new Date('2025-05-09T08:12:00'),
    severity: 'info'
  },
  {
    id: 'i3',
    title: 'Critical Alert: Vancouver Respiratory Cluster',
    description: 'High confidence in emerging respiratory illness cluster. Local health authorities have been notified.',
    confidenceScore: 0.91,
    relatedSymptoms: ['Shortness of Breath', 'Fever', 'Loss of Taste/Smell'],
    timestamp: new Date('2025-05-10T09:45:00'),
    severity: 'alert'
  },
];

// Mock chat responses based on symptoms
const chatResponses = {
  'Fever': [
    "Based on your reported fever, I recommend monitoring your temperature and staying hydrated. If it persists above 101°F for more than 24 hours, please consult a healthcare provider.",
    "Fever can be a sign of infection. Rest is important, and over-the-counter fever reducers may help with discomfort. If accompanied by severe symptoms, seek medical care."
  ],
  'Cough': [
    "For your cough, try drinking warm liquids and using honey (if over 1 year old). If it persists more than a week or is producing colored phlegm, please consult a healthcare provider.",
    "A persistent cough should be monitored. If you experience shortness of breath or the cough worsens suddenly, please seek medical attention."
  ],
  'Shortness of Breath': [
    "Shortness of breath requires immediate medical attention, especially if sudden or severe. Please contact emergency services or go to the nearest emergency department.",
    "This symptom needs prompt medical evaluation. While waiting for care, try to remain calm and sit upright to help ease breathing."
  ],
  'default': [
    "Based on the symptoms you've shared, I recommend monitoring your condition and ensuring you stay hydrated and rested. If symptoms persist or worsen, please consult with a healthcare provider.",
    "Thank you for reporting your symptoms. While I can provide general guidance, a healthcare professional can offer personalized medical advice for your specific situation."
  ]
};

// Function to generate a response based on symptoms
export const generateAIResponse = (symptoms: Symptom[]): string => {
  if (symptoms.length === 0) {
    return "Please describe your symptoms so I can provide appropriate guidance.";
  }
  
  // Check for severe symptoms first
  const severeSymptom = symptoms.find(s => s.severity === 'severe');
  if (severeSymptom) {
    const responses = chatResponses[severeSymptom.name as keyof typeof chatResponses] || chatResponses.default;
    return responses[0];
  }
  
  // Otherwise, respond to the first symptom
  const firstSymptom = symptoms[0];
  const responses = chatResponses[firstSymptom.name as keyof typeof chatResponses] || chatResponses.default;
  return responses[Math.floor(Math.random() * responses.length)];
};

// Function to simulate reporting a symptom
export const reportSymptom = async (symptomIds: string[], locationId: string): Promise<boolean> => {
  // This would connect to a real backend API in production
  return new Promise((resolve) => {
    setTimeout(() => {
      toast.success("Symptoms reported successfully. Thank you for contributing to public health monitoring.");
      resolve(true);
    }, 1500);
  });
};

// Function to analyze voice input (simulation)
export const processVoiceInput = async (audioBlob: Blob): Promise<string> => {
  // In a real app, this would send the audio to a speech-to-text service
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("I've been experiencing fever and cough for the past two days.");
    }, 2000);
  });
};
