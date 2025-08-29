import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  app_name: string;
  transaction_date: string;
  category: {
    name: string;
    color: string;
    icon: string;
    type: 'expense' | 'income';
  };
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTransactions = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          id,
          amount,
          description,
          app_name,
          transaction_date,
          categories!inner (
            name,
            color,
            icon,
            type
          )
        `)
        .eq('user_id', user.id)
        .order('transaction_date', { ascending: false });

      if (error) throw error;

      const formattedTransactions = data?.map(t => ({
        id: t.id,
        amount: t.amount,
        description: t.description,
        app_name: t.app_name,
        transaction_date: t.transaction_date,
        category: {
          name: t.categories.name,
          color: t.categories.color,
          icon: t.categories.icon,
          type: t.categories.type as 'expense' | 'income'
        }
      })) || [];

      setTransactions(formattedTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  return { transactions, loading, refetch: fetchTransactions };
};