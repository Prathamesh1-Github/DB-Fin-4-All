import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  Target,
  AlertTriangle 
} from 'lucide-react';

interface WalletSectionProps {
  balance: number;
  setBalance: (balance: number) => void;
}

export function WalletSection({ balance }: WalletSectionProps) {
  const walletLimit = 2000;
  const usagePercentage = (balance / walletLimit) * 100;
  
  const recentActivity = [
    { type: 'received', amount: 200, description: 'Pocket money from Dad', time: '2 hours ago' },
    { type: 'spent', amount: -50, description: 'Ice cream with friends', time: '1 day ago' },
    { type: 'saved', amount: -100, description: 'Moved to savings', time: '2 days ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Main Wallet Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-blue-100">Your Wallet</p>
              <h2 className="text-3xl font-bold">₹{balance}</h2>
            </div>
            <Wallet className="h-12 w-12 text-blue-100" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-blue-100">
              <span>Used: ₹{balance}</span>
              <span>Limit: ₹{walletLimit}</span>
            </div>
            <Progress value={usagePercentage} className="h-2 bg-blue-400" />
          </div>
          
          {usagePercentage > 80 && (
            <div className="mt-3 flex items-center text-yellow-200 text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              You're close to your spending limit!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wallet Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Limit</p>
                <p className="text-xl font-bold text-green-600">₹{walletLimit - balance}</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-xl font-bold text-blue-600">₹150</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Month</p>
                <p className="text-xl font-bold text-purple-600">₹680</p>
              </div>
              <TrendingDown className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'received' ? 'bg-green-500' : 
                    activity.type === 'saved' ? 'bg-blue-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-gray-600">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={activity.type === 'received' ? 'default' : 'secondary'}>
                    {activity.amount > 0 ? '+' : ''}₹{Math.abs(activity.amount)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">💡 Money Tip of the Day</h3>
          <p className="text-yellow-700 text-sm">
            Try to save at least 20% of your pocket money. Small savings today can help you buy bigger things tomorrow!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}