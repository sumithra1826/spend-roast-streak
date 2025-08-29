import { Navigate } from "react-router-dom";
import { Wallet, PiggyBank, TrendingDown, LogOut, Plus } from "lucide-react";
import SpendingChart from "@/components/SpendingChart";
import AIInsightCard from "@/components/AIInsightCard";
import StreakCounter from "@/components/StreakCounter";
import BadgeSystem from "@/components/BadgeSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useTransactions } from "@/hooks/useTransactions";

const Index = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { transactions, loading: transactionsLoading } = useTransactions();

  // If not authenticated, redirect to auth page
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Show loading state while fetching data
  if (authLoading || profileLoading || transactionsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-primary p-3 rounded-xl mb-4 inline-block">
            <PiggyBank className="h-8 w-8 text-white animate-pulse" />
          </div>
          <p>Loading your financial data...</p>
        </div>
      </div>
    );
  }

  // Calculate financial statistics from real data
  const weeklyExpenses = transactions
    .filter(t => {
      const transactionDate = new Date(t.transaction_date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return transactionDate >= weekAgo && t.category.type === 'expense';
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = transactions
    .filter(t => {
      const transactionDate = new Date(t.transaction_date);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return transactionDate >= monthAgo && t.category.type === 'expense';
    })
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyBudget = profile?.monthly_budget || 12000;
  const remainingBudget = monthlyBudget - monthlyExpenses;
  const budgetPercentage = Math.round((monthlyExpenses / monthlyBudget) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary p-2 rounded-xl">
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SpendRoast</h1>
                <p className="text-sm text-muted-foreground">Your witty financial coach</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Welcome back!</p>
                <p className="font-semibold">{profile?.full_name || user?.email?.split('@')[0]}</p>
              </div>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Wallet className="h-5 w-5 text-primary" />
                Weekly Spent
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{weeklyExpenses.toLocaleString()}</div>
              <p className={`text-sm ${budgetPercentage > 100 ? 'text-destructive' : 'text-success'}`}>
                <TrendingDown className="h-4 w-4 inline mr-1" />
                {budgetPercentage > 100 ? `${budgetPercentage - 100}% over budget` : 'Within budget'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <PiggyBank className="h-5 w-5 text-success" />
                Monthly Budget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{monthlyBudget.toLocaleString()}</div>
              <p className={`text-sm ${remainingBudget < 0 ? 'text-destructive' : 'text-success'}`}>
                ₹{Math.abs(remainingBudget).toLocaleString()} {remainingBudget < 0 ? 'over budget' : 'remaining'}
              </p>
            </CardContent>
          </Card>

          <div className="md:col-span-1">
            <StreakCounter />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Spending Chart */}
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Weekly Spending Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendingChart transactions={transactions} />
            </CardContent>
          </Card>

          {/* AI Insights */}
          <AIInsightCard transactions={transactions} />
        </div>

        {/* Badge System */}
        <BadgeSystem />
      </main>
    </div>
  );
};

export default Index;