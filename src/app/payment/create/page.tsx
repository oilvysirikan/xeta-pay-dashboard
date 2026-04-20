"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function PaymentCreatePage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Payment</h1>
          <p className="text-gray-600">Create a new payment with smart routing</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Fill in the payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="shop">Shop Domain</Label>
                <Input id="shop" placeholder="example.myshopify.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input id="orderId" placeholder="ORD-001" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (THB)</Label>
                <Input id="amount" type="number" placeholder="1000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="THB">THB - Thai Baht</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="promptpay">PromptPay</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="b2b_wire">B2B Wire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TH">Thailand</SelectItem>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="SG">Singapore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="returnUrl">Return URL</Label>
              <Input id="returnUrl" placeholder="https://example.com/return" />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="isB2B" className="rounded" />
              <Label htmlFor="isB2B">B2B Transaction</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" id="forceProvider" className="rounded" />
              <Label htmlFor="forceProvider">Force Provider Selection</Label>
            </div>

            <div className="space-y-2">
              <Label>Routing Preview</Label>
              <Card className="bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Recommended Provider:</span>
                    <Badge>Omise</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Reason:</span>
                    <span className="text-sm text-gray-600">Best rate for PromptPay in Thailand</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Estimated Fee:</span>
                    <span className="text-sm text-gray-600">฿15.00 (1.5%)</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button className="w-full" size="lg">
              Create Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
