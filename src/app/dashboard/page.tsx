import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-600">Overview of your payment operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total GMV</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿12,450,000</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <CreditCard className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,450</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +15.3% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +2.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <TrendingDown className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-600 flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-red-600" />
                -5 from last hour
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest payment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "TXN001", merchant: "Store A", amount: 1500, status: "success", provider: "Omise" },
                { id: "TXN002", merchant: "Store B", amount: 3200, status: "pending", provider: "Stripe" },
                { id: "TXN003", merchant: "Store C", amount: 8900, status: "success", provider: "LianLian" },
                { id: "TXN004", merchant: "Store A", amount: 2100, status: "failed", provider: "Omise" },
              ].map((txn) => (
                <div key={txn.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <div className="font-medium">{txn.id}</div>
                    <div className="text-sm text-gray-600">{txn.merchant} • {txn.provider}</div>
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

        {/* Provider Distribution */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Omise</CardTitle>
              <CardDescription>45% of transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿5,602,500</div>
              <div className="text-sm text-gray-600">1,102 transactions</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stripe</CardTitle>
              <CardDescription>35% of transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿4,357,500</div>
              <div className="text-sm text-gray-600">857 transactions</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">LianLian</CardTitle>
              <CardDescription>20% of transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿2,490,000</div>
              <div className="text-sm text-gray-600">491 transactions</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
