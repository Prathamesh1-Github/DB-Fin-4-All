import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  History, 
  Download, 
  Filter,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  Search
} from 'lucide-react';

export function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const transactions = [
    {
      id: 1,
      type: 'expense',
      category: 'Food',
      description: 'Ice Cream Shop',
      amount: -50,
      date: '2024-01-15',
      time: '14:30',
      method: 'QR Scanner',
      balance: 1250
    },
    {
      id: 2,
      type: 'income',
      category: 'Allowance',
      description: 'Weekly Pocket Money',
      amount: 200,
      date: '2024-01-14',
      time: '09:00',
      method: 'Parent Transfer',
      balance: 1300
    },
    {
      id: 3,
      type: 'expense',
      category: 'Entertainment',
      description: 'Movie Ticket',
      amount: -120,
      date: '2024-01-13',
      time: '18:45',
      method: 'UPI',
      balance: 1100
    },
    {
      id: 4,
      type: 'savings',
      category: 'Savings',
      description: 'Saved for New Bike',
      amount: -100,
      date: '2024-01-12',
      time: '16:20',
      method: 'Internal Transfer',
      balance: 1220
    },
    {
      id: 5,
      type: 'expense',
      category: 'Education',
      description: 'Book Store Purchase',
      amount: -80,
      date: '2024-01-11',
      time: '11:15',
      method: 'Bank Transfer',
      balance: 1320
    },
    {
      id: 6,
      type: 'income',
      category: 'Game',
      description: 'Investment Game Earnings',
      amount: 25,
      date: '2024-01-10',
      time: '20:30',
      method: 'Game Reward',
      balance: 1400
    },
    {
      id: 7,
      type: 'expense',
      category: 'Food',
      description: 'Pizza with Friends',
      amount: -150,
      date: '2024-01-09',
      time: '19:00',
      method: 'QR Scanner',
      balance: 1375
    },
    {
      id: 8,
      type: 'expense',
      category: 'Transport',
      description: 'Bus Fare',
      amount: -25,
      date: '2024-01-08',
      time: '07:45',
      method: 'UPI',
      balance: 1525
    }
  ];

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || transaction.type === filterType;
      return matchesSearch && matchesFilter;
    });

  const totalIncome = transactions
    .filter(t => t.type === 'income' || t.type === 'game')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totTeenpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalSavings = transactions
    .filter(t => t.type === 'savings')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'expense':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'savings':
        return <ArrowUpDown className="w-4 h-4 text-blue-500" />;
      default:
        return <ArrowUpDown className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: string, amount: number) => {
    if (type === 'income' || amount > 0) return 'text-green-600';
    if (type === 'savings') return 'text-blue-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-green-600">₹{totalIncome}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">₹{totTeenpenses}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalSavings}</p>
              </div>
              <ArrowUpDown className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <History className="w-5 h-5 mr-2" />
              Transaction History
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="income">Income Only</SelectItem>
                <SelectItem value="expense">Expenses Only</SelectItem>
                <SelectItem value="savings">Savings Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transaction List */}
          <div className="space-y-2">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.type)}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{transaction.method}</span>
                      <span>•</span>
                      <span>{transaction.date} at {transaction.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${getTransactionColor(transaction.type, transaction.amount)}`}>
                    {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                  </p>
                  <p className="text-sm text-gray-600">Balance: ₹{transaction.balance}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>This Month's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Food & Snacks', amount: 200, color: 'bg-red-100 text-red-600' },
              { label: 'Entertainment', amount: 120, color: 'bg-purple-100 text-purple-600' },
              { label: 'Education', amount: 80, color: 'bg-blue-100 text-blue-600' },
              { label: 'Transport', amount: 25, color: 'bg-green-100 text-green-600' },
            ].map((category, index) => (
              <div key={index} className={`p-3 rounded-lg ${category.color}`}>
                <p className="text-sm font-medium">{category.label}</p>
                <p className="text-lg font-bold">₹{category.amount}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}