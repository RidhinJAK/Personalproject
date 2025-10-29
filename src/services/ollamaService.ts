// ollamaService.ts

import axios from 'axios';

const OLLAMA_API_URL = 'http://localhost:11434/chat';

export const chatWithOllama = async (message: string) => {
    try {
        const response = await axios.post(OLLAMA_API_URL, { message });
        return response.data;
    } catch (error) {
        console.error('Error communicating with Ollama API:', error);
        throw error;
    }
};

// Example usage:
// chatWithOllama('Hello, how are you?').then(response => console.log(response));