"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Banknote, Send } from "lucide-react";

export default function DisbursementPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Disbursement</h1>
            <p className="text-gray-600">Transfer funds to agents and master accounts</p>
          </div>
          <Button>
            <Send className="h-4 w-4 mr-2" />
            New Disbursement
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Available Balance</CardTitle>
              <CardDescription>Ready to disburse</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿1,245,000</div>
              <div className="text-sm text-gray-600">In settlement account</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Disbursements</CardTitle>
              <CardDescription>Awaiting processing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿89,500</div>
              <div className="text-sm text-gray-600">12 disbursements</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Disbursed</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿2,450,000</div>
              <div className="text-sm text-gray-600">45 disbursements</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Disbursement</CardTitle>
            <CardDescription>Transfer funds to a recipient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-gray-600 mb-1">Recipient Type</div>
                <select className="w-full p-2 border rounded-md">
                  <option value="agent">Agent</option>
                  <option value="master">Master Account</option>
                  <option value="merchant">Merchant</option>
                </select>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Recipient</div>
                <Input placeholder="Select recipient" />
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Amount (THB)</div>
              <Input type="number" placeholder="1000" />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Bank Account</div>
              <Input placeholder="Select bank account" />
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-1">Reference</div>
              <Input placeholder="Optional reference" />
            </div>
            <Button className="w-full">
              <Banknote className="h-4 w-4 mr-2" />
              Process Disbursement
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Disbursement History</CardTitle>
            <CardDescription>Recent disbursement transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "DIS001", recipient: "Agent A", amount: 5000, status: "completed", date: "2026-04-19" },
                { id: "DIS002", recipient: "Master Account", amount: 25000, status: "pending", date: "2026-04-19" },
                { id: "DIS003", recipient: "Agent B", amount: 3500, status: "completed", date: "2026-04-18" },
                { id: "DIS004", recipient: "Agent C", amount: 8000, status: "failed", date: "2026-04-18" },
              ].map((disbursement) => (
                <div key={disbursement.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{disbursement.id}</span>
                      <Badge
                        variant={
                          disbursement.status === "completed"
                            ? "default"
                            : disbursement.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {disbursement.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {disbursement.recipient} • ฿{disbursement.amount.toLocaleString()} • {disbursement.date}
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
