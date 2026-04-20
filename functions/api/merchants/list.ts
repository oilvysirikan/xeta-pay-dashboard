export async function onRequest(context: any) {
  const { request, env } = context;

  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "50");

    // Query existing stores table
    const merchants = await env.DB.prepare(`
      SELECT
        id,
        name,
        domain as shop,
        'FREE' as plan,
        CASE WHEN is_active = 1 THEN 'active' ELSE 'inactive' END as status,
        0 as gmv,
        0 as transactions
      FROM stores
      ORDER BY created_at DESC
      LIMIT ?
    `).bind(limit).all();

    return new Response(JSON.stringify(merchants.results || []), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch merchants" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
