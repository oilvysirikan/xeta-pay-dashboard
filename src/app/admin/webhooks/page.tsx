"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminWebhooksPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Webhook Logs</h1>
          <p className="text-gray-600">View webhook events from payment providers</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Input placeholder="Search events..." className="max-w-xs" />
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="omise">Omise</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="lianlian">LianLian</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="payment.succeeded">Payment Succeeded</SelectItem>
                  <SelectItem value="payment.failed">Payment Failed</SelectItem>
                  <SelectItem value="payment.pending">Payment Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Webhook Events</CardTitle>
            <CardDescription>Recent webhook events from providers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "WH001", provider: "Omise", type: "payment.succeeded", status: "processed", time: "2 min ago", merchant: "Skyfast" },
                { id: "WH002", provider: "Stripe", type: "payment.failed", status: "processed", time: "5 min ago", merchant: "Store B" },
                { id: "WH003", provider: "LianLian", type: "payment.succeeded", status: "processed", time: "10 min ago", merchant: "Store C" },
                { id: "WH004", provider: "Omise", type: "payment.pending", status: "pending", time: "15 min ago", merchant: "Skyfast" },
                { id: "WH005", provider: "Stripe", type: "payment.succeeded", status: "processed", time: "20 min ago", merchant: "Store E" },
              ].map((event) => (
                <div key={event.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{event.id}</span>
                      <Badge variant="outline">{event.provider}</Badge>
                      <Badge
                        variant={
                          event.status === "processed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {event.type} • {event.merchant} • {event.time}
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
