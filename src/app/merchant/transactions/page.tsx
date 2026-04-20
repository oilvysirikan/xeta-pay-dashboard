"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MerchantTransactionsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
            <p className="text-gray-600">View all your payment transactions</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Input placeholder="Search transactions..." className="max-w-xs" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="promptpay">PromptPay</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transactions (1,245 total)</CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "ORD001", amount: 15000, status: "success", method: "promptpay", provider: "Omise", date: "2026-04-19 10:30", customer: "John Doe" },
                { id: "ORD002", amount: 3200, status: "pending", method: "card", provider: "Stripe", date: "2026-04-19 10:25", customer: "Jane Smith" },
                { id: "ORD003", amount: 8900, status: "success", method: "bank_transfer", provider: "LianLian", date: "2026-04-19 10:20", customer: "Bob Johnson" },
                { id: "ORD004", amount: 2100, status: "failed", method: "promptpay", provider: "Omise", date: "2026-04-19 10:15", customer: "Alice Brown" },
                { id: "ORD005", amount: 4500, status: "success", method: "card", provider: "Stripe", date: "2026-04-19 10:10", customer: "Charlie Davis" },
              ].map((txn) => (
                <div key={txn.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{txn.id}</span>
                      <Badge variant="outline">{txn.method}</Badge>
                      <Badge variant="outline">{txn.provider}</Badge>
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
                    <div className="text-sm text-gray-600">
                      {txn.customer} • ฿{txn.amount.toLocaleString()} • {txn.date}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
