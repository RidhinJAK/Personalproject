export async function callOllama(prompt: string): Promise<string> {
  try {
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "phi3:latest",
        prompt,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Ollama error: ${response.status} ${text}`);
    }

    const reader = response.body?.getReader();
    let fullText = "";

    if (reader) {
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value);
      }
    }

    return fullText || "I'm here to listen — tell me what's on your mind.";
  } catch (err: any) {
    console.error("Ollama request failed:", err);
    if (err && typeof err.toString === 'function' && err.toString().toLowerCase().includes("memory")) {
      throw new Error("Model failed to load due to insufficient memory. Try a smaller model (e.g., llama3:8b) or run Ollama without GPU.");
    }
    return "I'm here to listen — tell me what's on your mind.";
  }
}
export async function callOllama(prompt: string) {
  const response = await try {
fetch("http://127.0.0.1:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "phi3:latest",
      prompt,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Ollama error: ${response.status} ${text}`);
  }

  // Ollama streams responses line by line, so handle it properly
  const reader = response.body?.getReader();
  let fullText = "";

  if (reader) {
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullText += decoder.decode(value);
    }
  }

  return fullText;
}


// Added error handling for Ollama memory errors
catch (err) {
  console.error("Ollama request failed:", err);
  if (err && err.toString && err.toString().toLowerCase().includes("memory")) {
    throw new Error("Model failed to load due to insufficient memory. Try a smaller model (e.g., llama3:8b) or run Ollama without GPU.");
  }
  throw err;
}
