"use client";

import Layout from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ReportsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-gray-600">Generate and export payment reports</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
            <CardDescription>Select report type and date range</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-gray-600 mb-1">Report Type</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transactions">Transaction Report</SelectItem>
                    <SelectItem value="commission">Commission Report</SelectItem>
                    <SelectItem value="disbursement">Disbursement Report</SelectItem>
                    <SelectItem value="settlement">Settlement Report</SelectItem>
                    <SelectItem value="webhook">Webhook Log Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Date Range</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last7days">Last 7 Days</SelectItem>
                    <SelectItem value="last30days">Last 30 Days</SelectItem>
                    <SelectItem value="thisMonth">This Month</SelectItem>
                    <SelectItem value="lastMonth">Last Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm text-gray-600 mb-1">Format</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">Provider</div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All providers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Providers</SelectItem>
                    <SelectItem value="omise">Omise</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="lianlian">LianLian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>Automated report schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Daily Transaction Report", frequency: "Daily", lastRun: "2026-04-19", status: "active" },
                { name: "Weekly Commission Report", frequency: "Weekly", lastRun: "2026-04-18", status: "active" },
                { name: "Monthly Settlement Report", frequency: "Monthly", lastRun: "2026-04-01", status: "active" },
              ].map((report) => (
                <div key={report.name} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">{report.name}</span>
                      <Badge variant="outline">{report.frequency}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Last run: {report.lastRun}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Recently generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Transaction Report - Last 30 Days", date: "2026-04-19", size: "2.5 MB", format: "CSV" },
                { name: "Commission Report - April 2026", date: "2026-04-18", size: "1.2 MB", format: "XLSX" },
                { name: "Settlement Report - March 2026", date: "2026-04-01", size: "3.8 MB", format: "PDF" },
              ].map((report) => (
                <div key={report.name} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-gray-600">
                      {report.date} • {report.size} • {report.format}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
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
