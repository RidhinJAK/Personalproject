interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const responses = {
  greetings: [
    "Hello! It's good to hear from you. What's on your mind today?",
    "Hi there! I'm here to listen and support you. How are you feeling?",
    "Hey! Thanks for reaching out. What would you like to talk about?"
  ],
  stress: [
    "I hear that you're feeling stressed. That's completely valid - stress can be overwhelming. Would you like to try a quick breathing exercise together, or would you prefer to talk about what's specifically worrying you?",
    "Stress is tough, and I'm glad you're reaching out. Remember, it's okay to take breaks and prioritize self-care. What's been the biggest source of stress for you lately?",
    "It sounds like you're dealing with a lot right now. Stress is your body's way of responding to demands. Let's break it down - what's the most pressing thing on your mind?"
  ],
  anxiety: [
    "Thank you for sharing that you're feeling anxious. Anxiety can feel really intense, but remember that you're not alone in this. Can you tell me more about what's triggering these feelings?",
    "I understand anxiety can be overwhelming. Sometimes naming what we're experiencing helps us understand it better. Have you noticed any patterns in when you feel most anxious?",
    "Anxiety is difficult, and I appreciate you opening up about it. Would it help to try some grounding techniques? One simple method is the 5-4-3-2-1 technique."
  ],
  sadness: [
    "I'm really glad you felt comfortable sharing that with me. Feeling sad or down is a natural part of being human, though I know that doesn't make it easier. Is there something specific that's been weighing on you?",
    "Thank you for trusting me with these feelings. It's okay to not be okay sometimes. Have you been able to talk to anyone else about how you're feeling?",
    "I hear you, and your feelings are completely valid. Sadness can feel heavy. Remember to be gentle with yourself during this time."
  ],
  loneliness: [
    "Feeling lonely or having challenges with relationships can be really difficult. You deserve meaningful connections. Would you like to explore what's happening, or would strategies for building new connections be more helpful?",
    "I understand that feeling alone can be painful. Remember, reaching out like you're doing now is a brave step. Have you considered joining any clubs or activities that interest you?",
    "Loneliness is a common experience, especially for students. You're not alone in feeling this way. Building connections takes time, but it's possible."
  ],
  breathing: [
    "Great idea! Let's do a simple breathing exercise together. Try this: Breathe in slowly for 4 counts, hold for 4 counts, breathe out for 4 counts, and hold again for 4 counts. This is called box breathing.",
    "Breathing exercises are wonderful for calming your nervous system. Would you like to try the 4-7-8 technique? Breathe in for 4, hold for 7, and exhale for 8.",
    "That's a great self-care choice! Deep breathing can really help. Focus on making your exhale longer than your inhale - this activates your relaxation response."
  ],
  help: [
    "I'm here to support you. You can talk to me about anything - stress, anxiety, relationships, school, or just how you're feeling today. I can also guide you through breathing exercises or suggest coping strategies. What would be most helpful right now?",
    "I'm glad you're here. Remember, seeking support is a sign of strength. I can listen, provide coping strategies, or help you think through challenges. What's on your mind?",
    "You've come to the right place. I'm here to listen without judgment and help however I can. Would you like to talk about something specific, or just share what you're experiencing?"
  ],
  gratitude: [
    "You're very welcome! I'm here whenever you need support. Remember, taking care of your mental health is a sign of strength, not weakness.",
    "I'm happy I could help. You're doing great by prioritizing your mental wellness. Is there anything else you'd like to talk about?",
    "You're welcome! It's brave of you to reach out. Remember, I'm always here if you need to talk."
  ],
  crisis: [
    "I'm concerned about what you're sharing. Please know that you don't have to face this alone. I strongly encourage you to reach out to a crisis hotline: Call 988 for the Suicide & Crisis Lifeline, or text HOME to 741741 for Crisis Text Line. They're available 24/7.",
    "What you're going through sounds really serious. Please reach out for immediate help: Call 988 or text HOME to 741741. These are trained professionals who can help you right now.",
    "I'm worried about you. Please contact a crisis line immediately: 988 is available 24/7. Your life matters, and there are people who want to help you through this."
  ],
  general: [
    "I appreciate you sharing that with me. It takes courage to open up about what you're experiencing. Could you tell me a bit more about what you're going through?",
    "Thank you for trusting me with your thoughts. I'm here to listen. What's been on your mind lately?",
    "I hear you. It sounds like you're dealing with something important. Would you like to talk more about it?",
    "That sounds challenging. Remember, it's okay to take things one step at a time. How are you coping with everything?",
    "I understand. Your feelings are valid, and I'm here to support you. What would be most helpful for you right now?"
  ]
};

function detectIntent(message: string): string {
  const lower = message.toLowerCase();

  if (/(kill|suicide|die|death|end it|hurt myself|self-harm|not worth living)/i.test(lower)) {
    return 'crisis';
  }
  if (/(hi|hello|hey|greetings)/i.test(lower)) {
    return 'greetings';
  }
  if (/(stress|exam|test|overwhelm|pressure|deadline)/i.test(lower)) {
    return 'stress';
  }
  if (/(anxious|anxiety|worried|panic|nervous)/i.test(lower)) {
    return 'anxiety';
  }
  if (/(sad|depressed|down|hopeless|empty)/i.test(lower)) {
    return 'sadness';
  }
  if (/(lonely|alone|isolated|no friends)/i.test(lower)) {
    return 'loneliness';
  }
  if (/(breath|breathing|calm|relax)/i.test(lower)) {
    return 'breathing';
  }
  if (/(help|support|need)/i.test(lower)) {
    return 'help';
  }
  if (/(thank|thanks|grateful)/i.test(lower)) {
    return 'gratitude';
  }

  return 'general';
}

export function getLocalAIResponse(messages: Message[]): string {
  if (messages.length === 0) {
    return "Hello! I'm here to support you. How are you feeling today?";
  }

  const lastMessage = messages[messages.length - 1];
  if (lastMessage.role !== 'user') {
    return "I'm listening. Please share what's on your mind.";
  }

  const intent = detectIntent(lastMessage.content);
  const responseList = responses[intent as keyof typeof responses] || responses.general;

  const randomIndex = Math.floor(Math.random() * responseList.length);
  return responseList[randomIndex];
}
