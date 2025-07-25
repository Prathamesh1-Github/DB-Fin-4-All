import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Award, 
  Clock, 
  Calculator,
  TrendingUp,
  PiggyBank,
  Building2,
  Target
} from 'lucide-react';

export function LearningSection() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);

  const lessons = [
    {
      id: 1,
      title: "What is Money?",
      description: "Learn the basics of money and why we use it",
      duration: "5 min",
      completed: true,
      icon: <PiggyBank className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Saving vs Spending",
      description: "Understanding when to save and when to spend",
      duration: "7 min",
      completed: true,
      icon: <Target className="w-6 h-6" />
    },
    {
      id: 3,
      title: "What is Interest?",
      description: "How banks pay you to keep money with them",
      duration: "8 min",
      completed: false,
      icon: <Calculator className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Fixed Deposits (FD)",
      description: "Safe ways to grow your money over time",
      duration: "10 min",
      completed: false,
      icon: <Building2 className="w-6 h-6" />
    },
    {
      id: 5,
      title: "Basic Investments",
      description: "Introduction to stocks and mutual funds",
      duration: "12 min",
      completed: false,
      icon: <TrendingUp className="w-6 h-6" />
    }
  ];

  const fdPlans = [
    {
      bank: "State Bank",
      duration: "1 Year",
      interestRate: 6.5,
      minAmount: 1000,
      maturityExample: 1065
    },
    {
      bank: "HDFC Bank",
      duration: "2 Years",
      interestRate: 7.0,
      minAmount: 5000,
      maturityExample: 5735
    },
    {
      bank: "ICICI Bank",
      duration: "3 Years",
      interestRate: 7.5,
      minAmount: 10000,
      maturityExample: 12344
    },
    {
      bank: "Axis Bank",
      duration: "5 Years",
      interestRate: 8.0,
      minAmount: 25000,
      maturityExample: 36666
    }
  ];

  const completeLesson = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const progressPercentage = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Learning Progress</h3>
              <p className="text-gray-600">Keep learning to become money smart!</p>
            </div>
            <Badge className="text-lg px-3 py-1">
              <Award className="w-4 h-4 mr-1" />
              {completedLessons.length}/{lessons.length} Complete
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm text-gray-600 mt-2">{Math.round(progressPercentage)}% Complete</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="lessons" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="fd-calculator">FD Calculator</TabsTrigger>
          <TabsTrigger value="tips">Money Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons" className="space-y-4">
          <div className="grid gap-4">
            {lessons.map((lesson) => (
              <Card key={lesson.id} className={lesson.completed ? "bg-green-50 border-green-200" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${
                        lesson.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {lesson.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold">{lesson.title}</h4>
                        <p className="text-sm text-gray-600">{lesson.description}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {lesson.duration}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {lesson.completed && (
                        <Badge variant="default">
                          ✓ Completed
                        </Badge>
                      )}
                      <Button
                        variant={lesson.completed ? "outline" : "default"}
                        onClick={() => completeLesson(lesson.id)}
                      >
                        {lesson.completed ? "Review" : "Start"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fd-calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="w-5 h-5 mr-2" />
                Fixed Deposit Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fdPlans.map((plan, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <p className="font-semibold">{plan.bank}</p>
                        <p className="text-sm text-gray-600">{plan.duration}</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-green-600">{plan.interestRate}%</p>
                        <p className="text-sm text-gray-600">Interest Rate</p>
                      </div>
                      <div>
                        <p className="font-semibold">₹{plan.minAmount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Min Amount</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-600">₹{plan.maturityExample.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">You'll Get*</p>
                      </div>
                      <div>
                        <Button size="sm" variant="outline">
                          Calculate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                *Example calculation based on minimum amount. Actual returns may vary.
              </p>
            </CardContent>
          </Card>

          {/* Simple FD Calculator */}
          <Card>
            <CardHeader>
              <CardTitle>FD Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="10000" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Interest Rate (%)</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="7.5" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Years</label>
                  <input 
                    type="number" 
                    className="w-full p-2 border rounded-lg" 
                    placeholder="3" 
                  />
                </div>
              </div>
              <Button className="w-full mt-4">Calculate Returns</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <div className="grid gap-4">
            {[
              {
                title: "The 50-30-20 Rule",
                description: "Spend 50% on needs, 30% on wants, and save 20%",
                icon: "🎯"
              },
              {
                title: "Start Early",
                description: "The earlier you start saving, the more your money grows!",
                icon: "⏰"
              },
              {
                title: "Emergency Fund",
                description: "Always keep some money aside for unexpected expenses",
                icon: "🛡️"
              },
              {
                title: "Compare Before Buying",
                description: "Always check prices at different places before spending",
                icon: "🔍"
              },
              {
                title: "Track Your Spending",
                description: "Know where your money goes by writing it down",
                icon: "📝"
              },
              {
                title: "Learn About Compound Interest",
                description: "Your money can earn money when invested wisely!",
                icon: "📈"
              }
            ].map((tip, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h4 className="font-semibold">{tip.title}</h4>
                      <p className="text-gray-600 text-sm">{tip.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}