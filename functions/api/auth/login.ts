export async function onRequest(context: any) {
  const { request, env } = context;

  try {
    const { email, password } = await request.json();

    // Query existing users table
    const user = await env.DB.prepare(
      "SELECT id, name, email, type, is_active FROM users WHERE email = ? AND is_active = 1"
    ).bind(email).first();

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // TODO: Verify password hash when password hashing is implemented
    // For now, accept any password for demo

    const token = btoa(JSON.stringify({ userId: user.id, role: user.type }));

    const userData = {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.type === "admin" ? "admin" : "merchant",
    };

    return new Response(JSON.stringify({ token, user: userData }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Login failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
