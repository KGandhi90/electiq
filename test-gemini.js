import { GoogleGenerativeAI } from '@google/generative-ai';
const apiKey = 'AIzaSyAlP5RmzLL6m2O9A2uN1QDNvIpHp1pdPeM';
const genAI = new GoogleGenerativeAI(apiKey);
async function run() {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: 'You are an expert. Keep it concise.',
      generationConfig: {
        maxOutputTokens: 800,
      }
    });
    const result = await model.generateContent('what do you mean by election?');
    console.log(result.response.text());
  } catch (err) {
    console.error('Error:', err);
  }
}
run();
