import { useMemo } from "react";

export function ActivityHeatmap() {
  const heatmapData = useMemo(() => {
    // Generate sample heatmap data for demonstration
    const data = [];
    for (let i = 0; i < 182; i++) { // 26 weeks * 7 days
      data.push({
        date: new Date(Date.now() - (181 - i) * 24 * 60 * 60 * 1000),
        activity: Math.floor(Math.random() * 5) // 0-4 activity levels
      });
    }
    return data;
  }, []);

  const getActivityColor = (level: number) => {
    const colors = [
      'bg-gray-200 dark:bg-gray-700',
      'bg-islamic-emerald/20',
      'bg-islamic-emerald/40',
      'bg-islamic-emerald/60',
      'bg-islamic-emerald'
    ];
    return colors[level] || colors[0];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reading Activity</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Your spiritual journey progress</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
          
          <div className="grid grid-cols-26 gap-1">
            {heatmapData.map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm ${getActivityColor(day.activity)}`}
                title={`${day.date.toDateString()}: ${day.activity} activities`}
              />
            ))}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Less active</span>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
              <div className="w-3 h-3 bg-islamic-emerald/20 rounded-sm"></div>
              <div className="w-3 h-3 bg-islamic-emerald/40 rounded-sm"></div>
              <div className="w-3 h-3 bg-islamic-emerald/60 rounded-sm"></div>
              <div className="w-3 h-3 bg-islamic-emerald rounded-sm"></div>
            </div>
            <span>More active</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-islamic-cream/30 dark:bg-gray-700/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-islamic-emerald dark:text-islamic-gold">18</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Current Streak</div>
          </div>
          <div className="bg-islamic-cream/30 dark:bg-gray-700/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-islamic-emerald dark:text-islamic-gold">156</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Readings</div>
          </div>
          <div className="bg-islamic-cream/30 dark:bg-gray-700/30 rounded-lg p-4">
            <div className="text-2xl font-bold text-islamic-emerald dark:text-islamic-gold">12/60</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Hizbs Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
}
