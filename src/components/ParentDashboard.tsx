import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  PlusCircle, 
  History, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  DollarSign,
  Calendar
} from 'lucide-react';



interface ChildDashboardProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}


export function ParentDashboard({ balance, setBalance }: ChildDashboardProps) {
  const [addAmount, setAddAmount] = useState('');
  // const [childBalance, setChildBalance] = useState(1250);
  const { toast } = useToast();

  const handleAddMoney = () => {
    if (!addAmount || isNaN(Number(addAmount)) || Number(addAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to add.",
        variant: "destructive",
      });
      return;
    }

    const amount = Number(addAmount);
    if (balance + amount > 2000) {
      toast({
        title: "Limit Exceeded",
        description: "Adding this amount would exceed the ₹2000 wallet limit.",
        variant: "destructive",
      });
      return;
    }

    setBalance(prev => prev + amount);
    setAddAmount('');
    toast({
      title: "Money Added Successfully",
      description: `₹${amount} has been added to Teen's wallet.`,
    });
  };

  const transactions = [
    { id: 1, type: 'expense', description: 'Ice Cream Shop', amount: -50, date: '2024-01-15', category: 'Food' },
    { id: 2, type: 'income', description: 'Pocket Money', amount: 200, date: '2024-01-14', category: 'Allowance' },
    { id: 3, type: 'expense', description: 'Movie Ticket', amount: -120, date: '2024-01-13', category: 'Entertainment' },
    { id: 4, type: 'savings', description: 'Saved for Bike', amount: -100, date: '2024-01-12', category: 'Savings' },
    { id: 5, type: 'expense', description: 'Book Store', amount: -80, date: '2024-01-11', category: 'Education' },
  ];

  const spendingCategories = [
    { category: 'Food', amount: 150, percentage: 30 },
    { category: 'Entertainment', amount: 120, percentage: 24 },
    { category: 'Education', amount: 80, percentage: 16 },
    { category: 'Savings', amount: 100, percentage: 20 },
    { category: 'Others', amount: 50, percentage: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 w-screen">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
              <p className="text-gray-600">Monitor and manage Teen's financial journey</p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              <CheckCircle className="w-4 h-4 mr-1" />
              All Good
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="manage">Manage Funds</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current Balance</p>
                      <p className="text-2xl font-bold text-green-600">₹{balance}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Spending</p>
                      <p className="text-2xl font-bold text-blue-600">₹500</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Savings Rate</p>
                      <p className="text-2xl font-bold text-purple-600">20%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Days Active</p>
                      <p className="text-2xl font-bold text-orange-600">15</p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Spending Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Spending Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spendingCategories.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">{item.category}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">₹{item.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          transaction.type === 'income' ? 'bg-green-500' : 
                          transaction.type === 'savings' ? 'bg-blue-500' : 'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                        </p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Money to Teen's Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Current Balance</Label>
                    <div className="text-2xl font-bold text-green-600">₹{balance}</div>
                  </div>
                  <div>
                    <Label>Wallet Limit</Label>
                    <div className="text-2xl font-bold text-gray-600">₹2000</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount to Add</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount (₹)"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    max={2000 - balance}
                  />
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Maximum available to add: ₹{2000 - balance}</span>
                </div>

                <Button onClick={handleAddMoney} className="w-full">
                  Add Money
                </Button>
              </CardContent>
            </Card>

            {/* Quick Add Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Add</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {[50, 100, 200, 500].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      onClick={() => {
                        if (balance + amount <= 2000) {
                          setBalance(prev => prev + amount);
                          toast({
                            title: "Money Added",
                            description: `₹${amount} added successfully.`,
                          });
                        } else {
                          toast({
                            title: "Limit Exceeded",
                            description: "This would exceed the wallet limit.",
                            variant: "destructive",
                          });
                        }
                      }}
                      disabled={balance + amount > 2000}
                    >
                      +₹{amount}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}