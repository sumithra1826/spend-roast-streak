import { Brain, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from '@/hooks/useTransactions';

interface AIInsightCardProps {
  transactions: Transaction[];
}

const AIInsightCard = ({ transactions }: AIInsightCardProps) => {
  // Analyze spending patterns
  const expenseTransactions = transactions.filter(t => t.category.type === 'expense');
  
  if (expenseTransactions.length === 0) {
    return (
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Start adding transactions to get AI insights!</p>
        </CardContent>
      </Card>
    );
  }

  // Find top spending category
  const categoryTotals = expenseTransactions.reduce((acc, t) => {
    acc[t.category.name] = (acc[t.category.name] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a)[0];
  const totalSpent = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  // Find most used app
  const appTotals = expenseTransactions
    .filter(t => t.app_name)
    .reduce((acc, t) => {
      acc[t.app_name] = (acc[t.app_name] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const topApp = Object.entries(appTotals).sort(([,a], [,b]) => b - a)[0];

  // Generate witty roast
  const roasts = [
    `Spending ₹${topCategory[1].toLocaleString()} on ${topCategory[0]}? Your wallet is crying! 💸`,
    `${topCategory[0]} addiction detected! ₹${topCategory[1].toLocaleString()} could buy happiness... or groceries 🤷‍♂️`,
    `₹${totalSpent.toLocaleString()} spent this month. Are you buying gold or just living your best life? ✨`,
    topApp ? `${topApp[0]} is loving your ₹${topApp[1].toLocaleString()}. Time to break up? 📱💔` : `Managing money like a pro... NOT! 😅`
  ];

  const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

  return (
    <Card className="bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-accent/50 p-4 rounded-lg">
          <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
            🔥 Roast of the Week
          </h3>
          <p className="text-sm italic">
            "{randomRoast}"
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-destructive">₹{topCategory[1].toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Top Category</div>
            <div className="text-sm font-medium">{topCategory[0]}</div>
          </div>
          
          <div className="text-center p-3 bg-muted/30 rounded-lg">
            <div className="text-lg font-bold text-warning">{topApp ? '📱' : '💰'}</div>
            <div className="text-xs text-muted-foreground">{topApp ? 'Top App' : 'Total Spent'}</div>
            <div className="text-sm font-medium">
              {topApp ? topApp[0] : `₹${totalSpent.toLocaleString()}`}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4" />
          <span>
            {topCategory[0] === 'Food & Dining' 
              ? "Try cooking at home twice a week to save money!" 
              : `Consider setting a monthly limit for ${topCategory[0]} expenses.`}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightCard;