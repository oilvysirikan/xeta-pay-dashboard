export async function onRequest(context: any) {
  const { request, env } = context;

  try {
    const { email, password, name, shopDomain, phone } = await request.json();

    // Check if user already exists
    const existing = await env.DB.prepare(
      "SELECT id FROM users WHERE email = ?"
    ).bind(email).first();

    if (existing) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Create user in existing users table
    const result = await env.DB.prepare(
      "INSERT INTO users (name, email, password, type, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, 1, datetime('now'), datetime('now'))"
    ).bind(name, email, password, "merchant").run();

    const userId = result.meta.last_row_id;

    // Create store if shopDomain provided
    let shop = null;
    if (shopDomain) {
      const storeResult = await env.DB.prepare(
        "INSERT INTO stores (name, slug, domain, email, phone, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 1, datetime('now'), datetime('now'))"
      ).bind(name, shopDomain.replace(/\./g, "-"), shopDomain, email, phone || "").run();
      shop = shopDomain;
    }

    const userData = {
      id: userId.toString(),
      email,
      name,
      role: "merchant",
      shop,
    };

    const token = btoa(JSON.stringify({ userId, role: "merchant" }));

    return new Response(JSON.stringify({ token, user: userData }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Registration failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
