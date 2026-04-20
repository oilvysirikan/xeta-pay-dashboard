"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { XCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function PaymentErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Payment Failed</CardTitle>
          <CardDescription>Your payment could not be processed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Error Details */}
          <div className="bg-red-50 p-4 rounded-lg space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID</span>
              <span className="font-medium">TXN-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium">ORD-001</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount</span>
              <span className="font-medium">฿1,500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment Method</span>
              <span className="font-medium">PromptPay</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <Badge variant="destructive">Failed</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Error</span>
              <span className="font-medium text-red-600">Payment timeout</span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button className="w-full" variant="outline" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Return to Merchant
              </Link>
            </Button>
          </div>

          {/* Support */}
          <div className="text-center text-sm text-gray-600">
            Need help? <Link href="/support" className="text-blue-600 hover:underline">Contact Support</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
