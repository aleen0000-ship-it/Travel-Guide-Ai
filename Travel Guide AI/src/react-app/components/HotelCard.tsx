import { Hotel } from '@/shared/types';
import { Star, Wifi, Car, Coffee } from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const amenityIcons: Record<string, any> = {
    'WiFi': Wifi,
    'Restaurant': Coffee,
    'Bar': Coffee,
    'Spa': Star,
    'Gym': Car,
    'Pool': Car,
    'Concierge': Star,
  };

  const amenityList = hotel.amenities ? hotel.amenities.split(', ') : [];

  return (
    <div className="bg-gradient-to-br from-white to-amber-50/30 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-100/50 hover:border-amber-200">
      <div className="relative h-48">
        <img 
          src={hotel.image_url || 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400'} 
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{hotel.rating || 'N/A'}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{hotel.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{hotel.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {amenityList.slice(0, 3).map((amenity) => {
            const IconComponent = amenityIcons[amenity] || Star;
            return (
              <span key={amenity} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                <IconComponent className="w-3 h-3" />
                {amenity}
              </span>
            );
          })}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-green-600">${hotel.price_per_night}</span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          <button className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:via-blue-600 hover:to-indigo-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]">
            Select
          </button>
        </div>
      </div>
    </div>
  );
}
