import { Transportation } from '@/shared/types';
import { Plane, Train, Car, Navigation } from 'lucide-react';

interface TransportationCardProps {
  transport: Transportation;
}

export default function TransportationCard({ transport }: TransportationCardProps) {
  const getTransportIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'flight': return Plane;
      case 'train': return Train;
      case 'metro':
      case 'subway': return Train;
      case 'taxi': return Car;
      default: return Navigation;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'flight': return 'bg-blue-100 text-blue-700';
      case 'train': return 'bg-green-100 text-green-700';
      case 'metro':
      case 'subway': return 'bg-purple-100 text-purple-700';
      case 'taxi': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const IconComponent = getTransportIcon(transport.type);

  return (
    <div className="bg-gradient-to-br from-white to-emerald-50/30 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-emerald-100/50 hover:border-emerald-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-50 rounded-lg">
            <IconComponent className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{transport.name}</h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transport.type)}`}>
              {transport.type}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">
            ${transport.price || 'N/A'}
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3">{transport.description}</p>
      
      {transport.duration && (
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Duration:</span>
          <span className="font-medium">{transport.duration}</span>
        </div>
      )}
      
      <button className="w-full mt-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white py-2 rounded-lg hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]">
        Book Now
      </button>
    </div>
  );
}
