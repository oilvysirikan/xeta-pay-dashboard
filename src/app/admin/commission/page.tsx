"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, Download, TrendingUp } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminCommissionPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Commission Summary</h1>
            <p className="text-gray-600">View and manage commission payouts</p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Commission</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿685,200</div>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Payout</CardTitle>
              <CardDescription>Awaiting payment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿124,500</div>
              <div className="text-sm text-gray-600">45 agents</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Paid This Month</CardTitle>
              <CardDescription>Already paid</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">฿560,700</div>
              <div className="text-sm text-gray-600">32 agents</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Avg Commission Rate</CardTitle>
              <CardDescription>Platform average</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.5%</div>
              <div className="text-sm text-gray-600">of transaction value</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter by Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="lastMonth">Last Month</SelectItem>
                  <SelectItem value="thisYear">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="agent-a">Agent A</SelectItem>
                  <SelectItem value="agent-b">Agent B</SelectItem>
                </SelectContent>
              </Select>
              <Button>Apply Filter</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Commission by Agent</CardTitle>
            <CardDescription>Commission earned by each agent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { agent: "Agent A", transactions: 150, totalAmount: 2500000, commission: 37500, status: "paid" },
                { agent: "Agent B", transactions: 120, totalAmount: 1800000, commission: 27000, status: "paid" },
                { agent: "Agent C", transactions: 200, totalAmount: 3200000, commission: 48000, status: "pending" },
                { agent: "Agent D", transactions: 85, totalAmount: 1200000, commission: 18000, status: "pending" },
                { agent: "Agent E", transactions: 95, totalAmount: 1500000, commission: 22500, status: "paid" },
              ].map((item) => (
                <div key={item.agent} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{item.agent}</span>
                      <Badge variant={item.status === "paid" ? "default" : "secondary"}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {item.transactions} transactions • Total: ฿{item.totalAmount.toLocaleString()} • Commission: ฿{item.commission.toLocaleString()}
                    </div>
                  </div>
                  {item.status === "pending" && (
                    <Button variant="outline" size="sm">
                      <Calculator className="h-4 w-4 mr-2" />
                      Process Payout
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
