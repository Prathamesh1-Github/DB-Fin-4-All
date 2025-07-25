import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  PiggyBank, 
  Target, 
  Plus,
  Minus,
  Trophy,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface SavingsSectionProps {
  savings: number;
  setSavings: (savings: number) => void;
  balance: number;
  setBalance: (balance: number) => void;
}

export function SavingsSection({ savings, setSavings, balance, setBalance }: SavingsSectionProps) {
  const [transferAmount, setTransferAmount] = useState('');
  const [savingsGoals, setSavingsGoals] = useState([
    { id: 1, name: 'New Bicycle', target: 5000, saved: 2500, deadline: '2024-06-01' },
    { id: 2, name: 'Gaming Console', target: 15000, saved: 8000, deadline: '2024-12-01' },
    { id: 3, name: 'Birthday Party', target: 2000, saved: 1200, deadline: '2024-03-15' },
  ]);

  const { toast } = useToast();

  const moveToSavings = () => {
    if (!transferAmount || isNaN(Number(transferAmount)) || Number(transferAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to save.",
        variant: "destructive",
      });
      return;
    }

    const amount = Number(transferAmount);
    if (amount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough money in your wallet.",
        variant: "destructive",
      });
      return;
    }

    setBalance(balance - amount);
    setSavings(savings + amount);
    setTransferAmount('');
    
    toast({
      title: "Money Saved! 🎉",
      description: `₹${amount} moved to your savings account.`,
    });
  };

  const moveToWallet = () => {
    if (!transferAmount || isNaN(Number(transferAmount)) || Number(transferAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to withdraw.",
        variant: "destructive",
      });
      return;
    }

    const amount = Number(transferAmount);
    if (amount > savings) {
      toast({
        title: "Insufficient Savings",
        description: "You don't have enough money in your savings.",
        variant: "destructive",
      });
      return;
    }

    if (balance + amount > 2000) {
      toast({
        title: "Wallet Limit Exceeded",
        description: "This would exceed your wallet limit of ₹2000.",
        variant: "destructive",
      });
      return;
    }

    setSavings(savings - amount);
    setBalance(balance + amount);
    setTransferAmount('');
    
    toast({
      title: "Money Withdrawn",
      description: `₹${amount} moved from savings to wallet.`,
    });
  };

  const totalGoalTarget = savingsGoals.reduce((sum, goal) => sum + goal.target, 0);
  const totalGoalSaved = savingsGoals.reduce((sum, goal) => sum + goal.saved, 0);

  return (
    <div className="space-y-6 ">
      {/* Savings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Savings</p>
                <h2 className="text-3xl font-bold">₹{savings}</h2>
              </div>
              <PiggyBank className="h-12 w-12 text-blue-100" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Savings Rate</p>
                <p className="text-2xl font-bold text-green-600">
                  {balance + savings > 0 ? Math.round((savings / (balance + savings)) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Monthly Growth</p>
                <p className="text-2xl font-bold text-purple-600">₹425</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transfer Money */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <PiggyBank className="w-5 h-5 mr-2" />
            Transfer Money
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Wallet Balance</Label>
              <div className="text-2xl font-bold text-green-600">₹{balance}</div>
            </div>
            <div>
              <Label>Savings Balance</Label>
              <div className="text-2xl font-bold text-blue-600">₹{savings}</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transfer-amount">Amount</Label>
            <Input
              id="transfer-amount"
              type="number"
              placeholder="Enter amount (₹)"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              onClick={moveToSavings}
              className="flex items-center"
              disabled={!transferAmount || Number(transferAmount) > balance}
            >
              <Plus className="w-4 h-4 mr-2" />
              Save Money
            </Button>
            <Button 
              variant="outline"
              onClick={moveToWallet}
              className="flex items-center"
              disabled={!transferAmount || Number(transferAmount) > savings}
            >
              <Minus className="w-4 h-4 mr-2" />
              Withdraw
            </Button>
          </div>

          {/* Quick Save Buttons */}
          <div className="space-y-2">
            <Label>Quick Save</Label>
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 200, 500].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setTransferAmount(amount.toString())}
                  disabled={amount > balance}
                >
                  ₹{amount}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Savings Goals
            </div>
            <Button variant="outline" size="sm">
              Add Goal
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savingsGoals.map((goal) => {
              const progress = (goal.saved / goal.target) * 100;
              const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={goal.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{goal.name}</h4>
                      <p className="text-sm text-gray-600">{daysLeft} days left</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{goal.saved} / ₹{goal.target}</p>
                      <p className="text-sm text-gray-600">{Math.round(progress)}% complete</p>
                    </div>
                  </div>
                  <Progress value={progress} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{goal.target - goal.saved} remaining</span>
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Goals Summary */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-800">Total Goal Progress</p>
                <p className="text-sm text-blue-600">
                  ₹{totalGoalSaved} saved of ₹{totalGoalTarget} target
                </p>
              </div>
              <Trophy className="h-8 w-8 text-blue-600" />
            </div>
            <Progress 
              value={(totalGoalSaved / totalGoalTarget) * 100} 
              className="mt-2 h-2" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Savings Tips */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-green-800 mb-2">💡 Savings Tips</h3>
          <div className="space-y-2 text-green-700 text-sm">
            <p>• Try to save at least 20% of your pocket money every week</p>
            <p>• Set specific goals - it's easier to save for something you want!</p>
            <p>• Use the "pay yourself first" rule - save money as soon as you get it</p>
            <p>• Track your progress and celebrate small wins along the way</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}