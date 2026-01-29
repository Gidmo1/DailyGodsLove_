const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const onRequestPost: PagesFunction = async ({ request, env }) => {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const email = String(body?.email || "").trim().toLowerCase();

  if (!email || !emailRegex.test(email)) {
    return new Response(JSON.stringify({ message: "Enter a valid email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Cloudflare KV binding name: SUBSCRIBERS
  const key = `sub:${email}`;
  const existing = await env.SUBSCRIBERS.get(key);

  if (existing) {
    return new Response(JSON.stringify({ message: "Already subscribed" }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  await env.SUBSCRIBERS.put(
    key,
    JSON.stringify({ email, subscribedAt: new Date().toISOString() })
  );

  return new Response(JSON.stringify({ message: "Thank you for subscribing" }), {
    headers: { "Content-Type": "application/json" },
  });
};
