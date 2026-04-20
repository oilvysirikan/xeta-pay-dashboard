"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RefundPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Refund</h1>
          <p className="text-gray-600">Process refunds for transactions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Transaction</CardTitle>
            <CardDescription>Find transaction to refund</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Enter transaction ID" className="flex-1" />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Process Refund</CardTitle>
            <CardDescription>Refund details and amount</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-gray-600 mb-1">Transaction ID</div>
                <Input value="TXN001" readOnly />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Original Amount</div>
                <Input value="฿1,500.00" readOnly />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-gray-600 mb-1">Refund Amount (THB)</div>
                <Input type="number" placeholder="1500" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Refund Reason</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer_request">Customer Request</SelectItem>
                    <SelectItem value="product_not_received">Product Not Received</SelectItem>
                    <SelectItem value="product_defective">Product Defective</SelectItem>
                    <SelectItem value="wrong_item">Wrong Item Sent</SelectItem>
                    <SelectItem value="duplicate">Duplicate Payment</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Notes</div>
              <Input placeholder="Additional notes (optional)" />
            </div>
            <Button className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Process Refund
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Refund History</CardTitle>
            <CardDescription>Recent refund transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "REF001", transaction: "TXN001", amount: 1500, status: "completed", date: "2026-04-19", reason: "Customer Request" },
                { id: "REF002", transaction: "TXN002", amount: 3200, status: "pending", date: "2026-04-19", reason: "Product Not Received" },
                { id: "REF003", transaction: "TXN003", amount: 890, status: "failed", date: "2026-04-18", reason: "Duplicate Payment" },
              ].map((refund) => (
                <div key={refund.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{refund.id}</span>
                      <Badge
                        variant={
                          refund.status === "completed"
                            ? "default"
                            : refund.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {refund.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {refund.transaction} • ฿{refund.amount.toLocaleString()} • {refund.reason} • {refund.date}
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
