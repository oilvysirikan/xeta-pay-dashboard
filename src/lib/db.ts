const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api";

export interface Transaction {
  id: string;
  orderId: string;
  shop: string;
  provider: string;
  method: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Merchant {
  id: string;
  name: string;
  shop: string;
  plan: string;
  status: string;
  gmv: number;
  transactions: number;
}

export interface DashboardStats {
  totalGMV: number;
  totalTransactions: number;
  successRate: number;
  pendingCount: number;
}

// API functions that call Pages Functions
export async function getDashboardStats(shop: string): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE}/dashboard/stats?shop=${encodeURIComponent(shop)}`);
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }
  return response.json();
}

export async function getTransactions(shop: string, limit = 50): Promise<Transaction[]> {
  const response = await fetch(`${API_BASE}/transactions/list?shop=${encodeURIComponent(shop)}&limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }
  return response.json();
}

export async function getMerchants(limit = 50): Promise<Merchant[]> {
  const response = await fetch(`${API_BASE}/merchants/list?limit=${limit}`);
  if (!response.ok) {
    throw new Error("Failed to fetch merchants");
  }
  return response.json();
}

export async function getCommissionSummary(shop: string): Promise<{
  totalEarned: number;
  thisMonth: number;
  pending: number;
  history: Array<{ month: string; amount: number; status: string }>;
}> {
  // TODO: Create commission API endpoint
  return {
    totalEarned: 245600,
    thisMonth: 36750,
    pending: 12500,
    history: [
      { month: "April 2026", amount: 36750, status: "pending" },
      { month: "March 2026", amount: 33000, status: "paid" },
      { month: "February 2026", amount: 32250, status: "paid" },
    ],
  };
}
