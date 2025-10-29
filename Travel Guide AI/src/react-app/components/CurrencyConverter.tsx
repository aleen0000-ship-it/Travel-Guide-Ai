import { useState, useEffect } from 'react';
import { ArrowRightLeft, DollarSign } from 'lucide-react';

interface CurrencyConverterProps {
  destinationCurrency?: string;
}

export default function CurrencyConverter({ destinationCurrency = 'EUR' }: CurrencyConverterProps) {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState(destinationCurrency);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY'];

  const convertCurrency = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/currency/${fromCurrency}/${toCurrency}/${amount}`);
      const data = await response.json();
      setConvertedAmount(data.converted_amount);
      setExchangeRate(data.exchange_rate);
    } catch (error) {
      console.error('Currency conversion failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (amount > 0) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="bg-gradient-to-br from-white via-green-50 to-emerald-50 rounded-xl p-6 shadow-lg border border-green-100/50 backdrop-blur-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-green-500" />
        Currency Converter
      </h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>{currency}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <div className="flex gap-2">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
              <button
                onClick={swapCurrencies}
                className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-violet-100 via-cyan-50 to-emerald-100 rounded-lg p-4 border border-violet-200">
          {loading ? (
            <div className="text-center text-gray-600">Converting...</div>
          ) : (
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {convertedAmount.toFixed(2)} {toCurrency}
              </div>
              <div className="text-sm text-gray-600">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
