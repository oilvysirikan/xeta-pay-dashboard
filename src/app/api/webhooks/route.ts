import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get("x-webhook-signature");
    const provider = request.headers.get("x-provider");

    // TODO: Verify webhook signature
    // const isValid = verifyWebhookSignature(signature, body, provider);
    // if (!isValid) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    // Handle different webhook events
    const eventType = body.type || body.event_type;

    switch (eventType) {
      case "payment.succeeded":
        await handlePaymentSucceeded(body);
        break;
      case "payment.failed":
        await handlePaymentFailed(body);
        break;
      case "payment.pending":
        await handlePaymentPending(body);
        break;
      case "refund.processed":
        await handleRefundProcessed(body);
        break;
      default:
        console.log("Unhandled event type:", eventType);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

async function handlePaymentSucceeded(data: any) {
  console.log("Payment succeeded:", data);
  // TODO: Update database, send notifications, etc.
}

async function handlePaymentFailed(data: any) {
  console.log("Payment failed:", data);
  // TODO: Update database, send notifications, etc.
}

async function handlePaymentPending(data: any) {
  console.log("Payment pending:", data);
  // TODO: Update database, send notifications, etc.
}

async function handleRefundProcessed(data: any) {
  console.log("Refund processed:", data);
  // TODO: Update database, send notifications, etc.
}

// TODO: Implement signature verification
function verifyWebhookSignature(signature: string | null, body: any, provider: string | null): boolean {
  // Verify webhook signature based on provider
  // For Stripe: verify using Stripe webhook secret
  // For Omise: verify using Omise webhook secret
  // For LianLian: verify using LianLian webhook secret
  return true;
}
