import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageCircle, 
  Send, 
  Bot,
  User,
  Lightbulb
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! 👋 I'm MoneyBot, your financial learning assistant! I can help you understand money, savings, investments, and answer any questions you have about managing your finances. What would you like to learn about today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Predefined responses for common financial questions
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('save') || message.includes('saving')) {
      return "Great question about saving! 💰 Here are some tips:\n\n• Start small - even ₹10 per week adds up!\n• Set a specific goal (like a new game or toy)\n• Use the 50-30-20 rule: spend 50% on needs, 30% on wants, save 20%\n• Keep your savings in a separate place so you're not tempted to spend it\n\nWhat specific savings goal do you have in mind?";
    }
    
    if (message.includes('interest') || message.includes('fd') || message.includes('fixed deposit')) {
      return "Interest is like a reward banks give you for keeping money with them! 🏦\n\nThink of it like this:\n• You lend ₹100 to the bank\n• The bank pays you extra money (interest) for using your money\n• After 1 year, you might get ₹107 back (7% interest)\n• The longer you keep money in the bank, the more interest you earn!\n\nFixed Deposits (FD) are a safe way to earn interest. Want to know more about how they work?";
    }
    
    if (message.includes('invest') || message.includes('stock') || message.includes('share')) {
      return "Investing is like planting seeds to grow money trees! 🌱📈\n\n• Stocks are like owning a tiny piece of a company\n• When the company does well, your stock value goes up\n• When it doesn't do well, the value can go down\n• It's important to learn before you invest real money\n• Start with our investment game to practice!\n\nRemember: Never invest money you can't afford to lose. Always learn first!";
    }
    
    if (message.includes('budget') || message.includes('plan')) {
      return "Budgeting is like making a plan for your money! 📝💡\n\nHere's a simple way to start:\n1. Write down how much money you get (pocket money, gifts)\n2. List what you need to spend on (lunch, transport)\n3. List what you want to buy (games, snacks)\n4. Decide how much to save\n5. Track where your money actually goes\n\nTry the 50-30-20 rule: 50% needs, 30% wants, 20% savings!";
    }
    
    if (message.includes('emergency') || message.includes('emergency fund')) {
      return "An emergency fund is like having a superhero cape for your money! 🦸‍♂️💰\n\n• It's money saved for unexpected things (broken phone, urgent needs)\n• Try to save at least ₹200-500 for emergencies\n• Keep it separate from your regular savings\n• Only use it for real emergencies, not for things you want\n\nHaving an emergency fund gives you peace of mind!";
    }
    
    if (message.includes('debt') || message.includes('loan') || message.includes('borrow')) {
      return "Borrowing money is like making a promise to pay back later! 🤝\n\n• Only borrow what you really need\n• Always pay back on time to build trust\n• Borrowing costs extra money (interest)\n• It's better to save up and buy things with your own money\n• If you must borrow, have a clear plan to pay back\n\nRemember: Good debt helps you (like education), bad debt hurts you (like expensive toys you don't need)!";
    }
    
    if (message.includes('bank') || message.includes('account')) {
      return "Banks are like safe houses for your money! 🏦🔒\n\n• They keep your money safe\n• They pay you interest for keeping money there\n• You can access your money when needed\n• They help you track your spending\n• Some accounts are special for kids and teens\n\nWhen you're older, having a good relationship with a bank will help you get loans for important things like education!";
    }
    
    if (message.includes('goal') || message.includes('target')) {
      return "Setting money goals is like planning an awesome adventure! 🎯✨\n\n• Make your goals specific (not just 'save money', but 'save ₹500 for a new game')\n• Set a deadline (by your birthday, in 3 months)\n• Break big goals into smaller steps\n• Track your progress and celebrate wins\n• Write your goals down where you can see them\n\nWhat's something you're saving for? I can help you make a plan!";
    }
    
    if (message.includes('job') || message.includes('earn') || message.includes('work')) {
      return "Learning to earn money is a valuable skill! 💼🌟\n\n• Do extra chores for pocket money\n• Help neighbors with small tasks\n• Sell things you make (art, crafts)\n• Offer services (dog walking, tutoring younger kids)\n• Always ask your parents before taking on any work\n\nRemember: The money you work for feels more valuable than money you just receive!";
    }
    
    // Default responses
    const defaultResponses = [
      "That's an interesting question! 🤔 Money management is all about making smart choices. Can you tell me more about what specifically you'd like to know?",
      "I'd love to help you learn about that! 📚 Financial literacy is super important. What aspect interests you most?",
      "Great topic! 💡 Understanding money helps you make better decisions. What would you like to explore about this?",
      "I'm here to help you become money-smart! 🎓 Can you be more specific about what you'd like to learn?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "How do I start saving money?",
    "What is compound interest?",
    "How do stocks work?",
    "What's a budget?",
    "Why should I save money?"
  ];

  return (
    <div className="space-y-6">
      {/* Chat Interface */}
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            MoneyBot - Your Financial Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-72 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-green-500 text-white'
                  }`}>
                    {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`flex-1 max-w-xs lg:max-w-md ${
                    message.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    <div className={`inline-block p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-block p-3 rounded-lg bg-gray-100">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about money..."
                disabled={isLoading}
              />
              <Button 
                onClick={sendMessage} 
                disabled={!inputMessage.trim() || isLoading}
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            Quick Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(question)}
                className="justify-start text-left h-auto p-3"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bot Info */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Bot className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-800">About MoneyBot</h3>
              <p className="text-green-700 text-sm mt-1">
                I'm here to help you learn about money management, saving, investing, and making smart financial decisions. 
                I use simple examples and fun explanations to make learning about money easy and interesting!
              </p>
              <p className="text-green-600 text-xs mt-2">
                💡 Tip: Ask me specific questions for the best answers!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}