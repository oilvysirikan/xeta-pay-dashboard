import { NextRequest, NextResponse } from 'next/server';
import { LLPayClient, LLPayRequest } from '@/lib/lianlian-sdk';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  let payRequest: LLPayRequest | null = null;
  
  try {
    const body = await request.json();
    const { amount, orderId, order_id } = body;

    const LL_MERCHANT_ID = process.env.LL_MERCHANT_ID || '';
    const LL_PRIVATE_KEY = process.env.LL_PRIVATE_KEY || '';
    const LL_PUBLIC_KEY = process.env.LL_PUBLIC_KEY || '';

    if (!LL_MERCHANT_ID || !LL_PRIVATE_KEY || !LL_PUBLIC_KEY) {
      return NextResponse.json({ error: 'Missing env vars' }, { status: 500 });
    }

    const finalOrderId = orderId || order_id;
    if (!amount || !finalOrderId) {
      return NextResponse.json({ error: 'Missing required fields: amount, orderId' }, { status: 400 });
    }

    const client = new LLPayClient({
      productionEnv: false,
      merchantPrivateKey: LL_PRIVATE_KEY,
      lianLianPublicKey: LL_PUBLIC_KEY
    });

    payRequest = {
      httpMethod: () => 'POST',
      version: 'v1',
      service: 'llpth.checkout.apply',
      merchant_id: LL_MERCHANT_ID,
      merchant_order_id: finalOrderId,
      order_amount: String(parseFloat(amount).toFixed(2)),
      order_currency: 'THB',
      order_desc: 'Thai QR Payment',
      payment_method: 'WAP_PAYMENT',
      notify_url: 'https://payment-dashboard.pages.dev/api/webhook/lianlian',
      redirect_url: 'https://payment-dashboard.pages.dev/payment/success',
      customer: {
        merchant_user_id: finalOrderId + '-user',
        full_name: 'Test User'
      }
    };

    console.error("📤 PAY REQUEST:", JSON.stringify(payRequest, null, 2));
    const response = await client.execute(payRequest);
    
    console.log("📥 Response from SDK:", JSON.stringify(response, null, 2));
    console.log("📥 Response keys:", Object.keys(response));
    console.log("📥 Has debug_sign_content:", 'debug_sign_content' in response);
    
    // Clone response and add debug info
    const clonedResponse = JSON.parse(JSON.stringify(response));
    (clonedResponse as any).debug_request = payRequest;
    (clonedResponse as any).debug_merchant_id = process.env.LL_MERCHANT_ID;
    
    return NextResponse.json(clonedResponse);
  } catch (error) {
    console.error('❌ Error:', error);
    return NextResponse.json({ 
      error: 'Failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      merchant_id: process.env.LL_MERCHANT_ID,
      timestamp: new Date().toISOString(),
      debug_request: payRequest
    }, { status: 500 });
  }
}

