interface OllamaMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OllamaChatRequest {
  model: string;
  messages: OllamaMessage[];
  stream: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    num_ctx?: number;
    num_predict?: number;
  };
}

interface OllamaChatResponse {
  message: {
    role: string;
    content: string;
  };
  done: boolean;
}

const OLLAMA_API_URL = 'http://localhost:11434';

export const chatWithOllama = async (
  messages: OllamaMessage[],
  model: string = 'llama3.2:1b'
): Promise<string> => {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        options: {
          temperature: 0.3,
          top_p: 0.8,
          num_ctx: 4096,
          num_predict: 256,
        },
      } as OllamaChatRequest),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data: OllamaChatResponse = await response.json();
    return data.message?.content || '';
  } catch (error) {
    console.error('Error communicating with Ollama API:', error);
    throw error;
  }
};

export const checkOllamaStatus = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/tags`);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const listOllamaModels = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${OLLAMA_API_URL}/api/tags`);
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    const data = await response.json();
    return data.models?.map((model: any) => model.name) || [];
  } catch (error) {
    console.error('Error fetching Ollama models:', error);
    return [];
  }
};