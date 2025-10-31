import { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

const WELLNESS_TIPS = [
  "Take a 5-minute break every hour to stretch and breathe deeply.",
  "Drink a glass of water - staying hydrated helps your mood and focus.",
  "Try the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.",
  "Reach out to a friend or family member today. Connection matters.",
  "Practice gratitude by writing down three things that went well today.",
  "Get some sunlight if possible - even 10 minutes can boost your mood.",
  "Remember: It's okay to not be okay. Your feelings are valid.",
  "Take things one step at a time. You don't have to do everything today.",
  "Set one small, achievable goal for today. Progress over perfection.",
  "Notice something beautiful around you right now. Mindfulness can be simple.",
  "If you're feeling overwhelmed, write it down. Getting it out of your head helps.",
  "Your mental health is just as important as your physical health.",
  "Be kind to yourself today. You're doing better than you think.",
  "Taking breaks is not lazy - it's essential for your wellbeing.",
  "You deserve support, care, and understanding - including from yourself."
];

export default function WellnessTip() {
  const [tip, setTip] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const randomTip = WELLNESS_TIPS[Math.floor(Math.random() * WELLNESS_TIPS.length)];
    setTip(randomTip);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-lg p-6 mb-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Sparkles className="w-6 h-6 text-white flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-white font-bold text-lg mb-2">Wellness Tip</h3>
              <p className="text-white text-sm leading-relaxed opacity-95">{tip}</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
