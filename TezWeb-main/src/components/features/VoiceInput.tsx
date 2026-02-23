import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  className?: string;
}

// Web Speech API types
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export default function VoiceInput({ onTranscript, className = '' }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en-IN');
  const [transcript, setTranscript] = useState('');

  // Supported languages with focus on Indian languages
  const languages = [
    { code: 'en-IN', name: 'English (India)' },
    { code: 'hi-IN', name: 'हिंदी (Hindi)' },
    { code: 'bn-IN', name: 'বাংলা (Bengali)' },
    { code: 'te-IN', name: 'తెలుగు (Telugu)' },
    { code: 'mr-IN', name: 'मराठी (Marathi)' },
    { code: 'ta-IN', name: 'தமிழ் (Tamil)' },
    { code: 'gu-IN', name: 'ગુજરાતી (Gujarati)' },
    { code: 'kn-IN', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml-IN', name: 'മലയാളം (Malayalam)' },
    { code: 'pa-IN', name: 'ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'or-IN', name: 'ଓଡ଼ିଆ (Odia)' },
    { code: 'as-IN', name: 'অসমীয়া (Assamese)' },
    { code: 'en-US', name: 'English (US)' },
  ];

  useEffect(() => {
    // Check if Speech Recognition API is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = selectedLanguage;

      recognitionInstance.onstart = () => {
        console.log('Voice recognition started');
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
      };

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPiece = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPiece + ' ';
          } else {
            interimTranscript += transcriptPiece;
          }
        }

        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
          onTranscript(finalTranscript.trim());
        }
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        
        const errorMessages: Record<string, string> = {
          'no-speech': 'No speech detected. Please try again.',
          'audio-capture': 'No microphone found. Please check your device.',
          'not-allowed': 'Microphone access denied. Please allow microphone access.',
          'network': 'Network error. Please check your connection.',
        };

        toast.error(errorMessages[event.error] || 'Voice recognition error. Please try again.');
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
      setIsSupported(true);
    } else {
      setIsSupported(false);
      console.warn('Speech Recognition API not supported');
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  // Update language when changed
  useEffect(() => {
    if (recognition) {
      recognition.lang = selectedLanguage;
    }
  }, [selectedLanguage, recognition]);

  const startListening = () => {
    if (recognition && !isListening) {
      setTranscript('');
      try {
        recognition.start();
        toast.success(`Listening in ${languages.find(l => l.code === selectedLanguage)?.name}...`);
      } catch (error) {
        console.error('Failed to start recognition:', error);
        toast.error('Failed to start voice input');
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      toast.success('Voice input stopped');
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Language Selector */}
      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
        <SelectTrigger className="w-[180px] h-9 text-xs">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="text-xs">
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Voice Input Button */}
      <Button
        type="button"
        onClick={isListening ? stopListening : startListening}
        variant={isListening ? 'destructive' : 'outline'}
        size="sm"
        className={`gap-2 h-9 ${isListening ? 'animate-pulse' : ''}`}
      >
        {isListening ? (
          <>
            <MicOff className="w-4 h-4" />
            <span className="hidden sm:inline">Stop</span>
          </>
        ) : (
          <>
            <Mic className="w-4 h-4" />
            <span className="hidden sm:inline">Speak</span>
          </>
        )}
      </Button>

      {/* Listening Indicator */}
      {isListening && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          <span className="text-xs font-medium text-red-700">Listening...</span>
        </div>
      )}
    </div>
  );
}
