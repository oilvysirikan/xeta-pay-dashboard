"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { QrCode, Download, Copy } from "lucide-react";

export default function QRGeneratorPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">QR Generator</h1>
          <p className="text-gray-600">Generate PromptPay QR codes for payments</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate QR Code</CardTitle>
            <CardDescription>Create a PromptPay QR code for payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-gray-600 mb-1">Phone Number</div>
                <Input placeholder="0812345678" />
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Amount (THB)</div>
                <Input type="number" placeholder="1000" />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Reference (Optional)</div>
              <Input placeholder="Payment reference" />
            </div>
            <Button className="w-full">
              <QrCode className="h-4 w-4 mr-2" />
              Generate QR Code
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR Code Preview</CardTitle>
            <CardDescription>Generated QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="h-32 w-32 mx-auto text-gray-400" />
                  <div className="text-sm text-gray-600 mt-2">QR Code Preview</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PNG
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download SVG
                </Button>
                <Button variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy URL
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent QR Codes</CardTitle>
            <CardDescription>Recently generated QR codes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "QR001", phone: "0812345678", amount: 1000, reference: "ORD-001", date: "2026-04-19" },
                { id: "QR002", phone: "0823456789", amount: 2500, reference: "ORD-002", date: "2026-04-19" },
                { id: "QR003", phone: "0834567890", amount: 500, reference: "ORD-003", date: "2026-04-18" },
              ].map((qr) => (
                <div key={qr.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{qr.id}</span>
                      <Badge variant="outline">{qr.phone}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      ฿{qr.amount.toLocaleString()} • {qr.reference} • {qr.date}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
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
