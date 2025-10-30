import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OLLAMA_API_URL = Deno.env.get('OLLAMA_API_URL') || 'http://host.docker.internal:11434';

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
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
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const systemMessage = {
      role: 'system',
      content: `You are a compassionate mental health support AI assistant for MindEase, an app designed to help students with stress, anxiety, and mental health challenges. Your role is to:

1. Listen empathetically and validate their feelings
2. Provide supportive, non-judgmental responses
3. Offer practical coping strategies and techniques
4. Encourage healthy habits and self-care
5. Recognize when professional help may be needed and gently suggest it
6. Keep responses concise, warm, and conversational (2-4 sentences)
7. Never diagnose or prescribe medication
8. Focus on immediate support and emotional wellness

Remember: You're a supportive friend, not a replacement for professional mental health care. If someone expresses thoughts of self-harm or suicide, always encourage them to seek immediate professional help.`
    };

    const ollamaMessages = [systemMessage, ...messages];

    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2',
        messages: ollamaMessages,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Ollama API error:', error);
      
      const fallbackResponses = [
        "I hear you, and I want you to know that what you're feeling is valid. It's okay to not be okay sometimes. Have you tried taking a few deep breaths?",
        "Thank you for sharing that with me. It takes courage to talk about what you're going through. Remember, you're not alone in this.",
        "I understand this is difficult for you. It's important to be kind to yourself right now. Have you considered talking to a counselor or trusted friend?",
        "What you're experiencing sounds really challenging. Remember to take things one day at a time. Focus on the present moment.",
      ];
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      return new Response(
        JSON.stringify({ message: randomResponse }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const data = await response.json();
    const aiMessage = data.message?.content || data.response || '';

    if (!aiMessage || aiMessage.length < 10) {
      const fallbackResponses = [
        "I'm here to listen and support you. What you're feeling matters. Would you like to tell me more about what's on your mind?",
        "Thank you for reaching out. It's brave of you to share your feelings. Remember, taking care of your mental health is important.",
        "I appreciate you trusting me with your thoughts. While I'm here to help, please remember that talking to a counselor can provide additional support.",
      ];
      
      return new Response(
        JSON.stringify({ message: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)] }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    return new Response(
      JSON.stringify({ message: aiMessage }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    
    const fallbackMessage = "I apologize, but I'm having trouble connecting right now. Please try again in a moment. If you're experiencing a crisis, please reach out to a mental health professional or crisis hotline immediately. You can call 988 for the Suicide & Crisis Lifeline.";
    
    return new Response(
      JSON.stringify({ message: fallbackMessage }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});