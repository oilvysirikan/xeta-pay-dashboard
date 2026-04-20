"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { QrCode, Clock, CreditCard } from "lucide-react";

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Payment</CardTitle>
          <CardDescription>Complete your payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium">ORD-001</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Merchant</span>
              <span className="font-medium">Skyfast</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>฿1,500.00</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <QrCode className="h-48 w-48 mx-auto text-gray-800" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Scan with PromptPay app</div>
              <div className="text-xs text-gray-500">Expires in 15:00</div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3">
            <div className="text-sm font-medium">Or pay with</div>
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Credit/Debit Card
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Clock className="h-4 w-4 mr-2" />
              Bank Transfer
            </Button>
          </div>

          {/* Security Notice */}
          <div className="text-center text-xs text-gray-500">
            <Badge variant="outline" className="mb-2">Secure Payment</Badge>
            <div>Powered by XETA Pay</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
