import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  QrCode,
  CreditCard,
  Building2,
  Smartphone,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface PaymentSectionProps {
  balance: number;
  setBalance: (balance: number) => void;
}

export function PaymentSection({ balance, setBalance }: PaymentSectionProps) {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();


  const [recentPayments, setRecentPayments] = useState<
    { to: string; amount: number; method: string; time: string }[]
  >([]);


  const handlePayment = async (method: string) => {
    if (!paymentAmount || isNaN(Number(paymentAmount)) || Number(paymentAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to pay.",
        variant: "destructive",
      });
      return;
    }

    const amount = Number(paymentAmount);
    if (amount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough money in your wallet.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setBalance(balance - amount);
      setPaymentAmount('');
      setUpiId('');
      setIsProcessing(false);


      const newPayment = {
        to: method === 'QR Scanner' ? 'Merchant QR' :
          method === 'UPI' ? upiId || 'UPI Recipient' : 'Bank Beneficiary',
        amount,
        method,
        time: 'Just now'
      };

      setRecentPayments(prev => [newPayment, ...prev]);

      toast({
        title: "Payment Successful! 🎉",
        description: `₹${amount} paid via ${method}`,
      });
    }, 2000);
  };

  const quickPayAmounts = [10, 25, 50, 100];

  return (
    <div className="space-y-6">
      {/* Balance Display */}
      <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Available Balance</p>
              <h2 className="text-3xl font-bold">₹{balance}</h2>
            </div>
            <CreditCard className="h-12 w-12 text-green-100" />
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Tabs defaultValue="scanner" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="scanner" className="flex items-center">
            <QrCode className="w-4 h-4 mr-1" />
            QR Scanner
          </TabsTrigger>
          <TabsTrigger value="upi" className="flex items-center">
            <Smartphone className="w-4 h-4 mr-1" />
            UPI ID
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex items-center">
            <Building2 className="w-4 h-4 mr-1" />
            Bank Transfer
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scanner" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="w-5 h-5 mr-2" />
                Scan QR Code to Pay
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* QR Code Placeholder */}
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <QrCode className="w-16 h-16 mx-auto mb-2" />
                    <p>Point camera at QR code</p>
                    <p className="text-sm">(Demo Mode)</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scanner-amount">Amount to Pay</Label>
                <Input
                  id="scanner-amount"
                  type="number"
                  placeholder="Enter amount (₹)"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {quickPayAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setPaymentAmount(amount.toString())}
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>

              <Button
                className="w-full"
                onClick={() => handlePayment('QR Scanner')}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    Pay Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upi" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="w-5 h-5 mr-2" />
                Pay using UPI ID
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input
                  id="upi-id"
                  placeholder="friend@upi (e.g., Teen@paytm)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="upi-amount">Amount to Pay</Label>
                <Input
                  id="upi-amount"
                  type="number"
                  placeholder="Enter amount (₹)"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-4 gap-2">
                {quickPayAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    size="sm"
                    onClick={() => setPaymentAmount(amount.toString())}
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>

              <Button
                className="w-full"
                onClick={() => handlePayment('UPI')}
                disabled={isProcessing || !upiId}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    Send Money
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Bank Transfer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    placeholder="XXXXXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input
                    id="ifsc"
                    placeholder="BANK0001234"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beneficiary-name">Beneficiary Name</Label>
                <Input
                  id="beneficiary-name"
                  placeholder="Enter recipient's name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank-amount">Amount to Transfer</Label>
                <Input
                  id="bank-amount"
                  type="number"
                  placeholder="Enter amount (₹)"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>

              <Button
                className="w-full"
                onClick={() => handlePayment('Bank Transfer')}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  <>
                    Transfer Money
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPayments.length === 0 ? (
              <p className="text-sm text-gray-500">No recent payments yet.</p>
            ) : (
              recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">{payment.to}</p>
                      <p className="text-sm text-gray-600">{payment.method} • {payment.time}</p>
                    </div>
                  </div>
                  <span className="font-bold text-red-600">-₹{payment.amount}</span>
                </div>
              ))
            )}
          </div>
          <div className="space-y-3">
            {[
              { to: 'Ice Cream Shop', amount: 50, method: 'QR Scanner', time: '2 hours ago' },
              { to: 'Movie Theater', amount: 120, method: 'UPI', time: '1 day ago' },
              { to: 'Book Store', amount: 80, method: 'Bank Transfer', time: '3 days ago' },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">{payment.to}</p>
                    <p className="text-sm text-gray-600">{payment.method} • {payment.time}</p>
                  </div>
                </div>
                <span className="font-bold text-red-600">-₹{payment.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
