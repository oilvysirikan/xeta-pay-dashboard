export async function onRequest(context: { request: Request; env: { LL_PUBLIC_KEY?: string; DB: any } }) {
  const { request, env } = context;

  try {
    const payload = await request.json();
    const signature = request.headers.get('X-LL-Signature') || '';
    const publicKey = env.LL_PUBLIC_KEY || process.env.LL_PUBLIC_KEY || '';

    // Verify webhook signature
    if (!(await verifyWebhook(payload, signature, publicKey))) {
      return new Response(
        JSON.stringify({ code: '9999', message: 'Invalid signature' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { order_id, payment_status, amount, agent_id } = payload;

    // Handle payment status
    if (payment_status === 'SUCCESS') {
      // Update transaction status in database
      await env.DB.prepare(`
        UPDATE payments
        SET status = 'verified', verified = 1, updated_at = datetime('now')
        WHERE payment_id = ?
      `).bind(order_id).run();

      // Trigger commission calculation
      await calculateCommission(order_id, amount, agent_id, env);
    } else if (payment_status === 'FAILED') {
      // Update transaction as failed
      await env.DB.prepare(`
        UPDATE payments
        SET status = 'failed', updated_at = datetime('now')
        WHERE payment_id = ?
      `).bind(order_id).run();
    }
    // PENDING status - no action needed

    // Return success response to LianLian
    return new Response(
      JSON.stringify({ code: '0000', message: 'success' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ code: '9999', message: 'Internal error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

async function verifyWebhook(payload: Record<string, string>, signature: string, publicKey: string): Promise<boolean> {
  // Sort keys alphabetically
  const sortedKeys = Object.keys(payload).sort();
  
  // Build signature string
  const signatureString = sortedKeys
    .map(key => `${key}=${payload[key]}`)
    .join('&') + publicKey;
  
  // Generate MD5 hash and convert to uppercase
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  const hashBuffer = await crypto.subtle.digest('MD5', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const expectedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  
  return expectedSignature === signature.toUpperCase();
}

async function calculateCommission(orderId: string, amount: number, agentId: string, env: { DB: any }) {
  // Get agent hierarchy (up to 4 levels)
  const agent = await env.DB.prepare(`
    SELECT id FROM users WHERE id = ?
  `).bind(agentId).first();

  if (!agent) return;

  // Commission rates: 4 levels
  const rates = [0.05, 0.03, 0.02, 0.01]; // 5%, 3%, 2%, 1%
  
  // Calculate and distribute commissions
  for (let i = 0; i < rates.length; i++) {
    const commission = amount * rates[i];
    
    await env.DB.prepare(`
      INSERT INTO commissions (merchant_id, transaction_id, amount, rate, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'pending', datetime('now'), datetime('now'))
    `).bind(agentId, orderId, commission, rates[i]).run();
  }
}
