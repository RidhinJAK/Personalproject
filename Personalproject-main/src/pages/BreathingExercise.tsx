import { useState, useEffect, useRef } from 'react';
import { Wind, Play, Pause, Home, RotateCcw } from 'lucide-react';

interface BreathingExerciseProps {
  onNavigate: (page: string) => void;
}

type Phase = 'inhale' | 'hold' | 'exhale' | 'pause';

export default function BreathingExercise({ onNavigate }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [count, setCount] = useState(4);
  const [totalBreaths, setTotalBreaths] = useState(0);
  const [technique, setTechnique] = useState<'box' | '478' | 'calm'>('box');
  const intervalRef = useRef<number | null>(null);

  const techniques = {
    box: {
      name: 'Box Breathing',
      description: 'Inhale, hold, exhale, hold - 4 seconds each',
      phases: [
        { name: 'inhale', duration: 4, text: 'Breathe In' },
        { name: 'hold', duration: 4, text: 'Hold' },
        { name: 'exhale', duration: 4, text: 'Breathe Out' },
        { name: 'pause', duration: 4, text: 'Hold' }
      ]
    },
    '478': {
      name: '4-7-8 Breathing',
      description: 'Inhale 4s, hold 7s, exhale 8s - promotes relaxation',
      phases: [
        { name: 'inhale', duration: 4, text: 'Breathe In' },
        { name: 'hold', duration: 7, text: 'Hold' },
        { name: 'exhale', duration: 8, text: 'Breathe Out' }
      ]
    },
    calm: {
      name: 'Calming Breath',
      description: 'Inhale 4s, exhale 6s - reduces anxiety',
      phases: [
        { name: 'inhale', duration: 4, text: 'Breathe In' },
        { name: 'exhale', duration: 6, text: 'Breathe Out' }
      ]
    }
  };

  const currentTechnique = techniques[technique];
  const currentPhaseIndex = currentTechnique.phases.findIndex(p => p.name === phase);
  const currentPhaseData = currentTechnique.phases[currentPhaseIndex];

  useEffect(() => {
    if (isActive && count > 0) {
      intervalRef.current = window.setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    } else if (isActive && count === 0) {
      const nextIndex = (currentPhaseIndex + 1) % currentTechnique.phases.length;
      const nextPhase = currentTechnique.phases[nextIndex];

      setPhase(nextPhase.name as Phase);
      setCount(nextPhase.duration);

      if (nextIndex === 0) {
        setTotalBreaths(totalBreaths + 1);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isActive, count, currentPhaseIndex, currentTechnique.phases, totalBreaths]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(currentTechnique.phases[0].duration);
    setTotalBreaths(0);
  };

  const handleTechniqueChange = (newTechnique: 'box' | '478' | 'calm') => {
    setTechnique(newTechnique);
    setIsActive(false);
    setPhase('inhale');
    setCount(techniques[newTechnique].phases[0].duration);
    setTotalBreaths(0);
  };

  const getCircleScale = () => {
    if (phase === 'inhale') return 'scale-150';
    if (phase === 'exhale') return 'scale-75';
    return 'scale-100';
  };

  const getCircleColor = () => {
    if (phase === 'inhale') return 'from-cyan-400 to-blue-500';
    if (phase === 'exhale') return 'from-teal-400 to-green-500';
    if (phase === 'hold') return 'from-blue-400 to-cyan-500';
    return 'from-teal-300 to-cyan-400';
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center">
            <Wind className="w-10 h-10 mr-3 text-cyan-600" />
            Breathing Exercises
          </h1>
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(techniques).map(([key, tech]) => (
            <button
              key={key}
              onClick={() => handleTechniqueChange(key as 'box' | '478' | 'calm')}
              className={`p-6 rounded-2xl text-left transition-all transform hover:scale-105 ${
                technique === key
                  ? 'bg-gradient-to-br from-cyan-600 to-blue-600 text-white shadow-xl'
                  : 'bg-white text-gray-900 hover:shadow-lg'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
              <p className={`text-sm ${technique === key ? 'text-cyan-50' : 'text-gray-600'}`}>
                {tech.description}
              </p>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-8">
          <div className="flex flex-col items-center">
            <div className="relative w-80 h-80 flex items-center justify-center mb-12">
              <div
                className={`absolute w-64 h-64 rounded-full bg-gradient-to-br ${getCircleColor()} transition-all duration-[${currentPhaseData?.duration}s] ease-in-out ${
                  isActive ? getCircleScale() : 'scale-100'
                } opacity-30 blur-2xl`}
              ></div>

              <div
                className={`absolute w-56 h-56 rounded-full bg-gradient-to-br ${getCircleColor()} transition-all duration-[${currentPhaseData?.duration}s] ease-in-out ${
                  isActive ? getCircleScale() : 'scale-100'
                } shadow-2xl`}
              ></div>

              <div className="relative z-10 text-center">
                <div className="text-7xl font-bold text-white mb-3">{count}</div>
                <div className="text-2xl text-white font-semibold">{currentPhaseData?.text}</div>
              </div>
            </div>

            <div className="flex space-x-4 mb-8">
              {!isActive ? (
                <button
                  onClick={handleStart}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Play className="w-6 h-6" />
                  <span>Start</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Pause className="w-6 h-6" />
                  <span>Pause</span>
                </button>
              )}

              <button
                onClick={handleReset}
                className="flex items-center space-x-3 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
              >
                <RotateCcw className="w-6 h-6" />
                <span>Reset</span>
              </button>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-600 mb-2">{totalBreaths}</div>
              <div className="text-gray-600 font-medium">Completed Cycles</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-600 to-blue-600 rounded-3xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Benefits of Breathing Exercises</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-lg">Reduces Stress</h3>
              <p className="text-cyan-50 text-sm">Activates your relaxation response and calms your nervous system</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Improves Focus</h3>
              <p className="text-cyan-50 text-sm">Increases oxygen to your brain, enhancing clarity and concentration</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-lg">Better Sleep</h3>
              <p className="text-cyan-50 text-sm">Promotes relaxation and helps you fall asleep more easily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
