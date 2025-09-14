import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  IndianRupee,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Smartphone,
  Building,
  Gift,
  Repeat,
  Clock,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

export default function WalletScreen() {
  const [addAmount, setAddAmount] = useState('');
  
  const walletBalance = 234;
  
  const quickAddAmounts = [100, 200, 500, 1000];
  
  const transactions = [
    {
      id: 'TXN001',
      type: 'debit',
      amount: 45,
      description: 'Parking at CP Premium',
      date: '2 hours ago',
      status: 'completed'
    },
    {
      id: 'TXN002',
      type: 'credit',
      amount: 500,
      description: 'Wallet Top-up via UPI',
      date: 'Yesterday',
      status: 'completed'
    },
    {
      id: 'TXN003',
      type: 'debit',
      amount: 25,
      description: 'Parking at Noida Saver',
      date: '2 days ago',
      status: 'completed'
    },
    {
      id: 'TXN004',
      type: 'credit',
      amount: 50,
      description: 'Cashback Bonus',
      date: '3 days ago',
      status: 'completed'
    }
  ];

  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, description: 'GooglePay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'All major banks' }
  ];

  const handleAddMoney = () => {
    // Implementation would handle payment processing
    console.log('Adding money:', addAmount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="space-y-2">
          <h1 className="text-lg font-semibold" data-testid="text-wallet-header">
            My Wallet
          </h1>
          <p className="text-sm opacity-80">
            Manage your parking payments
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Current Balance</p>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-6 w-6" />
                    <span className="text-3xl font-bold" data-testid="text-balance">
                      {walletBalance}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-sm">
                    <TrendingUp className="h-4 w-4" />
                    <span>+₹50 this week</span>
                  </div>
                  <p className="text-xs opacity-75 mt-1">Cashback earned</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  data-testid="button-add-money"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Money
                </Button>
                <Button 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                  data-testid="button-autopay"
                >
                  <Repeat className="h-4 w-4 mr-2" />
                  Auto-pay
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Money Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add Money</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Add Amounts */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Quick Add</p>
              <div className="grid grid-cols-4 gap-2">
                {quickAddAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => setAddAmount(amount.toString())}
                    className="h-12"
                    data-testid={`button-quick-add-${amount}`}
                  >
                    ₹{amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Custom Amount</p>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    className="pl-10"
                    data-testid="input-custom-amount"
                  />
                </div>
                <Button 
                  onClick={handleAddMoney}
                  disabled={!addAmount || parseInt(addAmount) < 10}
                  data-testid="button-proceed-payment"
                >
                  Add ₹{addAmount || 0}
                </Button>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3">
              <p className="text-sm font-medium">Payment Methods</p>
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <div 
                    key={method.id}
                    className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    data-testid={`payment-method-${method.id}`}
                  >
                    <Icon className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{method.name}</p>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Transactions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                  data-testid={`transaction-${transaction.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownLeft className="h-4 w-4" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Offers */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Gift className="h-8 w-8 text-green-600" />
              <div className="flex-1">
                <h3 className="font-medium text-green-800">Special Offer!</h3>
                <p className="text-sm text-green-600">
                  Add ₹500 or more and get ₹50 cashback
                </p>
              </div>
              <Button variant="outline" size="sm" className="text-green-600 border-green-600">
                Claim Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}