import { useState, useEffect } from 'react';
import { Phrase } from '@/shared/types';
import { MessageCircle, Volume2 } from 'lucide-react';

interface PhrasebookProps {
  destinationId: number;
}

export default function Phrasebook({ destinationId }: PhrasebookProps) {
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhrases = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/destinations/${destinationId}/phrases`);
        const data = await response.json();
        setPhrases(data);
      } catch (error) {
        console.error('Failed to fetch phrases:', error);
      } finally {
        setLoading(false);
      }
    };

    if (destinationId) {
      fetchPhrases();
    }
  }, [destinationId]);

  const categories = ['All', ...Array.from(new Set(phrases.map(p => p.category)))];
  const filteredPhrases = selectedCategory === 'All' 
    ? phrases 
    : phrases.filter(p => p.category === selectedCategory);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl p-6 shadow-lg border border-blue-100 backdrop-blur-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl p-6 shadow-lg border border-indigo-100/50">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <MessageCircle className="w-6 h-6 text-blue-500" />
        Local Phrasebook
      </h3>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {filteredPhrases.map(phrase => (
          <div key={phrase.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <p className="font-medium text-gray-800">{phrase.english_text}</p>
                <p className="text-lg text-blue-600 font-medium">{phrase.local_text}</p>
                {phrase.pronunciation && (
                  <p className="text-sm text-gray-600 italic">/{phrase.pronunciation}/</p>
                )}
              </div>
              <button
                onClick={() => speakText(phrase.local_text)}
                className="ml-2 p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                title="Pronounce"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        
        {filteredPhrases.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No phrases found for this category
          </div>
        )}
      </div>
    </div>
  );
}
