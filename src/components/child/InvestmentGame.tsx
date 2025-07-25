import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Trophy,
  Target,
  Activity
} from 'lucide-react';

interface InvestmentGameProps {
  totalEarned: number;
  setTotalEarned: (amount: number) => void;
}

interface Stock {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  owned: number;
}

export function InvestmentGame({ totalEarned, setTotalEarned }: InvestmentGameProps) {
  const [gameBalance, setGameBalance] = useState(1000); // Virtual money for the game
  const [stocks, setStocks] = useState<Stock[]>([
    { id: 1, name: 'TechCorp', symbol: 'TECH', price: 100, change: 5, changePercent: 5.2, owned: 0 },
    { id: 2, name: 'GreenEnergy', symbol: 'GREEN', price: 75, change: -2, changePercent: -2.6, owned: 0 },
    { id: 3, name: 'FoodChain', symbol: 'FOOD', price: 50, change: 3, changePercent: 6.4, owned: 0 },
    { id: 4, name: 'GameStudio', symbol: 'GAME', price: 150, change: 10, changePercent: 7.1, owned: 0 },
    { id: 5, name: 'BookWorld', symbol: 'BOOK', price: 40, change: -1, changePercent: -2.4, owned: 0 },
  ]);
  
  const { toast } = useToast();

  // Simulate stock price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const changePercent = (Math.random() - 0.5) * 10; // -5% to +5% change
          const newPrice = Math.max(10, stock.price + (stock.price * changePercent / 100));
          const change = newPrice - stock.price;
          
          return {
            ...stock,
            price: Math.round(newPrice),
            change: Math.round(change * 100) / 100,
            changePercent: Math.round(changePercent * 100) / 100
          };
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const buyStock = (stockId: number) => {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) return;

    if (gameBalance >= stock.price) {
      setGameBalance(prev => prev - stock.price);
      setStocks(prev => prev.map(s => 
        s.id === stockId ? { ...s, owned: s.owned + 1 } : s
      ));
      
      toast({
        title: "Stock Purchased! 📈",
        description: `Bought 1 share of ${stock.name} for ₹${stock.price}`,
      });
    } else {
      toast({
        title: "Not Enough Money",
        description: `You need ₹${stock.price} to buy this stock.`,
        variant: "destructive",
      });
    }
  };

  const sellStock = (stockId: number) => {
    const stock = stocks.find(s => s.id === stockId);
    if (!stock || stock.owned === 0) return;

    setGameBalance(prev => prev + stock.price);
    setStocks(prev => prev.map(s => 
      s.id === stockId ? { ...s, owned: s.owned - 1 } : s
    ));

    // Add to real earnings (convert from game to real money at 10:1 ratio)
    const realEarnings = Math.round(stock.price / 10);
    setTotalEarned(prev => prev + realEarnings);
    
    toast({
      title: "Stock Sold! 💰",
      description: `Sold 1 share of ${stock.name} for ₹${stock.price}. Earned ₹${realEarnings} real money!`,
    });
  };

  const portfolioValue = stocks.reduce((total, stock) => total + (stock.price * stock.owned), 0);
  const totalValue = gameBalance + portfolioValue;

  return (
    <div className="space-y-6">
      {/* Game Balance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Game Cash</p>
                <p className="text-xl font-bold text-green-600">₹{gameBalance}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Portfolio Value</p>
                <p className="text-xl font-bold text-blue-600">₹{portfolioValue}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-xl font-bold text-purple-600">₹{totalValue}</p>
              </div>
              <Target className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Real Earnings</p>
                <p className="text-xl font-bold text-orange-600">₹{totalEarned}</p>
              </div>
              <Trophy className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Market */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Stock Market (Live Demo)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stocks.map((stock) => (
              <div key={stock.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-semibold">{stock.name}</p>
                      <p className="text-sm text-gray-600">{stock.symbol}</p>
                    </div>
                    <Badge variant={stock.change >= 0 ? "default" : "destructive"}>
                      {stock.change >= 0 ? '+' : ''}₹{stock.change} ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{stock.price}</p>
                    {stock.owned > 0 && (
                      <p className="text-sm text-gray-600">Owned: {stock.owned}</p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => buyStock(stock.id)}
                      disabled={gameBalance < stock.price}
                    >
                      Buy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sellStock(stock.id)}
                      disabled={stock.owned === 0}
                    >
                      Sell
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">📚 Investment Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-blue-700">
            <div className="flex items-start space-x-2">
              <span className="font-bold">1.</span>
              <p>Diversify: Don't put all your money in one stock!</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-bold">2.</span>
              <p>Buy low, sell high: Look for opportunities when prices drop.</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-bold">3.</span>
              <p>Be patient: Good investments take time to grow.</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-bold">4.</span>
              <p>Learn from mistakes: Every loss teaches you something!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reset Game */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Reset Investment Game</p>
              <p className="text-sm text-gray-600">Start fresh with ₹1000 game money</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                setGameBalance(1000);
                setStocks(prev => prev.map(s => ({ ...s, owned: 0 })));
                toast({
                  title: "Game Reset",
                  description: "Your investment game has been reset!",
                });
              }}
            >
              Reset Game
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}