"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CreditCard, ShoppingCart, DollarSign, Loader2 } from "lucide-react";
import { getAuth } from "@/lib/auth";
import { getDashboardStats, getTransactions } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function MerchantDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>([]);

  useEffect(() => {
    const { user } = getAuth();
    if (!user || user.role !== "merchant") {
      router.push("/login");
      return;
    }

    const loadData = async () => {
      try {
        const shop = user.shop || "skyfast.myshopify.com";
        const [statsData, transactionsData] = await Promise.all([
          getDashboardStats(shop),
          getTransactions(shop, 5),
        ]);
        setStats(statsData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [router]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  const { user } = getAuth();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Merchant Dashboard</h1>
          <p className="text-gray-600">Welcome, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GMV (Month)</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿{stats?.totalGMV?.toLocaleString()}</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +15.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalTransactions?.toLocaleString()}</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +12.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CreditCard className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.successRate}%</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +1.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pendingCount}</div>
              <p className="text-xs text-gray-600">Awaiting processing</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((txn: any) => (
                <div key={txn.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <div className="font-medium">{txn.orderId}</div>
                    <div className="text-sm text-gray-600">{txn.method} • {txn.createdAt}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">฿{txn.amount.toLocaleString()}</div>
                    <Badge
                      variant={
                        txn.status === "success"
                          ? "default"
                          : txn.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {txn.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
