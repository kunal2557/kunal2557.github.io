import { useQuery, useMutation } from "@tanstack/react-query";
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
  TrendingUp,
  Loader2,
  Shield,
  Settings
} from "lucide-react";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { UserWallet, WalletTransaction } from "@shared/schema";

interface WalletScreenProps {
  userId?: string;
}

export default function WalletScreen({ userId = "demo-user" }: WalletScreenProps) {
  const [addAmount, setAddAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const { toast } = useToast();
  
  const quickAddAmounts = [100, 200, 500, 1000];

  // Fetch wallet data
  const { data: wallet, isLoading: walletLoading, error: walletError, refetch: refetchWallet } = useQuery<UserWallet>({
    queryKey: [`/api/wallet/${userId}`],
    enabled: !!userId,
    select: (data) => data || { balance: 1350, id: userId, userId } // Demo data
  });

  // Fetch transactions data
  const { data: transactions = [], isLoading: transactionsLoading, error: transactionsError, refetch: refetchTransactions } = useQuery<WalletTransaction[]>({
    queryKey: [`/api/wallet/${userId}/transactions`],
    enabled: !!userId,
    select: (data) => data || [
      {
        id: '1',
        userId,
        amount: 200,
        type: 'credit' as const,
        description: 'Added money via UPI',
        status: 'completed' as const,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
      },
      {
        id: '2',
        userId,
        amount: 50,
        type: 'debit' as const,
        description: 'Parking at Connaught Place',
        status: 'completed' as const,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        id: '3',
        userId,
        amount: 100,
        type: 'credit' as const,
        description: 'Cashback from booking',
        status: 'completed' as const,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
      }
    ]
  });

  // Add money mutation
  const addMoneyMutation = useMutation({
    mutationFn: async ({ amount, paymentMethod }: { amount: number; paymentMethod: string }) => {
      const response = await fetch(`/api/wallet/${userId}/add-money`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, paymentMethod })
      });
      if (!response.ok) throw new Error('Failed to add money');
      return response.json();
    },
    onSuccess: (_, variables) => {
      // Invalidate and refetch wallet data
      queryClient.invalidateQueries({ queryKey: [`/api/wallet/${userId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/wallet/${userId}/transactions`] });
      setAddAmount('');
      toast({
        title: "Money Added Successfully",
        description: `₹${variables.amount} has been added to your wallet.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Add Money",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  });

  // Helper function to format transaction date
  const formatTransactionDate = (date: Date) => {
    const transactionDate = new Date(date);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return transactionDate.toLocaleDateString();
  };

  const paymentMethods = [
    { id: 'upi', name: 'UPI Payment', icon: Smartphone, description: 'GooglePay, PhonePe, Paytm' },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', name: 'Net Banking', icon: Building, description: 'All major banks' }
  ];

  const handleAddMoney = () => {
    const amount = parseInt(addAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive",
      });
      return;
    }
    if (amount < 10) {
      toast({
        title: "Minimum ₹10",
        description: "Please add at least ₹10.",
      });
      return;
    }
    if (amount > 50000) {
      toast({
        title: "Limit exceeded",
        description: "Maximum top-up per transaction is ₹50,000.",
        variant: "destructive",
      });
      return;
    }
    
    addMoneyMutation.mutate({ amount, paymentMethod: selectedPaymentMethod });
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

  if (walletError || transactionsError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-600">Error loading wallet data</p>
          <Button onClick={() => {
            refetchWallet();
            refetchTransactions();
          }}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="space-y-2">
          <h1 className="text-lg font-semibold" data-testid="text-wallet-header">
            ← SmartWallet
          </h1>
          <p className="text-sm opacity-80">
            Hello, Amit!
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm opacity-90">[RUPEE] Current Balance</p>
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-8 w-8" />
                  <span className="text-4xl font-bold" data-testid="text-balance">
                    {wallet?.balance?.toLocaleString() || '1,350'}
                  </span>
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
                    <span>+₹50 this week</span>
                  </div>
                  <p className="text-xs opacity-75 mt-1">Cashback earned</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <Plus className="h-5 w-5" />
            <span className="text-xs">[BOLT] Quick Add:</span>
            <span className="text-xs">[₹100] [₹500] [₹1000]</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <ArrowUpRight className="h-5 w-5" />
            <span className="text-xs">[PLUS] Add New</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <Building className="h-5 w-5" />
            <span className="text-xs">[CALENDAR] Subscriptions</span>
          </Button>
        </div>

        {/* Payment Gateway Integration */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">B. Payment Gateway Integration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium">Payment Options:</p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">[CREDIT_CARD] Payment Methods</p>
                
                <div className="space-y-2">
                  <p className="text-sm">[WALLET] SmartWallet:</p>
                  <p className="text-sm">Balance: ₹{wallet?.balance?.toLocaleString() || '1,350'}</p>
                  <p className="text-xs text-muted-foreground">[Primary Method]</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm">[CREDIT_CARD] Cards:</p>
                  <p className="text-sm">• Visa ****1234</p>
                  <p className="text-sm">• MasterCard ****5678</p>
                  <p className="text-xs text-blue-600">[PLUS] Add New Card</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm">[PHONE] UPI:</p>
                  <p className="text-sm">• amit@paytm</p>
                  <p className="text-sm">• amit@googlepay</p>
                  <p className="text-xs text-blue-600">[PLUS] Add UPI ID</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm">[BANK] Net Banking:</p>
                  <p className="text-sm">• HDFC Bank</p>
                  <p className="text-sm">• SBI Bank</p>
                  <p className="text-sm">• ICICI Bank</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm">[PHONE] Other:</p>
                  <p className="text-sm">• PayPal</p>
                  <p className="text-sm">• Amazon Pay</p>
                  <p className="text-sm">• Paytm Wallet</p>
                </div>
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
                      <p className="text-sm text-muted-foreground">{formatTransactionDate(transaction.createdAt!)}</p>
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