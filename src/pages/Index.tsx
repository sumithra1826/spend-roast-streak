import { Wallet, PiggyBank, TrendingDown } from "lucide-react";
import SpendingChart from "@/components/SpendingChart";
import AIInsightCard from "@/components/AIInsightCard";
import StreakCounter from "@/components/StreakCounter";
import BadgeSystem from "@/components/BadgeSystem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
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
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Demo User</p>
              <p className="font-semibold">Rahul Sharma</p>
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
              <div className="text-2xl font-bold">₹3,300</div>
              <p className="text-sm text-destructive">
                <TrendingDown className="h-4 w-4 inline mr-1" />
                12% over budget
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
              <div className="text-2xl font-bold">₹12,000</div>
              <p className="text-sm text-success">₹1,800 remaining</p>
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
              <SpendingChart />
            </CardContent>
          </Card>

          {/* AI Insights */}
          <AIInsightCard />
        </div>

        {/* Badge System */}
        <BadgeSystem />
      </main>
    </div>
  );
};

export default Index;