import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { imageBase64 } = JSON.parse(event.body || '{}');

    if (!imageBase64) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Image is required' }) };
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });

    const prompt = `
Analyze this room image in detail and return structured JSON:

{
"room_type": "",
"lighting": "",
"current_colors": [],
"furniture_style": "",
"design_style_detected": "",
"issues": [],
"suggested_palettes": [
{
"name": "",
"colors": ["#HEX", "#HEX", "#HEX"],
"description": ""
}
],
"recommendations": []
}

Instructions:
* Be highly accurate and visually aware
* Suggest modern, aesthetic, and realistic color schemes
* Consider lighting and room size
* Keep suggestions practical for real homes
* ONLY return valid JSON without markdown wrapping like \`\`\`json
`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64.split(',')[1],
          mimeType: 'image/jpeg'
        }
      }
    ]);

    const responseText = result.response.text();
    // Try parsing the json safely
    let jsonMatch = responseText;
    if (responseText.includes('\`\`\`')) {
      // Extract from markdown block if gemini hallucinated
      jsonMatch = responseText.replace(/```(?:json)?/g, '').trim();
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: jsonMatch,
    };

  } catch (error: any) {
    console.error('Error analyzing image:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to analyze image' })
    };
  }
};
