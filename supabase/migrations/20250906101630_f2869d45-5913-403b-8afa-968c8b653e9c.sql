-- Insert sample transactions for demo purposes
-- First, get category ids for our sample data
INSERT INTO public.transactions (user_id, category_id, amount, description, app_name, transaction_date) 
SELECT 
  auth.uid(),
  c.id,
  CASE 
    WHEN c.name = 'Food & Dining' THEN (ARRAY[450, 280, 320, 150, 89, 125])[floor(random() * 6) + 1]::decimal
    WHEN c.name = 'Transportation' THEN (ARRAY[200, 150, 89, 320, 180])[floor(random() * 5) + 1]::decimal
    WHEN c.name = 'Shopping' THEN (ARRAY[1200, 800, 450, 320, 150])[floor(random() * 5) + 1]::decimal
    WHEN c.name = 'Entertainment' THEN (ARRAY[350, 250, 180, 120, 89])[floor(random() * 5) + 1]::decimal
    WHEN c.name = 'Bills & Utilities' THEN (ARRAY[1200, 800, 450, 320])[floor(random() * 4) + 1]::decimal
    ELSE 100
  END,
  CASE 
    WHEN c.name = 'Food & Dining' THEN (ARRAY['Lunch at cafe', 'Groceries', 'Dinner delivery', 'Coffee', 'Snacks', 'Restaurant'])[floor(random() * 6) + 1]
    WHEN c.name = 'Transportation' THEN (ARRAY['Uber ride', 'Metro card recharge', 'Fuel', 'Parking', 'Auto rickshaw'])[floor(random() * 5) + 1]
    WHEN c.name = 'Shopping' THEN (ARRAY['Clothes', 'Electronics', 'Books', 'Home decor', 'Gadgets'])[floor(random() * 5) + 1]
    WHEN c.name = 'Entertainment' THEN (ARRAY['Movie tickets', 'Concert', 'Gaming', 'Streaming subscription', 'Sports event'])[floor(random() * 5) + 1]
    WHEN c.name = 'Bills & Utilities' THEN (ARRAY['Electricity bill', 'Internet bill', 'Phone bill', 'Water bill'])[floor(random() * 4) + 1]
    ELSE 'Miscellaneous expense'
  END,
  CASE 
    WHEN c.name = 'Food & Dining' THEN (ARRAY['Swiggy', 'Zomato', 'BigBasket', 'Dunzo', NULL, NULL])[floor(random() * 6) + 1]
    WHEN c.name = 'Transportation' THEN (ARRAY['Uber', 'Ola', 'BMTC', 'Namma Yatri', NULL])[floor(random() * 5) + 1]
    WHEN c.name = 'Shopping' THEN (ARRAY['Amazon', 'Flipkart', 'Myntra', 'Ajio', NULL])[floor(random() * 5) + 1]
    WHEN c.name = 'Entertainment' THEN (ARRAY['BookMyShow', 'Netflix', 'Spotify', 'YouTube', 'Steam'])[floor(random() * 5) + 1]
    ELSE NULL
  END,
  now() - (random() * interval '30 days')
FROM public.categories c
WHERE c.type = 'expense'
AND EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid())
AND NOT EXISTS (SELECT 1 FROM public.transactions WHERE user_id = auth.uid());