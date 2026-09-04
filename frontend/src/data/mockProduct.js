const emiPlans = [
  { id: 'p1', tenure_months: 3,  monthly_amount: 44967, interest_rate: 0,    cashback_amount: 7500 },
  { id: 'p2', tenure_months: 6,  monthly_amount: 22483, interest_rate: 0,    cashback_amount: 7500 },
  { id: 'p3', tenure_months: 12, monthly_amount: 11242, interest_rate: 0,    cashback_amount: 7500 },
  { id: 'p4', tenure_months: 24, monthly_amount: 5621,  interest_rate: 0,    cashback_amount: 7500 },
  { id: 'p5', tenure_months: 36, monthly_amount: 4297,  interest_rate: 10.5, cashback_amount: 7500 },
  { id: 'p6', tenure_months: 48, monthly_amount: 3385,  interest_rate: 10.5, cashback_amount: 7500 },
  { id: 'p7', tenure_months: 60, monthly_amount: 2842,  interest_rate: 10.5, cashback_amount: 7500 },
]

export const mockProduct = {
  id: 'mock-1',
  slug: 'iphone-17-pro',
  name: 'iPhone 17 Pro',
  brand: 'Apple',
  description: 'Apple iPhone 17 Pro with A19 Pro chip and titanium design.',
  product_variants: [
    { id: 'v1', variant_label: '256GB · Cosmic Orange', color: 'Cosmic Orange', storage: '256GB', mrp: 134900, price: 127400, image_url: 'https://placehold.co/600x600/f5f5f5/333333/png?text=iPhone+17+Pro+Orange', is_default: true,  emi_plans: emiPlans },
    { id: 'v2', variant_label: '256GB · Silver',         color: 'Silver',        storage: '256GB', mrp: 134900, price: 127400, image_url: 'https://placehold.co/600x600/f5f5f5/333333/png?text=iPhone+17+Pro+Silver', is_default: false, emi_plans: emiPlans },
    { id: 'v3', variant_label: '256GB · Deep Blue',       color: 'Deep Blue',     storage: '256GB', mrp: 134900, price: 127400, image_url: 'https://placehold.co/600x600/f5f5f5/333333/png?text=iPhone+17+Pro+Blue', is_default: false, emi_plans: emiPlans },
  ],
}