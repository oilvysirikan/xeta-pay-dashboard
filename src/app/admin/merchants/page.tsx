"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MoreHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminMerchantsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Merchants Management</h1>
            <p className="text-gray-600">Manage all merchant accounts</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Merchant
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Input placeholder="Search merchants..." className="max-w-xs" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="free">FREE</SelectItem>
                  <SelectItem value="pro">PRO</SelectItem>
                  <SelectItem value="enterprise">ENTERPRISE</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Merchant List</CardTitle>
            <CardDescription>All registered merchants (156 total)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "M001", name: "Skyfast", shop: "skyfast.myshopify.com", plan: "ENTERPRISE", status: "active", gmv: 15000000, transactions: 5200 },
                { id: "M002", name: "Store B", shop: "store-b.myshopify.com", plan: "PRO", status: "active", gmv: 3200000, transactions: 1200 },
                { id: "M003", name: "Store C", shop: "store-c.myshopify.com", plan: "PRO", status: "active", gmv: 8900000, transactions: 3500 },
                { id: "M004", name: "Store D", shop: "store-d.myshopify.com", plan: "FREE", status: "pending", gmv: 0, transactions: 0 },
                { id: "M005", name: "Store E", shop: "store-e.myshopify.com", plan: "ENTERPRISE", status: "active", gmv: 25000000, transactions: 8900 },
              ].map((merchant) => (
                <div key={merchant.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{merchant.name}</span>
                      <Badge variant={merchant.plan === "PRO" ? "default" : merchant.plan === "ENTERPRISE" ? "default" : "secondary"}>
                        {merchant.plan}
                      </Badge>
                      <Badge variant={merchant.status === "active" ? "default" : merchant.status === "pending" ? "secondary" : "destructive"}>
                        {merchant.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {merchant.shop} • GMV: ฿{merchant.gmv.toLocaleString()} • {merchant.transactions} transactions
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
