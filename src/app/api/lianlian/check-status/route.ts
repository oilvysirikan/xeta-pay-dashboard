import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

async function generateSignature(data: string, privateKeyPem: string): Promise<string> {
  try {
    const pemContents = privateKeyPem
      .replace(/-----BEGIN PRIVATE KEY-----/g, '')
      .replace(/-----END PRIVATE KEY-----/g, '')
      .replace(/-----BEGIN RSA PRIVATE KEY-----/g, '')
      .replace(/-----END RSA PRIVATE KEY-----/g, '')
      .replace(/\s+/g, '');

    const binaryKey = Uint8Array.from(
      atob(pemContents),
      c => c.charCodeAt(0)
    );

    const cryptoKey = await crypto.subtle.importKey(
      'pkcs8',
      binaryKey.buffer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const encoder = new TextEncoder();
    const signature = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      encoder.encode(data)
    );

    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  } catch (error) {
    console.error('Signature error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    const LL_MERCHANT_ID = process.env.LL_MERCHANT_ID || '';
    const LL_SANDBOX_URL = process.env.LL_SANDBOX_URL || '';
    const LL_PRIVATE_KEY = process.env.LL_PRIVATE_KEY || '';

    console.log('=== LianLian Check Payment Status Debug ===');
    console.log('LL_MERCHANT_ID:', LL_MERCHANT_ID ? 'SET' : 'NOT SET');
    console.log('LL_SANDBOX_URL:', LL_SANDBOX_URL ? 'SET' : 'NOT SET');
    console.log('LL_PRIVATE_KEY:', LL_PRIVATE_KEY ? 'SET (length: ' + LL_PRIVATE_KEY.length + ')' : 'NOT SET');

    if (!LL_MERCHANT_ID || !LL_SANDBOX_URL || !LL_PRIVATE_KEY) {
      return NextResponse.json(
        { error: 'Missing required environment variables' },
        { status: 500 }
      );
    }

    const requestBody = {
      version: 'v1',
      service: 'QUERY',
      merchant_id: LL_MERCHANT_ID,
      merchant_order_id: orderId,
    };

    console.log('1. Request body:', JSON.stringify(requestBody, null, 2));

    // Sort keys and create query string format for signature (alphabetical order)
    const sortedKeys = Object.keys(requestBody).sort() as (keyof typeof requestBody)[];
    const dataString = sortedKeys.map(key => `${key}=${requestBody[key]}`).join('&');
    console.log('2. Data for signature:', dataString);

    const signature = await generateSignature(dataString, LL_PRIVATE_KEY);

    const finalRequest = {
      ...requestBody,
      sign_type: 'RSA',
      sign: signature,
    };

    console.log('3. Final request body:', JSON.stringify(finalRequest, null, 2));

    const apiUrl = 'https://sandbox-th.lianlianpay-inc.com/api/v1/query';
    console.log('4. API URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(finalRequest),
      cache: 'no-store'
    });

    console.log('6. Response status:', response.status);

    const responseText = await response.text();
    console.log('7. Response body (raw):', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse JSON response:', e);
      return NextResponse.json(
        { error: 'Invalid JSON response from LianLian API', rawResponse: responseText },
        { status: 500 }
      );
    }

    console.log('8. Parsed response:', JSON.stringify(responseData, null, 2));

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}
