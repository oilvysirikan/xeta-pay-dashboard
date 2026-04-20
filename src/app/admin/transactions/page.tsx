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

export default function AdminTransactionsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Transactions</h1>
            <p className="text-gray-600">View all payment transactions across platform</p>
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
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="omise">Omise</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="lianlian">LianLian</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Merchant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Merchants</SelectItem>
                  <SelectItem value="skyfast">Skyfast</SelectItem>
                  <SelectItem value="store-b">Store B</SelectItem>
                  <SelectItem value="store-c">Store C</SelectItem>
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
            <CardTitle>Transactions (12,450 total)</CardTitle>
            <CardDescription>All payment transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "TXN001", merchant: "Skyfast", amount: 15000, status: "success", provider: "Omise", method: "promptpay", date: "2026-04-19 10:30" },
                { id: "TXN002", merchant: "Store B", amount: 3200, status: "pending", provider: "Stripe", method: "card", date: "2026-04-19 10:25" },
                { id: "TXN003", merchant: "Store C", amount: 8900, status: "success", provider: "LianLian", method: "bank_transfer", date: "2026-04-19 10:20" },
                { id: "TXN004", merchant: "Skyfast", amount: 2100, status: "failed", provider: "Omise", method: "promptpay", date: "2026-04-19 10:15" },
                { id: "TXN005", merchant: "Store E", amount: 45000, status: "success", provider: "Stripe", method: "card", date: "2026-04-19 10:10" },
              ].map((txn) => (
                <div key={txn.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{txn.id}</span>
                      <Badge variant="outline">{txn.provider}</Badge>
                      <Badge variant="outline">{txn.method}</Badge>
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
                      {txn.merchant} • ฿{txn.amount.toLocaleString()} • {txn.date}
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
