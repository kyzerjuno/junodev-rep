import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 1000;

type ChatMessage = { role: "user" | "assistant"; content: string };

function validateMessages(input: unknown): { ok: true; messages: ChatMessage[] } | { ok: false; error: string } {
  if (!Array.isArray(input)) {
    return { ok: false, error: "messages must be an array" };
  }
  if (input.length === 0) {
    return { ok: false, error: "messages cannot be empty" };
  }
  if (input.length > MAX_MESSAGES) {
    return { ok: false, error: `messages cannot exceed ${MAX_MESSAGES} items` };
  }

  const cleaned: ChatMessage[] = [];
  for (const m of input) {
    if (!m || typeof m !== "object") {
      return { ok: false, error: "each message must be an object" };
    }
    const role = (m as Record<string, unknown>).role;
    const content = (m as Record<string, unknown>).content;
    if (role !== "user" && role !== "assistant") {
      return { ok: false, error: "role must be 'user' or 'assistant'" };
    }
    if (typeof content !== "string") {
      return { ok: false, error: "content must be a string" };
    }
    if (content.length === 0) {
      return { ok: false, error: "content cannot be empty" };
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      return { ok: false, error: `content cannot exceed ${MAX_CONTENT_LENGTH} characters` };
    }
    cleaned.push({ role, content });
  }
  return { ok: true, messages: cleaned };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rawMessages = (body as { messages?: unknown })?.messages;
    const validation = validateMessages(rawMessages);
    if (!validation.ok) {
      return new Response(JSON.stringify({ error: validation.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Your name is Echo. You are JunoDev's assistant — a helpful chatbot on a web development agency's website. You help visitors learn about what we offer:

- Website Design — clean, responsive websites
- Smart Websites — sites that adapt and improve over time
- SEO Optimization — helping businesses rank higher on search engines
- Automation & Integrations — connecting tools and streamlining workflows

Our process: Plan → Design → Build → Launch

Talk like a normal, friendly person. Be helpful and straightforward — no hype, no buzzwords, no over-the-top enthusiasm. Keep answers short (1-2 paragraphs max). If someone wants to start a project, point them to the contact form. Never mention AI, artificial intelligence, or that you are an AI. Never say we use AI to build websites.`,
          },
          ...validation.messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: "An unexpected error occurred. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
