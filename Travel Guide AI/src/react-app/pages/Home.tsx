import { useState, useEffect } from 'react';
import { Plane, Compass, Globe, Star } from 'lucide-react';
import { Destination, Hotel, Attraction, Transportation, TripPlan } from '@/shared/types';
import DestinationCard from '@/react-app/components/DestinationCard';
import BudgetSelector from '@/react-app/components/BudgetSelector';
import HotelCard from '@/react-app/components/HotelCard';
import AttractionCard from '@/react-app/components/AttractionCard';
import TransportationCard from '@/react-app/components/TransportationCard';
import CurrencyConverter from '@/react-app/components/CurrencyConverter';
import Phrasebook from '@/react-app/components/Phrasebook';
import ItineraryView from '@/react-app/components/ItineraryView';

export default function Home() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [budget, setBudget] = useState(2000);
  const [duration, setDuration] = useState(5);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [transportation, setTransportation] = useState<Transportation[]>([]);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [activeTab, setActiveTab] = useState('hotels');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  useEffect(() => {
    // Fetch destinations on component mount
    const fetchDestinations = async () => {
      try {
        const response = await fetch('/api/destinations');
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error('Failed to fetch destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    if (selectedDestination) {
      fetchDestinationData();
    }
  }, [selectedDestination, budget]);

  const fetchDestinationData = async () => {
    if (!selectedDestination) return;

    try {
      // Fetch hotels
      const hotelsResponse = await fetch(`/api/destinations/${selectedDestination.id}/hotels?budget=${budget / duration}`);
      const hotelsData = await hotelsResponse.json();
      setHotels(hotelsData);

      // Fetch attractions
      const attractionsResponse = await fetch(`/api/destinations/${selectedDestination.id}/attractions`);
      const attractionsData = await attractionsResponse.json();
      setAttractions(attractionsData);

      // Fetch transportation
      const transportationResponse = await fetch(`/api/destinations/${selectedDestination.id}/transportation`);
      const transportationData = await transportationResponse.json();
      setTransportation(transportationData);
    } catch (error) {
      console.error('Failed to fetch destination data:', error);
    }
  };

  const generateTripPlan = async () => {
    if (!selectedDestination) return;

    setIsGeneratingPlan(true);
    try {
      const response = await fetch('/api/trip-plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination_id: selectedDestination.id,
          budget,
          duration_days: duration,
        }),
      });
      const data = await response.json();
      setTripPlan(data);
      setActiveTab('itinerary');
    } catch (error) {
      console.error('Failed to generate trip plan:', error);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const tabs = [
    { id: 'hotels', label: 'Hotels', icon: '🏨', count: hotels.length },
    { id: 'attractions', label: 'Attractions', icon: '🎯', count: attractions.length },
    { id: 'transportation', label: 'Transport', icon: '🚗', count: transportation.length },
    { id: 'phrasebook', label: 'Phrasebook', icon: '💬', count: null },
    { id: 'currency', label: 'Currency', icon: '💱', count: null },
    { id: 'itinerary', label: 'Itinerary', icon: '📅', count: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50 relative">
      <div className="absolute inset-0 bg-gradient-to-tl from-cyan-100/30 via-transparent to-yellow-100/30"></div>
      <div className="relative z-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-purple-500/20 to-yellow-400/20 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center justify-center gap-3">
              <Plane className="w-12 h-12 md:w-16 md:h-16" />
              Travel Guide AI
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Smart travel planning made easy - Discover, Plan, Experience
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Compass className="w-5 h-5 text-cyan-300" />
                <span>Smart Recommendations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Globe className="w-5 h-5 text-green-300" />
                <span>Global Destinations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>Personalized Itineraries</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Destination Selection - Travel Themed */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-100/50 via-blue-50/50 to-cyan-100/50 rounded-3xl -m-4"></div>
          <div className="relative z-10 p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Discover Amazing Destinations
                </h2>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Compass className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-600 text-lg font-medium">Where will your next adventure take you?</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-3 h-3 bg-sky-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                  onSelect={setSelectedDestination}
                  isSelected={selectedDestination?.id === destination.id}
                />
              ))}
            </div>
          </div>
        </div>

        {selectedDestination && (
          <>
            {/* Budget and Duration Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <BudgetSelector
                  budget={budget}
                  duration={duration}
                  onBudgetChange={setBudget}
                  onDurationChange={setDuration}
                />
              </div>
              <div className="flex flex-col justify-center">
                <button
                  onClick={generateTripPlan}
                  disabled={isGeneratingPlan}
                  className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {isGeneratingPlan ? 'Generating...' : 'Generate Trip Plan'}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                    {tab.count !== null && (
                      <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content with Themed Backgrounds */}
            <div className="mb-8">
              {activeTab === 'hotels' && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-yellow-50/80 to-orange-50/80 rounded-3xl -m-6"></div>
                  <div className="absolute inset-0 opacity-10 rounded-3xl -m-6" style={{
                    backgroundImage: 'radial-gradient(circle at 20% 20%, #f59e0b 2px, transparent 2px), radial-gradient(circle at 80% 80%, #f59e0b 2px, transparent 2px)',
                    backgroundSize: '60px 60px'
                  }}></div>
                  <div className="relative z-10 p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
                        <span className="text-2xl">🏨</span>
                        <span className="font-bold text-lg">Luxury Accommodations</span>
                      </div>
                      <p className="text-amber-700 text-lg font-medium">Rest in comfort and style</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {hotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                      ))}
                      {hotels.length === 0 && (
                        <div className="col-span-full text-center text-amber-600 py-8 bg-amber-100/50 rounded-xl border border-amber-200">
                          <span className="text-4xl mb-4 block">🏨</span>
                          No hotels found within your budget range
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'attractions' && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-pink-50/80 to-rose-50/80 rounded-3xl -m-6"></div>
                  <div className="absolute inset-0 opacity-10 rounded-3xl -m-6" style={{
                    backgroundImage: 'linear-gradient(45deg, #ec4899 25%, transparent 25%), linear-gradient(-45deg, #ec4899 25%, transparent 25%)',
                    backgroundSize: '40px 40px'
                  }}></div>
                  <div className="relative z-10 p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
                        <span className="text-2xl">🎯</span>
                        <span className="font-bold text-lg">Must-See Attractions</span>
                      </div>
                      <p className="text-purple-700 text-lg font-medium">Discover iconic landmarks and hidden gems</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {attractions.map((attraction) => (
                        <AttractionCard key={attraction.id} attraction={attraction} />
                      ))}
                      {attractions.length === 0 && (
                        <div className="col-span-full text-center text-purple-600 py-8 bg-purple-100/50 rounded-xl border border-purple-200">
                          <span className="text-4xl mb-4 block">🎯</span>
                          No attractions found for this destination
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'transportation' && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 via-teal-50/80 to-cyan-50/80 rounded-3xl -m-6"></div>
                  <div className="absolute inset-0 opacity-10 rounded-3xl -m-6" style={{
                    backgroundImage: 'radial-gradient(circle at 25% 25%, #10b981 3px, transparent 3px), radial-gradient(circle at 75% 75%, #10b981 3px, transparent 3px)',
                    backgroundSize: '20px 20px'
                  }}></div>
                  <div className="relative z-10 p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
                        <span className="text-2xl">🚗</span>
                        <span className="font-bold text-lg">Getting Around</span>
                      </div>
                      <p className="text-emerald-700 text-lg font-medium">Travel with ease and convenience</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {transportation.map((transport) => (
                        <TransportationCard key={transport.id} transport={transport} />
                      ))}
                      {transportation.length === 0 && (
                        <div className="col-span-full text-center text-emerald-600 py-8 bg-emerald-100/50 rounded-xl border border-emerald-200">
                          <span className="text-4xl mb-4 block">🚗</span>
                          No transportation options found for this destination
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'phrasebook' && (
                <div className="relative max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-blue-50/80 to-cyan-50/80 rounded-3xl -m-6"></div>
                  <div className="absolute inset-0 opacity-10 rounded-3xl -m-6" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #3b82f6, #3b82f6 2px, transparent 2px, transparent 30px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                  <div className="relative z-10 p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
                        <span className="text-2xl">💬</span>
                        <span className="font-bold text-lg">Local Language Guide</span>
                      </div>
                      <p className="text-indigo-700 text-lg font-medium">Connect with locals in their language</p>
                    </div>
                    <Phrasebook destinationId={selectedDestination.id} />
                  </div>
                </div>
              )}

              {activeTab === 'currency' && (
                <div className="relative max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-emerald-50/80 to-teal-50/80 rounded-3xl -m-6"></div>
                  <div className="absolute inset-0 opacity-10 rounded-3xl -m-6" style={{
                    backgroundImage: 'polygon',
                    background: 'radial-gradient(circle at 50% 0%, #10b981 0%, transparent 50%), radial-gradient(circle at 0% 50%, #10b981 0%, transparent 50%), radial-gradient(circle at 100% 50%, #10b981 0%, transparent 50%), radial-gradient(circle at 50% 100%, #10b981 0%, transparent 50%)',
                    backgroundSize: '24px 24px'
                  }}></div>
                  <div className="relative z-10 p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
                        <span className="text-2xl">💱</span>
                        <span className="font-bold text-lg">Money Exchange</span>
                      </div>
                      <p className="text-green-700 text-lg font-medium">Know your spending power anywhere</p>
                    </div>
                    <CurrencyConverter destinationCurrency={selectedDestination.currency_code || 'USD'} />
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="relative max-w-4xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 via-gray-50/80 to-zinc-50/80 rounded-3xl -m-6"></div>
                  <div className="absolute inset-0 opacity-10 rounded-3xl -m-6" style={{
                    backgroundImage: 'repeating-conic-gradient(from 0deg at 50% 50%, #475569 0deg, #475569 90deg, transparent 90deg, transparent 180deg)',
                    backgroundSize: '36px 36px'
                  }}></div>
                  <div className="relative z-10 p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-600 to-gray-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
                        <span className="text-2xl">📅</span>
                        <span className="font-bold text-lg">Your Perfect Itinerary</span>
                      </div>
                      <p className="text-slate-700 text-lg font-medium">Every moment planned to perfection</p>
                    </div>
                    <ItineraryView tripPlan={tripPlan} loading={isGeneratingPlan} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
}
