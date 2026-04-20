"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Wallet } from "lucide-react";

export default function MerchantCommissionPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commission Earned</h1>
          <p className="text-gray-600">View your commission earnings and payouts</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Earned</CardTitle>
              <CardDescription>All time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿245,600</div>
              <div className="text-sm text-gray-600">From 8,450 transactions</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Month</CardTitle>
              <CardDescription>April 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿36,750</div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +8.2% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Payout</CardTitle>
              <CardDescription>Awaiting transfer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿12,500</div>
              <div className="text-sm text-gray-600">Next payout: May 1</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Commission History</CardTitle>
            <CardDescription>Monthly commission earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { month: "April 2026", transactions: 1245, gmv: 2450000, commission: 36750, status: "pending" },
                { month: "March 2026", transactions: 1112, gmv: 2200000, commission: 33000, status: "paid" },
                { month: "February 2026", transactions: 1089, gmv: 2150000, commission: 32250, status: "paid" },
                { month: "January 2026", transactions: 980, gmv: 1950000, commission: 29250, status: "paid" },
                { month: "December 2025", transactions: 1450, gmv: 2800000, commission: 42000, status: "paid" },
              ].map((item) => (
                <div key={item.month} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{item.month}</span>
                      <Badge variant={item.status === "paid" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.transactions} transactions • GMV: ฿{item.gmv.toLocaleString()} • Commission: ฿{item.commission.toLocaleString()}
                    </div>
                  </div>
                  {item.status === "pending" && (
                    <Button variant="outline" size="sm">
                      <Wallet className="h-4 w-4 mr-2" />
                      Request Payout
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout Settings</CardTitle>
            <CardDescription>Configure your payout bank account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-medium mb-1">Bank Name</div>
                <div className="text-sm text-gray-600">Kasikornbank</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Account Number</div>
                <div className="text-sm text-gray-600">123-4-56789-0</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Account Name</div>
                <div className="text-sm text-gray-600">Skyfast Co., Ltd.</div>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Payout Schedule</div>
                <div className="text-sm text-gray-600">Monthly (1st of each month)</div>
              </div>
            </div>
            <Button variant="outline">Update Bank Account</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
