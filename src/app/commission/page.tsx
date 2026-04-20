"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, Download } from "lucide-react";

export default function CommissionPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Commission</h1>
            <p className="text-gray-600">Calculate and pay commissions to agents</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Commission</CardTitle>
              <CardDescription>Pending payout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿124,500</div>
              <div className="text-sm text-gray-600">45 agents</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paid This Month</CardTitle>
              <CardDescription>Already paid</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿89,200</div>
              <div className="text-sm text-gray-600">32 agents</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Commission Rate</CardTitle>
              <CardDescription>Average rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.5%</div>
              <div className="text-sm text-gray-600">of transaction value</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Calculate Commission</CardTitle>
            <CardDescription>Calculate commission for a specific transaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-gray-600 mb-1">Transaction Amount</div>
                <Input type="number" placeholder="1000" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Commission Rate (%)</div>
                <Input type="number" placeholder="1.5" />
              </div>
            </div>
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Calculate
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission Payouts</CardTitle>
            <CardDescription>Recent commission payouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { agent: "Agent A", amount: 2500, status: "pending", transactions: 15 },
                { agent: "Agent B", amount: 1800, status: "paid", transactions: 12 },
                { agent: "Agent C", amount: 3200, status: "pending", transactions: 20 },
                { agent: "Agent D", amount: 1500, status: "paid", transactions: 10 },
              ].map((payout) => (
                <div key={payout.agent} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{payout.agent}</span>
                      <Badge variant={payout.status === "paid" ? "default" : "secondary"}>
                        {payout.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {payout.transactions} transactions • ฿{payout.amount.toLocaleString()}
                    </div>
                  </div>
                  {payout.status === "pending" && (
                    <Button variant="outline" size="sm">
                      Pay Now
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
