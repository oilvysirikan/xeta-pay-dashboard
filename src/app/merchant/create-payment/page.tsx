"use client";

import { useState } from "react";
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
import { QrCode, CreditCard, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { createPayment, type PaymentIntent } from "@/lib/api";

export default function MerchantCreatePaymentPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<PaymentIntent>({
    shop: "skyfast.myshopify.com",
    orderId: "",
    amount: 0,
    currency: "THB",
    method: "promptpay",
    country: "TH",
    isB2B: false,
    customer: {},
    returnUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await createPayment(formData);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Payment</h1>
          <p className="text-gray-600">Create a new payment or generate QR code</p>
        </div>

        {result?.success && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-900">Payment Created Successfully</div>
                  <div className="text-sm text-green-700">
                    Transaction ID: {result.transaction?.id}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div className="text-red-900">{error}</div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  placeholder="ORD-001"
                  value={formData.orderId}
                  onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (THB)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="1000"
                  value={formData.amount || ""}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  placeholder="John Doe"
                  onChange={(e) => setFormData({ ...formData, customer: { ...formData.customer, name: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerEmail">Customer Email</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  placeholder="john@example.com"
                  onChange={(e) => setFormData({ ...formData, customer: { ...formData.customer, email: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Customer Phone</Label>
                <Input
                  id="customerPhone"
                  placeholder="+66 81 234 5678"
                  onChange={(e) => setFormData({ ...formData, customer: { ...formData.customer, phone: e.target.value } })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnUrl">Return URL</Label>
                <Input
                  id="returnUrl"
                  placeholder="https://skyfast.com/return"
                  value={formData.returnUrl}
                  onChange={(e) => setFormData({ ...formData, returnUrl: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select payment method</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <Select
                  value={formData.method}
                  onValueChange={(value) => setFormData({ ...formData, method: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="promptpay">PromptPay QR</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
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
                      <span className="text-sm text-gray-600">Best rate for {formData.method}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Estimated Fee:</span>
                      <span className="text-sm text-gray-600">฿{(formData.amount * 0.015).toFixed(2)} (1.5%)</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleSubmit}
                disabled={loading || !formData.orderId || !formData.amount}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4 mr-2" />
                    Create Payment
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {result?.success && result.transaction && (
          <Card>
            <CardHeader>
              <CardTitle>Payment Result</CardTitle>
              <CardDescription>Transaction created successfully</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Transaction ID</div>
                  <div className="font-medium">{result.transaction.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Status</div>
                  <Badge variant="default">{result.transaction.status}</Badge>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Provider</div>
                  <div className="font-medium">{result.routing?.provider}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Fee</div>
                  <div className="font-medium">฿{result.fee?.amount?.toFixed(2)}</div>
                </div>
              </div>
              {result.transaction.redirectUrl && (
                <Button className="w-full" asChild>
                  <a href={result.transaction.redirectUrl} target="_blank" rel="noopener noreferrer">
                    Proceed to Payment
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
