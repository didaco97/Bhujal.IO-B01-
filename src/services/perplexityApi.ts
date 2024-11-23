import axios from 'axios';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const validateApiKey = (apiKey?: string): boolean => {
  return typeof apiKey === 'string' && apiKey.trim().length > 0;
};

export const generateResponse = async (messages: ChatMessage[], apiKey: string): Promise<string> => {
  if (!validateApiKey(apiKey)) {
    throw new Error('Invalid or missing Perplexity API key. Please check your .env file.');
  }

  try {
    // Ensure messages alternate between user and assistant after system message
    const formattedMessages = [
      {
        role: 'system',
        content: 'You are a groundwater expert assistant. Provide accurate and helpful information about groundwater resources, management, and related topics.'
      }
    ];

    // Add only the last user message
    const lastUserMessage = [...messages].reverse().find(msg => msg.role === 'user');
    if (lastUserMessage) {
      formattedMessages.push(lastUserMessage);
    }

    const response = await axios.post(
      PERPLEXITY_API_URL,
      {
        model: 'llama-3.1-sonar-small-128k-online',
        messages: formattedMessages
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from API');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your Perplexity API key.');
      } else if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        throw new Error('Network error. Please check your internet connection.');
      }
      throw new Error(`API Error: ${error.response?.data?.error?.message || 'Unknown error occurred'}`);
    }
    throw new Error('Failed to generate response. Please try again later.');
  }
};