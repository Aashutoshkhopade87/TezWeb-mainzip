import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface AIAssistantDialogProps {
  onClose: () => void;
  onApplySuggestion: (text: string) => void;
}

const AI_SUGGESTIONS = [
  {
    title: 'Make it more professional',
    prompt: 'Rewrite this in a more professional tone',
  },
  {
    title: 'Add emotional appeal',
    prompt: 'Rewrite this with emotional appeal for customers',
  },
  {
    title: 'Make it shorter',
    prompt: 'Make this text more concise and impactful',
  },
];

export default function AIAssistantDialog({ onClose, onApplySuggestion }: AIAssistantDialogProps) {
  const [userText, setUserText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const handleImprove = async (prompt: string) => {
    if (!userText.trim()) {
      toast.error('Please enter some text to improve');
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing (mocked for V1.0)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock AI improvements
    let improved = userText;
    
    if (prompt.includes('professional')) {
      improved = userText
        .replace(/!+/g, '.')
        .replace(/\bhey\b/gi, 'Hello')
        .replace(/\bgood\b/gi, 'excellent')
        .replace(/\bbest\b/gi, 'finest');
    } else if (prompt.includes('emotional')) {
      improved = `${userText} - We care about your satisfaction and happiness!`;
    } else if (prompt.includes('concise')) {
      improved = userText.split('.')[0] + '.';
    }

    setAiResponse(improved);
    setIsProcessing(false);
    toast.success('AI suggestion ready!');
  };

  const handleApply = () => {
    if (aiResponse) {
      onApplySuggestion(aiResponse);
      toast.success('Text updated!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">AI Writing Assistant</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter text to improve
            </label>
            <Textarea
              value={userText}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Paste your product description, tagline, or any text here..."
              className="min-h-[100px]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose improvement style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {AI_SUGGESTIONS.map((suggestion) => (
                <Button
                  key={suggestion.title}
                  onClick={() => handleImprove(suggestion.prompt)}
                  disabled={isProcessing || !userText.trim()}
                  variant="outline"
                  className="h-auto py-3 text-left justify-start"
                >
                  <Sparkles className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{suggestion.title}</span>
                </Button>
              ))}
            </div>
          </div>

          {isProcessing && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              <span className="ml-3 text-gray-600">AI is improving your text...</span>
            </div>
          )}

          {aiResponse && !isProcessing && (
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
              <label className="block text-sm font-medium text-purple-900 mb-2">
                AI Suggestion
              </label>
              <p className="text-gray-900 mb-4">{aiResponse}</p>
              <Button onClick={handleApply} className="gap-2">
                <Sparkles className="w-4 h-4" />
                Apply This Text
              </Button>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> AI helps rewrite your text, but you can always edit it manually. 
              This feature uses minimal credits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
