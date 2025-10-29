import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid request format' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';
    const prompt = `You are a supportive mental health AI for students. Listen, validate, and offer coping strategies. Never diagnose or prescribe medication. If crisis, advise professional help. User: ${lastUserMessage}`;

    // Call local Ollama instance
    const ollamaRes = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "llama2", prompt }),
      }
    );

    let aiMessage = "";

    if (ollamaRes.ok) {
      const ollamaData = await ollamaRes.json();
      aiMessage = ollamaData.response || "";
    }

    if (!aiMessage || aiMessage.length < 10) {
      aiMessage = "I'm here to listen and support you. Would you like to share more about what's on your mind?";
    }

    return new Response(
      JSON.stringify({ message: aiMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    const fallbackMessage = "Sorry, I'm having trouble connecting. Please try again soon, or reach out to a mental health professional if needed.";
    return new Response(
      JSON.stringify({ message: fallbackMessage }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});