"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export default function PaymentStatusPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Status</h1>
          <p className="text-gray-600">Check payment status by transaction ID</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Transaction</CardTitle>
            <CardDescription>Enter transaction ID to check status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Enter transaction ID (e.g., TXN001)" className="flex-1" />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>Payment information and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-gray-600">Transaction ID</div>
                <div className="font-medium">TXN001</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Status</div>
                <Badge variant="default">Success</Badge>
              </div>
              <div>
                <div className="text-sm text-gray-600">Amount</div>
                <div className="font-medium">฿1,500.00</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Currency</div>
                <div className="font-medium">THB</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Payment Method</div>
                <div className="font-medium">PromptPay</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Provider</div>
                <div className="font-medium">Omise</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Shop</div>
                <div className="font-medium">example.myshopify.com</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Order ID</div>
                <div className="font-medium">ORD-001</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Created At</div>
                <div className="font-medium">2026-04-19 10:30:00</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Updated At</div>
                <div className="font-medium">2026-04-19 10:35:00</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="text-sm font-medium mb-2">Routing Information</div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rule:</span>
                  <span>promptpay_th_best_rate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reason:</span>
                  <span>Best rate for PromptPay in Thailand</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee:</span>
                  <span>฿22.50 (1.5%)</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="text-sm font-medium mb-2">Customer Information</div>
              <div className="grid gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span>John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>john@example.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span>+66 81 234 5678</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline">View Receipt</Button>
              <Button variant="outline">Refund</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
