import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Building,
  Smartphone,
  DollarSign,
  BarChart3,
  Download,
  Eye,
  Settings,
  Shield,
  Award,
  Loader2,
  Plus,
  Minus
} from "lucide-react";
import { AnimatedCard } from "@/components/AnimatedCard";
import { useToast } from "@/hooks/use-toast";

interface VendorWalletScreenProps {
  onBack: () => void;
  vendorId?: string;
}

interface VendorWalletData {
  balance: number;
  totalEarnings: number;
  monthlyEarnings: number;
  weeklyEarnings: number;
  pendingPayouts: number;
  completedBookings: number;
  avgEarningsPerBooking: number;
}

interface VendorTransaction {
  id: string;
  type: 'earning' | 'payout' | 'fee' | 'refund' | 'bonus';
  amount: number;
  description: string;
  bookingId?: string;
  customerName?: string;
  status: 'completed' | 'pending' | 'failed';
  createdAt: Date;
  platformFee?: number;
}

export default function VendorWalletScreen({ onBack, vendorId = "demo-vendor" }: VendorWalletScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('bank');
  const { toast } = useToast();

  // Mock data - replace with actual API calls
  const mockWalletData: VendorWalletData = {
    balance: 15682,
    totalEarnings: 45230,
    monthlyEarnings: 18450,
    weeklyEarnings: 4250,
    pendingPayouts: 2768,
    completedBookings: 127,
    avgEarningsPerBooking: 145
  };

  const mockTransactions: VendorTransaction[] = [
    {
      id: 'T001',
      type: 'earning',
      amount: 120,
      description: 'Parking booking completed',
      bookingId: 'BK001',
      customerName: 'Amit Kumar',
      status: 'completed',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      platformFee: 18
    },
    {
      id: 'T002',
      type: 'payout',
      amount: 5000,
      description: 'Bank transfer to HDFC Bank',
      status: 'completed',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 'T003',
      type: 'earning',
      amount: 90,
      description: 'Parking booking completed',
      bookingId: 'BK002',
      customerName: 'Priya Sharma',
      status: 'completed',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      platformFee: 14
    },
    {
      id: 'T004',
      type: 'bonus',
      amount: 500,
      description: 'Monthly performance bonus',
      status: 'completed',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'T005',
      type: 'fee',
      amount: 50,
      description: 'Platform service fee',
      status: 'completed',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    }
  ];

  const { data: walletData = mockWalletData, isLoading: walletLoading } = useQuery<VendorWalletData>({
    queryKey: [`/api/vendor/${vendorId}/wallet`],
    enabled: !!vendorId,
    select: (data) => data || mockWalletData
  });

  const { data: transactions = mockTransactions, isLoading: transactionsLoading } = useQuery<VendorTransaction[]>({
    queryKey: [`/api/vendor/${vendorId}/transactions`],
    enabled: !!vendorId,
    select: (data) => data || mockTransactions
  });

  const requestPayoutMutation = useMutation({
    mutationFn: async ({ amount, account }: { amount: number; account: string }) => {
      const response = await fetch(`/api/vendor/${vendorId}/request-payout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, account })
      });
      if (!response.ok) throw new Error('Failed to request payout');
      return response.json();
    },
    onSuccess: () => {
      setPayoutAmount('');
      toast({
        title: "Payout Requested",
        description: "Your payout request has been submitted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Payout Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  });

  const formatTransactionDate = (date: Date) => {
    const transactionDate = new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return transactionDate.toLocaleDateString();
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning': return <ArrowDownLeft className="h-4 w-4" />;
      case 'payout': return <ArrowUpRight className="h-4 w-4" />;
      case 'fee': return <Minus className="h-4 w-4" />;
      case 'bonus': return <Plus className="h-4 w-4" />;
      case 'refund': return <ArrowDownLeft className="h-4 w-4" />;
      default: return <ArrowDownLeft className="h-4 w-4" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'earning': return 'bg-green-100 text-green-600';
      case 'payout': return 'bg-blue-100 text-blue-600';
      case 'fee': return 'bg-red-100 text-red-600';
      case 'bonus': return 'bg-purple-100 text-purple-600';
      case 'refund': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleRequestPayout = () => {
    const amount = parseInt(payoutAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }
    if (amount > walletData.balance) {
      toast({
        title: "Insufficient Balance",
        description: "Payout amount cannot exceed available balance.",
        variant: "destructive",
      });
      return;
    }
    if (amount < 100) {
      toast({
        title: "Minimum ₹100",
        description: "Minimum payout amount is ₹100.",
        variant: "destructive",
      });
      return;
    }
    
    requestPayoutMutation.mutate({ amount, account: selectedAccount });
  };

  const earningsData = {
    week: { current: walletData.weeklyEarnings, previous: 3800, change: '+11.8%' },
    month: { current: walletData.monthlyEarnings, previous: 15200, change: '+21.4%' },
    year: { current: walletData.totalEarnings, previous: 38500, change: '+17.5%' }
  };

  if (walletLoading || transactionsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="font-semibold text-lg">SmartWallet</h1>
            <p className="text-sm opacity-90">Hello, Amit!</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <AnimatedCard>
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-90">[RUPEE] Current Balance</p>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-8 w-8" />
                    <span className="text-4xl font-bold">{walletData.balance.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-75">[PLUS] Add Money</p>
                    <p className="text-sm opacity-75">[BANK] Send to Bank</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm">
                      <TrendingUp className="h-4 w-4" />
                      <span>+23% this month</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedCard>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <Plus className="h-5 w-5" />
            <span className="text-xs">Add Money</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 flex-col space-y-1"
            onClick={() => {
              const input = document.querySelector('[data-testid="payout-amount-input"]') as HTMLInputElement;
              input?.focus();
              input?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          >
            <ArrowUpRight className="h-5 w-5" />
            <span className="text-xs">Payout</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Analytics</span>
          </Button>
        </div>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">[CREDIT_CARD] Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <p className="text-sm font-medium">[WALLET] SmartWallet:</p>
              <p className="text-sm">Balance: ₹{walletData.balance.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">[Primary Method]</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">[CREDIT_CARD] Cards:</p>
              <p className="text-sm">• Visa ****1234</p>
              <p className="text-sm">• MasterCard ****5678</p>
              <p className="text-xs text-blue-600">[PLUS] Add New Card</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">[PHONE] UPI:</p>
              <p className="text-sm">• amit@paytm</p>
              <p className="text-sm">• amit@googlepay</p>
              <p className="text-xs text-blue-600">[PLUS] Add UPI ID</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">[BANK] Net Banking:</p>
              <p className="text-sm">• HDFC Bank</p>
              <p className="text-sm">• SBI Bank</p>
              <p className="text-sm">• ICICI Bank</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">[PHONE] Other:</p>
              <p className="text-sm">• PayPal</p>
              <p className="text-sm">• Amazon Pay</p>
              <p className="text-sm">• Paytm Wallet</p>
            </div>
            
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-green-600" />
                <p className="text-sm font-medium">[SHIELD] Security:</p>
              </div>
              <p className="text-xs text-muted-foreground">• SSL Encrypted</p>
              <p className="text-xs text-muted-foreground">• PCI Compliant</p>
              <p className="text-xs text-muted-foreground">• 256-bit Security</p>
            </div>
            
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium">[SETTINGS] Auto-Pay:</p>
              <p className="text-xs text-muted-foreground">[toggle] Enable for bookings under ₹100</p>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Earnings Overview</span>
              <div className="flex space-x-1">
                {(['week', 'month', 'year'] as const).map((period) => (
                  <Button
                    key={period}
                    variant={selectedPeriod === period ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedPeriod(period)}
                    className="capitalize"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-center text-2xl font-bold text-green-600">
                  <IndianRupee className="h-5 w-5" />
                  {earningsData[selectedPeriod].current.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">This {selectedPeriod}</div>
                <div className="flex items-center justify-center space-x-1 text-green-600 text-sm mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>{earningsData[selectedPeriod].change}</span>
                </div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center text-2xl font-bold text-blue-600">
                  <IndianRupee className="h-5 w-5" />
                  {walletData.avgEarningsPerBooking}
                </div>
                <div className="text-sm text-muted-foreground">Avg per booking</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {walletData.completedBookings} bookings
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payout Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Request Payout</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span className="text-sm">Available for Payout</span>
              <div className="flex items-center font-bold text-green-600">
                <IndianRupee className="h-4 w-4" />
                {walletData.balance}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-sm">Platform Fee (15%)</span>
              <div className="flex items-center font-bold text-red-600">
                <Minus className="h-4 w-4" />
                ₹{walletData.pendingPayouts}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value)}
                    className="pl-10"
                    data-testid="payout-amount-input"
                  />
                </div>
                <Button 
                  onClick={handleRequestPayout}
                  disabled={!payoutAmount || parseInt(payoutAmount) < 100 || requestPayoutMutation.isPending}
                >
                  {requestPayoutMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <DollarSign className="h-4 w-4 mr-2" />
                      Request Payout
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum payout: ₹100 • Processing time: 1-3 business days
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-800">
              <Calendar className="h-5 w-5" />
              <span>[CALENDAR] Subscriptions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">[CALENDAR] Weekly</span>
                <span className="text-sm">₹299 • Save 10%</span>
              </div>
              <p className="text-xs text-green-600">+ Priority booking [Activate]</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">[CALENDAR] Monthly</span>
                <span className="text-sm">₹999 • Save 15%</span>
              </div>
              <p className="text-xs text-green-600">+ Priority booking [Activate]</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">[CALENDAR] Annual</span>
                <span className="text-sm">₹9999 • Save 25%</span>
              </div>
              <p className="text-xs text-green-600">+ Premium features [Activate]</p>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>[LIST] Transaction History</span>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction: VendorTransaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${getTransactionColor(transaction.type)}`}>
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      {transaction.customerName && (
                        <p className="text-xs text-muted-foreground">Customer: {transaction.customerName}</p>
                      )}
                      {transaction.bookingId && (
                        <p className="text-xs text-muted-foreground">Booking: #{transaction.bookingId}</p>
                      )}
                      <p className="text-xs text-muted-foreground">{formatTransactionDate(transaction.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'earning' || transaction.type === 'bonus' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {(transaction.type === 'earning' || transaction.type === 'bonus') ? '+' : '-'}₹{transaction.amount}
                    </p>
                    {transaction.platformFee && (
                      <p className="text-xs text-red-600">Fee: ₹{transaction.platformFee}</p>
                    )}
                    <Badge variant="secondary" className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">[BAR_CHART] Stats:</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Total Bookings: 15</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Spent: ₹2,340</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Duration: 3.2 hrs</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
