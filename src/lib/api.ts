const ROUTER_URL = process.env.NEXT_PUBLIC_ROUTER_URL || "https://sv9-router.silvercloud-6d5.workers.dev";
const ROUTER_SECRET = process.env.NEXT_PUBLIC_ROUTER_SECRET || "demo_secret";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "/api";

export interface PaymentIntent {
  shop: string;
  orderId: string;
  amount: number;
  currency: string;
  method: string;
  country?: string;
  isB2B?: boolean;
  customer?: Record<string, string>;
  returnUrl?: string;
  forceProvider?: string;
}

export interface PaymentResult {
  success: boolean;
  transaction?: {
    id: string;
    status: string;
    redirectUrl?: string;
  };
  routing?: {
    provider: string;
    reason: string;
    rule: string;
  };
  fee?: {
    amount: number;
    currency: string;
  };
  error?: string;
}

export async function createPayment(intent: PaymentIntent): Promise<PaymentResult> {
  try {
    const response = await fetch(`${ROUTER_URL}/payment/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": ROUTER_SECRET,
      },
      body: JSON.stringify(intent),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Payment creation error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getPaymentStatus(id: string, provider?: string): Promise<PaymentResult> {
  try {
    const url = new URL(`${ROUTER_URL}/payment/status/${id}`);
    if (provider) {
      url.searchParams.set("provider", provider);
    }

    const response = await fetch(url.toString(), {
      headers: {
        "X-API-Key": ROUTER_SECRET,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Payment status error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Authentication APIs
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  companyName?: string;
  shopDomain?: string;
  phone?: string;
}

export async function login(credentials: LoginCredentials): Promise<{ token: string; user: any }> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Login failed");
  }

  return response.json();
}

export async function register(data: RegisterData): Promise<{ token: string; user: any }> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Registration failed");
  }

  return response.json();
}
