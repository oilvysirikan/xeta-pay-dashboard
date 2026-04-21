"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createThaiQR, checkPaymentStatus, callLianLianAPI } from "@/lib/lianlian";

export default function TestPaymentPage() {
  const [amount, setAmount] = useState("100");
  const [orderId, setOrderId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [status, setStatus] = useState<"idle" | "creating" | "created" | "checking" | "completed">("idle");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [error, setError] = useState("");
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateOrderId = () => {
    const id = `TEST_${Date.now()}_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrderId(id);
    return id;
  };

  const handleCreateQR = async () => {
    setError("");
    setStatus("creating");
    setQrCode("");
    setPaymentStatus("");

    const id = orderId || generateOrderId();
    const agentId = "1"; // Default agent ID for testing

    try {
      const request = await createThaiQR(parseFloat(amount), id, agentId);
      console.log('Request URL:', request.url);
      console.log('Request Body:', request.body);
      
      const response = await callLianLianAPI(request);

      if (response.code === "0000" && response.data?.qr_code) {
        setQrCode(response.data.qr_code);
        setStatus("created");
        
        // Start polling for payment status
        startPolling(id);
      } else {
        setError(response.message || "Failed to create QR code");
        setStatus("idle");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create QR code");
      setStatus("idle");
    }
  };

  const startPolling = (id: string) => {
    const checkStatus = async (id: string) => {
      try {
        const request = await checkPaymentStatus(id);
        const response = await callLianLianAPI(request);

        if (response.data?.payment_status === "SUCCESS") {
          setPaymentStatus("SUCCESS");
          setStatus("completed");
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
        } else if (response.data?.payment_status === "FAILED") {
          setPaymentStatus("FAILED");
          setStatus("completed");
          if (pollingIntervalRef.current) {
            clearInterval(pollingIntervalRef.current);
            pollingIntervalRef.current = null;
          }
        }
      } catch (err) {
        console.error("Status check error:", err);
      }
    };

    pollingIntervalRef.current = setInterval(() => checkStatus(id), 3000); // Poll every 3 seconds

    // Stop polling after 5 minutes
    setTimeout(() => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    }, 300000);
  };

  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>LianLian Thai QR Payment Test</CardTitle>
            <CardDescription>
              Test Thai QR payment creation and status checking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (THB)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID (Optional)</Label>
              <Input
                id="orderId"
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Auto-generated if empty"
              />
            </div>

            <Button
              onClick={handleCreateQR}
              disabled={status === "creating"}
              className="w-full"
            >
              {status === "creating" ? "Creating..." : "สร้าง Thai QR"}
            </Button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {error}
              </div>
            )}

            {qrCode && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Order ID:</p>
                  <p className="font-mono text-sm">{orderId}</p>
                </div>

                <div className="flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg">
                    <img src={qrCode} alt="Thai QR Code" className="w-64 h-64" />
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Payment Status:</p>
                  <p className="font-semibold">{paymentStatus || "Checking..."}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
