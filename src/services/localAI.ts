export async function getLocalAIResponse(messages: { role: string; content: string }[]) {
  try {
    const response = await fetch("http://127.0.0.1:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "phi3:latest", // you can change this to any model you have (e.g. llama3, mistral)
        prompt: messages.map(m => `${m.role}: ${m.content}`).join("\n") + "\nassistant:",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // Ollama streams responses line-by-line (JSON per line)
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let fullText = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.trim().split("\n");
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.response) fullText += data.response;
          } catch {
            continue;
          }
        }
      }
    }

    return fullText.trim() || "I'm here to listen — tell
