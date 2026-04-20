"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MerchantSettingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-600">Configure your merchant account</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Merchant Profile</CardTitle>
                <CardDescription>Update your merchant information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" defaultValue="Skyfast Co., Ltd." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shopDomain">Shop Domain</Label>
                    <Input id="shopDomain" defaultValue="skyfast.myshopify.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="admin@skyfast.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+66 2 123 4567" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue="123 Sukhumvit Road, Bangkok 10110" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Information</CardTitle>
                <CardDescription>Your current plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-lg">ENTERPRISE</div>
                    <div className="text-sm text-gray-600">Unlimited transactions • Priority support</div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>Configure webhook URLs for payment notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input id="webhookUrl" placeholder="https://skyfast.com/webhook/payment" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="webhookSecret">Webhook Secret</Label>
                  <Input id="webhookSecret" type="password" placeholder="Enter webhook secret" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="webhookActive" defaultChecked className="rounded" />
                  <Label htmlFor="webhookActive">Enable Webhooks</Label>
                </div>
                <Button>Save Configuration</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhook Events</CardTitle>
                <CardDescription>Select events to receive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { event: "payment.succeeded", description: "Payment completed successfully" },
                    { event: "payment.failed", description: "Payment failed" },
                    { event: "payment.pending", description: "Payment is pending" },
                    { event: "refund.processed", description: "Refund was processed" },
                  ].map((item) => (
                    <div key={item.event} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.event}</div>
                        <div className="text-sm text-gray-600">{item.description}</div>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys for integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Public Key</Label>
                  <div className="flex gap-2">
                    <Input value="pk_live_xxxxxxxxxxxxxxxx" readOnly />
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secret Key</Label>
                  <div className="flex gap-2">
                    <Input value="sk_live_xxxxxxxxxxxxxxxx" type="password" readOnly />
                    <Button variant="outline">Show</Button>
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>
                <Button variant="outline">Rotate Keys</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>Integration guides and API reference</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">View Documentation</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage billing and invoices</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium mb-1">Tax ID</div>
                    <div className="text-sm text-gray-600">0105551234567</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium mb-1">Billing Email</div>
                    <div className="text-sm text-gray-600">billing@skyfast.com</div>
                  </div>
                </div>
                <Button variant="outline">Update Billing Info</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Recent invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { invoice: "INV-001", date: "2026-04-01", amount: 15000, status: "paid" },
                    { invoice: "INV-002", date: "2026-03-01", amount: 15000, status: "paid" },
                    { invoice: "INV-003", date: "2026-02-01", amount: 15000, status: "paid" },
                  ].map((inv) => (
                    <div key={inv.invoice} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <div className="font-medium">{inv.invoice}</div>
                        <div className="text-sm text-gray-600">{inv.date} • ฿{inv.amount.toLocaleString()}</div>
                      </div>
                      <Badge variant="default">{inv.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
