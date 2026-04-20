"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, CreditCard, Users, Building2, Loader2 } from "lucide-react";
import { getAuth } from "@/lib/auth";
import { getMerchants, getTransactions } from "@/lib/db";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [merchants, setMerchants] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);

  useEffect(() => {
    const { user } = getAuth();
    if (!user || user.role !== "admin") {
      router.push("/login");
      return;
    }

    const loadData = async () => {
      try {
        const [merchantsData, transactionsData] = await Promise.all([
          getMerchants(10),
          getTransactions("", 10),
        ]);
        setMerchants(merchantsData);
        setTransactions(transactionsData);
      } catch (error) {
        console.error("Failed to load admin data:", error);
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

  const totalGMV = merchants.reduce((sum: number, m: any) => sum + (m.gmv || 0), 0);
  const totalTransactions = merchants.reduce((sum: number, m: any) => sum + (m.transactions || 0), 0);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h1>
          <p className="text-gray-600">Overview of XETA Pay platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total GMV</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿{totalGMV.toLocaleString()}</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +25.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <CreditCard className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTransactions.toLocaleString()}</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +18.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Merchants</CardTitle>
              <Building2 className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{merchants.length}</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +12 new this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commission Paid</CardTitle>
              <Users className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿685,200</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Platform Health */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Health</CardTitle>
            <CardDescription>System status and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium">Payment Router</div>
                  <div className="text-sm text-gray-600">sv9-router</div>
                </div>
                <Badge variant="default">Online</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium">D1 Database</div>
                  <div className="text-sm text-gray-600">xeta-payments-db</div>
                </div>
                <Badge variant="default">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium">KV Cache</div>
                  <div className="text-sm text-gray-600">CACHE namespace</div>
                </div>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payment activities across all merchants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((txn: any) => (
                <div key={txn.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <div className="font-medium">{txn.id}</div>
                    <div className="text-sm text-gray-600">{txn.shop} • {txn.provider}</div>
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
