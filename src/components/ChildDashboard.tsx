import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WalletSection } from './child/WalletSection';
import { PaymentSection } from './child/PaymentSection';
import { LearningSection } from './child/LearningSection';
import { TransactionHistory } from './child/TransactionHistory';
import { SavingsSection } from './child/SavingsSection';
import { ChatBot } from './child/ChatBot';
import {
  Wallet,
  CreditCard,
  TrendingUp,
  BookOpen,
  History,
  PiggyBank,
  MessageCircle,
  Award
} from 'lucide-react';


interface ChildDashboardProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}


export function ChildDashboard({ balance, setBalance }: ChildDashboardProps) {
  // const [balance, setBalance] = useState(1250);
  const [savings, setSavings] = useState(750);
  const [totalEarned, setTotalEarned] = useState(125);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-screen">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hi Teen! 👋</h1>
              <p className="text-gray-600">Ready to learn about money today?</p>
            </div>
            {/* <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                <Award className="w-4 h-4 mr-1" />
                Level 3
              </Badge>
            </div> */}
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-lg px-3 py-1">
                <Award className="w-4 h-4 mr-1" />
                Level 3
              </Badge>

              <a
                href="https://deutsche-bank-hackathon-fin-4-all.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                  Play Game
                </button>
              </a>
            </div>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Wallet Balance</p>
                  <p className="text-2xl font-bold text-green-600">₹{balance}</p>
                </div>
                <Wallet className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Savings</p>
                  <p className="text-2xl font-bold text-blue-600">₹{savings}</p>
                </div>
                <PiggyBank className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Game Earnings</p>
                  <p className="text-2xl font-bold text-purple-600">₹{totalEarned}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="wallet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="wallet" className="flex items-center">
              <Wallet className="w-4 h-4 mr-1" />
              Wallet
            </TabsTrigger>
            <TabsTrigger value="payments" className="flex items-center">
              <CreditCard className="w-4 h-4 mr-1" />
              Pay
            </TabsTrigger>
            {/* <TabsTrigger value="invest" className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              Invest
            </TabsTrigger> */}
            <TabsTrigger value="learn" className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History className="w-4 h-4 mr-1" />
              History
            </TabsTrigger>
            <TabsTrigger value="savings" className="flex items-center">
              <PiggyBank className="w-4 h-4 mr-1" />
              Save
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              Help
            </TabsTrigger>
          </TabsList>

          <TabsContent value="wallet">
            <WalletSection balance={balance} setBalance={setBalance} />
          </TabsContent>

          <TabsContent value="payments">
            <PaymentSection balance={balance} setBalance={setBalance} />
          </TabsContent>

          {/* <TabsContent value="invest">
            <InvestmentGame totalEarned={totalEarned} setTotalEarned={setTotalEarned} />
          </TabsContent> */}

          <TabsContent value="learn">
            <LearningSection />
          </TabsContent>

          <TabsContent value="history">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="savings">
            <SavingsSection savings={savings} setSavings={setSavings} balance={balance} setBalance={setBalance} />
          </TabsContent>

          <TabsContent value="chat">
            <ChatBot />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}