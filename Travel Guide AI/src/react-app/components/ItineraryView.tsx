import { useState } from 'react';
import { TripPlan } from '@/shared/types';
import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react';

interface ItineraryViewProps {
  tripPlan: TripPlan | null;
  loading: boolean;
}

export default function ItineraryView({ tripPlan, loading }: ItineraryViewProps) {
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set());

  const toggleActivity = (dayIndex: number, activityIndex: number) => {
    const key = `${dayIndex}-${activityIndex}`;
    const newCompleted = new Set(completedActivities);
    if (newCompleted.has(key)) {
      newCompleted.delete(key);
    } else {
      newCompleted.add(key);
    }
    setCompletedActivities(newCompleted);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-white via-orange-50 to-red-50 rounded-xl p-6 shadow-lg border border-orange-100 backdrop-blur-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-48"></div>
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="h-24 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!tripPlan) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">No Itinerary Yet</h3>
        <p className="text-gray-500">Select a destination and set your budget to generate a personalized itinerary.</p>
      </div>
    );
  }

  const itinerary = tripPlan.itinerary ? JSON.parse(tripPlan.itinerary) : [];

  return (
    <div className="bg-gradient-to-br from-white to-slate-50/30 rounded-xl p-6 shadow-lg border border-slate-100/50">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6 text-orange-500" />
        Your Itinerary
      </h3>
      
      <div className="mb-4 p-4 bg-gradient-to-r from-violet-100 via-pink-100 to-orange-100 rounded-lg border border-violet-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Budget:</span>
            <span className="font-bold text-green-600 ml-2">${tripPlan.budget.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-gray-600">Duration:</span>
            <span className="font-bold text-orange-600 ml-2">{tripPlan.duration_days} days</span>
          </div>
          <div>
            <span className="text-gray-600">Estimated Cost:</span>
            <span className="font-bold text-blue-600 ml-2">
              ${Math.round(tripPlan.total_estimated_cost || 0).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Savings:</span>
            <span className="font-bold text-green-600 ml-2">
              ${Math.max(0, tripPlan.budget - (tripPlan.total_estimated_cost || 0)).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {itinerary.map((day: any, dayIndex: number) => (
          <div key={day.day} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-orange-500" />
              <h4 className="font-bold text-gray-800">Day {day.day}</h4>
            </div>
            
            <div className="space-y-2 mb-3">
              {day.activities.map((activity: string, activityIndex: number) => {
                const key = `${dayIndex}-${activityIndex}`;
                const isCompleted = completedActivities.has(key);
                
                return (
                  <div key={activityIndex} className="flex items-start gap-3">
                    <button
                      onClick={() => toggleActivity(dayIndex, activityIndex)}
                      className={`mt-1 transition-colors ${
                        isCompleted ? 'text-green-500' : 'text-gray-300 hover:text-green-400'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <span className={`text-sm ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {activity}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-blue-50 rounded-lg p-2">
              <span className="text-xs text-blue-700 font-medium">Accommodation:</span>
              <span className="text-sm text-blue-800 ml-2">{day.accommodation}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
