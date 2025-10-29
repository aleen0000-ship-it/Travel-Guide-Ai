import { DollarSign, Calendar } from 'lucide-react';

interface BudgetSelectorProps {
  budget: number;
  duration: number;
  onBudgetChange: (budget: number) => void;
  onDurationChange: (duration: number) => void;
}

export default function BudgetSelector({ budget, duration, onBudgetChange, onDurationChange }: BudgetSelectorProps) {
  return (
    <div className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-xl p-6 shadow-lg border border-purple-100 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-green-500" />
        Plan Your Trip
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Budget (USD)
          </label>
          <input
            type="range"
            min="500"
            max="10000"
            step="100"
            value={budget}
            onChange={(e) => onBudgetChange(parseInt(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-lg appearance-none cursor-pointer shadow-md"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>$500</span>
            <span className="font-bold text-lg text-green-600">${budget.toLocaleString()}</span>
            <span>$10,000</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Duration (Days)
          </label>
          <input
            type="range"
            min="1"
            max="14"
            step="1"
            value={duration}
            onChange={(e) => onDurationChange(parseInt(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-orange-400 via-pink-400 to-red-500 rounded-lg appearance-none cursor-pointer shadow-md"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>1 day</span>
            <span className="font-bold text-lg text-orange-600">{duration} days</span>
            <span>14 days</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-gradient-to-r from-violet-100 via-cyan-50 to-emerald-100 rounded-lg border border-violet-200">
          <p className="text-sm text-gray-700">
            <strong>Daily Budget:</strong> ${Math.round(budget / duration).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
