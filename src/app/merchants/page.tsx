"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";

export default function MerchantsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Merchants</h1>
            <p className="text-gray-600">Manage merchant accounts</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Merchant
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input placeholder="Search merchants..." className="flex-1" />
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
            <CardDescription>All registered merchants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "M001", name: "Store A", shop: "store-a.myshopify.com", plan: "PRO", status: "active", gmv: 1500000 },
                { id: "M002", name: "Store B", shop: "store-b.myshopify.com", plan: "FREE", status: "active", gmv: 320000 },
                { id: "M003", name: "Store C", shop: "store-c.myshopify.com", plan: "PRO", status: "active", gmv: 890000 },
                { id: "M004", name: "Store D", shop: "store-d.myshopify.com", plan: "ENTERPRISE", status: "active", gmv: 2500000 },
              ].map((merchant) => (
                <div key={merchant.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{merchant.name}</span>
                      <Badge variant={merchant.plan === "PRO" ? "default" : merchant.plan === "ENTERPRISE" ? "default" : "secondary"}>
                        {merchant.plan}
                      </Badge>
                      <Badge variant="outline">{merchant.status}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {merchant.shop} • GMV: ฿{merchant.gmv.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      API Key
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
