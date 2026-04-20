export async function onRequest(context: any) {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop") || "";
    const limit = parseInt(url.searchParams.get("limit") || "50");

    // Query existing payments table
    const transactions = await env.DB.prepare(`
      SELECT
        p.payment_id as id,
        p.order_id,
        s.domain as shop,
        'Omise' as provider,
        p.method,
        p.amount,
        p.currency,
        p.status,
        p.created_at,
        p.updated_at
      FROM payments p
      LEFT JOIN stores s ON p.store_id = s.id
      WHERE s.domain = ? OR ? = ''
      ORDER BY p.created_at DESC
      LIMIT ?
    `).bind(shop, shop, limit).all();

    return new Response(JSON.stringify(transactions.results || []), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch transactions" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
