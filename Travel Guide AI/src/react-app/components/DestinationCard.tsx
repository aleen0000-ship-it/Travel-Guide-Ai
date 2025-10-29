import { Destination } from '@/shared/types';

interface DestinationCardProps {
  destination: Destination;
  onSelect: (destination: Destination) => void;
  isSelected: boolean;
}

export default function DestinationCard({ destination, onSelect, isSelected }: DestinationCardProps) {
  return (
    <div 
      className={`cursor-pointer rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
        isSelected ? 'ring-4 ring-gradient-to-r ring-purple-500 shadow-2xl shadow-purple-500/25' : 'shadow-lg hover:shadow-purple-500/10'
      }`}
      onClick={() => onSelect(destination)}
    >
      <div className="relative h-48">
        <img 
          src={destination.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400'} 
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{destination.name}</h3>
          <p className="text-sm opacity-90">{destination.country}</p>
        </div>
        {isSelected && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-2 shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4 bg-white">
        <p className="text-gray-600 text-sm">{destination.description}</p>
      </div>
    </div>
  );
}
