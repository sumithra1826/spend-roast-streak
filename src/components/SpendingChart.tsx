import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction } from '@/hooks/useTransactions';

interface SpendingChartProps {
  transactions: Transaction[];
}

const SpendingChart = ({ transactions }: SpendingChartProps) => {
  // Process transactions to create chart data
  const expenseTransactions = transactions.filter(t => t.category.type === 'expense');
  
  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
    const categoryName = transaction.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = {
        name: categoryName,
        value: 0,
        color: transaction.category.color
      };
    }
    acc[categoryName].value += transaction.amount;
    return acc;
  }, {} as Record<string, { name: string; value: number; color: string }>);

  const spendingData = Object.values(categoryTotals).sort((a, b) => b.value - a.value);

  if (spendingData.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-muted-foreground">
        <p>No expense data available. Start adding transactions!</p>
      </div>
    );
  }

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={spendingData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {spendingData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry: any) => (
              <span style={{ color: entry.color }}>
                {value}: ₹{entry.payload.value.toLocaleString()}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;