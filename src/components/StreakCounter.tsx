import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Calendar, Target } from "lucide-react";

const StreakCounter = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="bg-gradient-primary text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Flame className="h-5 w-5" />
            Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">14 Days</div>
          <p className="text-xs opacity-90">Under budget!</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-achievement text-white">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Target className="h-5 w-5" />
            Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">85%</div>
          <p className="text-xs opacity-90">Monthly target</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreakCounter;