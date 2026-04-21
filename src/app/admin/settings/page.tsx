"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminSettingsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-600">Configure XETA Pay platform settings</p>
        </div>

        <Tabs defaultValue="providers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="providers">Providers</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="line">Line Notify</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="commission">Commission</TabsTrigger>
          </TabsList>

          <TabsContent value="providers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Omise</CardTitle>
                <CardDescription>Configure Omise payment provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="omise-secret">Secret Key</Label>
                  <Input id="omise-secret" type="password" placeholder="skey_test_..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="omise-public">Public Key</Label>
                  <Input id="omise-public" placeholder="pkey_test_..." />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="default">Enabled</Badge>
                  <Button variant="outline">Test Connection</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stripe</CardTitle>
                <CardDescription>Configure Stripe payment provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stripe-secret">Secret Key</Label>
                  <Input id="stripe-secret" type="password" placeholder="sk_test_..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook">Webhook Secret</Label>
                  <Input id="stripe-webhook" type="password" placeholder="whsec_..." />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="default">Enabled</Badge>
                  <Button variant="outline">Test Connection</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>LianLian</CardTitle>
                <CardDescription>Configure LianLian payment provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lianlian-public">Public Key</Label>
                  <Input id="lianlian-public" placeholder="LL_PUBLIC_KEY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lianlian-private">Private Key</Label>
                  <Input id="lianlian-private" type="password" placeholder="LL_PRIVATE_KEY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lianlian-merchant">Merchant ID</Label>
                  <Input id="lianlian-merchant" placeholder="LL_MERCHANT_ID" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lianlian-sandbox">Sandbox URL</Label>
                  <Input id="lianlian-sandbox" placeholder="LL_SANDBOX_URL" />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="default">Enabled</Badge>
                  <Button variant="outline">Test Connection</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>Configure webhook endpoints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input id="webhook-url" value="https://sv9-router.silvercloud-6d5.workers.dev/payment/webhook" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="router-secret">Router Secret</Label>
                  <Input id="router-secret" type="password" placeholder="Enter router secret" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="promptpay-url">PromptPay App URL</Label>
                  <Input id="promptpay-url" placeholder="https://promptpay-app.workers.dev" />
                </div>
                <Button>Save Configuration</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhook Endpoints</CardTitle>
                <CardDescription>Active webhook endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { provider: "Omise", url: "/payment/webhook/omise", status: "active" },
                    { provider: "Stripe", url: "/payment/webhook/stripe", status: "active" },
                    { provider: "LianLian", url: "/payment/webhook/lianlian", status: "active" },
                  ].map((endpoint) => (
                    <div key={endpoint.provider} className="flex items-center justify-between border-b pb-4 last:border-0">
                      <div>
                        <div className="font-medium">{endpoint.provider}</div>
                        <div className="text-sm text-gray-600">{endpoint.url}</div>
                      </div>
                      <Badge variant="outline">{endpoint.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="line" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Line Notify</CardTitle>
                <CardDescription>Configure Line Notify for payment alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="line-token">Line Notify Token</Label>
                  <Input id="line-token" type="password" placeholder="Enter Line Notify token" />
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Not Configured</Badge>
                  <Button>Test Notification</Button>
                </div>
                <Button>Save Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>System-wide configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="router-url">Router URL</Label>
                  <Input id="router-url" value="https://sv9-router.silvercloud-6d5.workers.dev" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="environment">Environment</Label>
                  <Input id="environment" value="production" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Input id="default-currency" value="THB" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-country">Default Country</Label>
                  <Input id="default-country" value="TH" />
                </div>
                <Button>Save Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commission" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Commission Settings</CardTitle>
                <CardDescription>Configure commission rates and rules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-rate">Default Commission Rate (%)</Label>
                  <Input id="default-rate" type="number" value="1.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pro-rate">PRO Plan Rate (%)</Label>
                  <Input id="pro-rate" type="number" value="1.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enterprise-rate">ENTERPRISE Plan Rate (%)</Label>
                  <Input id="enterprise-rate" type="number" value="1.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-payout">Minimum Payout (THB)</Label>
                  <Input id="min-payout" type="number" value="1000" />
                </div>
                <Button>Save Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
