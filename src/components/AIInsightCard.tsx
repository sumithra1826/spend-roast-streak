import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingUp, Brain } from "lucide-react";

const AIInsightCard = () => {
  return (
    <Card className="bg-gradient-card border-2 border-warning/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-warning">
          <Brain className="h-5 w-5" />
          AI Coach Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg">
          <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Top Spend: Food ₹1,200</p>
            <p className="text-xs text-muted-foreground">40% of weekly budget</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
          <div>
            <p className="font-semibold text-sm">Overspending: Swiggy &gt; Groceries</p>
            <p className="text-xs text-muted-foreground">Switch to cooking for savings</p>
          </div>
        </div>

        <div className="bg-gradient-primary text-white p-4 rounded-lg text-center">
          <p className="text-lg font-bold mb-1">💸 Roast of the Week</p>
          <p className="text-sm font-medium">"Your wallet is crying, not you 💸"</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightCard;