import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Shield, Zap, Crown, Star, Trophy } from "lucide-react";

const badges = [
  {
    id: 1,
    name: "Budget Ninja",
    description: "2 weeks under budget",
    icon: Shield,
    unlocked: true,
    color: "text-primary"
  },
  {
    id: 2,
    name: "Streak Master",
    description: "14 day streak",
    icon: Zap,
    unlocked: true,
    color: "text-achievement"
  },
  {
    id: 3,
    name: "Saving Samurai",
    description: "Save ₹5000 in a month",
    icon: Crown,
    unlocked: false,
    color: "text-muted-foreground"
  },
  {
    id: 4,
    name: "Expense Expert",
    description: "Track 30 days consistently",
    icon: Star,
    unlocked: false,
    color: "text-muted-foreground"
  }
];

const BadgeSystem = () => {
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-lg border transition-all ${
                  badge.unlocked 
                    ? 'bg-gradient-achievement/10 border-achievement/30 shadow-sm' 
                    : 'bg-muted/50 border-muted'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <IconComponent className={`h-4 w-4 ${badge.color}`} />
                  <span className={`text-sm font-medium ${badge.unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {badge.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {badge.description}
                </p>
                {badge.unlocked && (
                  <div className="mt-2">
                    <span className="text-xs bg-achievement text-achievement-foreground px-2 py-1 rounded-full">
                      Unlocked!
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {unlockedBadges.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              🎉 {unlockedBadges.length} badge{unlockedBadges.length > 1 ? 's' : ''} earned this month!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BadgeSystem;