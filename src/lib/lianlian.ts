const LL_MERCHANT_ID = process.env.LL_MERCHANT_ID || '';
const LL_SANDBOX_URL = process.env.LL_SANDBOX_URL || '';
const LL_PRIVATE_KEY = process.env.LL_PRIVATE_KEY || '';
const LL_PUBLIC_KEY = process.env.LL_PUBLIC_KEY || '';

console.log('=== LianLian Environment Variables ===');
console.log('LL_MERCHANT_ID:', LL_MERCHANT_ID ? 'SET' : 'NOT SET');
console.log('LL_SANDBOX_URL:', LL_SANDBOX_URL ? 'SET' : 'NOT SET');
console.log('LL_PRIVATE_KEY:', LL_PRIVATE_KEY ? 'SET (length: ' + LL_PRIVATE_KEY.length + ')' : 'NOT SET');
console.log('LL_PUBLIC_KEY:', LL_PUBLIC_KEY ? 'SET (length: ' + LL_PUBLIC_KEY.length + ')' : 'NOT SET');
console.log('=====================================');

/**
 * Generate RSA-SHA256 signature for LianLian API using Web Crypto API
 * @param data - Data to sign (JSON string)
 * @param privateKeyPem - Private key in PEM format
 * @returns RSA-SHA256 signature in base64
 */
export async function generateSignature(data: string, privateKeyPem: string): Promise<string> {
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

/**
 * Verify webhook signature from LianLian using Web Crypto API
 * @param payload - Webhook payload
 * @param signature - Signature from webhook header
 * @param publicKeyPem - Public key in PEM format
 * @returns true if signature is valid
 */
export async function verifyWebhook(payload: Record<string, any>, signature: string, publicKeyPem: string): Promise<boolean> {
  try {
    const data = JSON.stringify(payload);
    
    // Remove PEM headers and whitespace
    const pemContents = publicKeyPem
      .replace(/-----BEGIN PUBLIC KEY-----/g, '')
      .replace(/-----END PUBLIC KEY-----/g, '')
      .replace(/\s/g, '');
    
    // Convert base64 to binary
    const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
    
    // Import key using Web Crypto API
    const cryptoKey = await crypto.subtle.importKey(
      'spki',
      binaryKey.buffer,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    // Verify the signature
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    
    const signatureBinary = Uint8Array.from(atob(signature), c => c.charCodeAt(0));
    
    const isValid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      signatureBinary,
      dataBuffer
    );
    
    return isValid;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

/**
 * Create Thai QR payment request (matching Java SDK format)
 * @param amount - Payment amount in THB
 * @param orderId - Unique order ID
 * @param agentId - Agent/merchant ID
 * @returns API request object
 */
export async function createThaiQR(amount: number, orderId: string, agentId: string) {
  console.log('=== LianLian Create Thai QR Debug ===');
  
  // Match Java SDK request structure
  const requestBody = {
    version: 'v1',
    service: 'QR_PROMPT',
    merchant_id: LL_MERCHANT_ID,
    merchant_order_id: orderId,
    order_amount: amount.toString(),
    order_currency: 'THB',
    order_desc: 'Thai QR Payment',
    notify_url: `${process.env.NEXT_PUBLIC_API_BASE}/api/webhook/lianlian`,
    redirect_url: `${process.env.NEXT_PUBLIC_API_BASE}/payment/success`,
  };
  
  console.log('1. Request body:', JSON.stringify(requestBody, null, 2));
  console.log('2. Merchant ID:', LL_MERCHANT_ID);
  console.log('3. Sandbox URL:', LL_SANDBOX_URL);
  
  // Generate signature from JSON string (RSA-SHA256)
  const dataString = JSON.stringify(requestBody);
  console.log('4. Data for signature:', dataString);
  
  const signature = await generateSignature(dataString, LL_PRIVATE_KEY);
  
  // Add signature to request
  const finalRequest = {
    ...requestBody,
    sign: signature,
  };
  
  console.log('5. Final request with signature:', JSON.stringify(finalRequest, null, 2));
  
  // Use correct endpoint based on Java SDK
  const apiUrl = `${LL_SANDBOX_URL}/api/v1/checkout`;
  console.log('6. API URL:', apiUrl);
  console.log('====================================');
  
  return {
    url: apiUrl,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: finalRequest,
  };
}

/**
 * Check payment status (matching Java SDK format)
 * @param orderId - Order ID to check
 * @returns API request object
 */
export async function checkPaymentStatus(orderId: string) {
  const requestBody = {
    version: 'v1',
    service: 'QUERY',
    merchant_id: LL_MERCHANT_ID,
    merchant_order_id: orderId,
  };
  
  const dataString = JSON.stringify(requestBody);
  const signature = await generateSignature(dataString, LL_PRIVATE_KEY);
  
  return {
    url: `${LL_SANDBOX_URL}/api/v1/query`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      ...requestBody,
      sign: signature,
    },
  };
}

/**
 * Execute LianLian API call
 * @param request - Request object with url, method, headers, body
 * @returns API response
 */
export async function callLianLianAPI(request: {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: Record<string, any>;
}) {
  try {
    console.log('=== LianLian API Call Debug ===');
    console.log('Request URL:', request.url);
    console.log('Request Method:', request.method);
    console.log('Request Headers:', JSON.stringify(request.headers, null, 2));
    console.log('Request Body:', JSON.stringify(request.body, null, 2));
    console.log('===========================');

    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: JSON.stringify(request.body),
    });

    console.log('=== LianLian API Response Debug ===');
    console.log('Response Status:', response.status);
    console.log('Response Status Text:', response.statusText);
    
    // Log all response headers
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });
    console.log('Response Headers:', JSON.stringify(responseHeaders, null, 2));

    const text = await response.text();
    console.log('Response Body (raw):', text);
    console.log('Response Body Length:', text.length);
    console.log('Response Body Empty:', text.length === 0);
    console.log('============================');

    if (!text || text.length === 0) {
      throw new Error('Empty response from LianLian API');
    }

    const data = JSON.parse(text);

    if (data.code !== '0000') {
      console.error('LianLian API Error Response:', data);
      throw new Error(`LianLian API error (${data.code}): ${data.message || 'Unknown error'}`);
    }

    return data;
  } catch (error) {
    console.error('=== LianLian API Call Failed ===');
    console.error('Error:', error);
    console.error('Error Type:', error instanceof Error ? error.constructor.name : typeof error);
    if (error instanceof Error) {
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
    }
    console.error('================================');
    throw error;
  }
}
