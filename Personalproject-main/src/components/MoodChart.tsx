interface MoodChartProps {
  data: { date: string; mood_level: number }[];
}

export default function MoodChart({ data }: MoodChartProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No mood data yet. Start tracking to see your trends!
      </div>
    );
  }

  const maxMood = 5;
  const chartHeight = 200;
  const barWidth = 100 / Math.min(data.length, 14);

  const displayData = data.slice(0, 14).reverse();

  const getMoodColor = (level: number) => {
    if (level <= 2) return 'from-red-400 to-orange-400';
    if (level === 3) return 'from-yellow-400 to-amber-400';
    return 'from-green-400 to-teal-400';
  };

  return (
    <div className="w-full">
      <div className="flex items-end justify-around h-64 px-2">
        {displayData.map((entry, index) => {
          const heightPercent = (entry.mood_level / maxMood) * 100;
          return (
            <div
              key={index}
              className="flex flex-col items-center"
              style={{ width: `${barWidth}%` }}
            >
              <div className="relative group w-full">
                <div
                  className={`w-full bg-gradient-to-t ${getMoodColor(entry.mood_level)} rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer`}
                  style={{ height: `${(heightPercent / 100) * chartHeight}px` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Mood: {entry.mood_level}/5
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-2 text-center">
                {new Date(entry.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-6 px-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-orange-400 rounded"></div>
          <span>Low</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-amber-400 rounded"></div>
          <span>Moderate</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-teal-400 rounded"></div>
          <span>High</span>
        </div>
      </div>
    </div>
  );
}
