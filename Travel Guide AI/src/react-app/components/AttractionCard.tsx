import { Attraction } from '@/shared/types';
import { Star, Clock, DollarSign } from 'lucide-react';

interface AttractionCardProps {
  attraction: Attraction;
}

export default function AttractionCard({ attraction }: AttractionCardProps) {
  const getCategoryColor = (category: string | null) => {
    switch (category) {
      case 'Museum': return 'bg-purple-100 text-purple-700';
      case 'Landmark': return 'bg-blue-100 text-blue-700';
      case 'Religious': return 'bg-green-100 text-green-700';
      case 'Tour': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-purple-50/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100/50 hover:border-purple-200">
      <div className="relative h-40">
        <img 
          src={attraction.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400'} 
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{attraction.rating || 'N/A'}</span>
          </div>
        </div>
        {attraction.category && (
          <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(attraction.category)}`}>
            {attraction.category}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{attraction.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{attraction.description}</p>
        
        <div className="space-y-2 mb-3">
          {attraction.opening_hours && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{attraction.opening_hours}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-green-600" />
            <span className={attraction.price === 0 ? 'text-green-600 font-medium' : 'text-gray-600'}>
              {attraction.price === 0 ? 'Free' : `$${attraction.price}`}
            </span>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white py-2 rounded-lg hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]">
          Add to Itinerary
        </button>
      </div>
    </div>
  );
}
