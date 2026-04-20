export async function onRequest(context: any) {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop") || "";

    // Query existing payments table for stats
    const stats = await env.DB.prepare(`
      SELECT
        COALESCE(SUM(amount), 0) as total_gmv,
        COUNT(*) as total_transactions,
        SUM(CASE WHEN status = 'verified' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) as success_rate,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count
      FROM payments
      WHERE store_id IN (SELECT id FROM stores WHERE domain = ? OR ? = '')
    `).bind(shop, shop).first();

    const result = {
      totalGMV: stats.total_gmv || 0,
      totalTransactions: stats.total_transactions || 0,
      successRate: stats.success_rate || 0,
      pendingCount: stats.pending_count || 0,
    };

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch stats" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
