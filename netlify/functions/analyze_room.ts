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

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `
Analyze this room image in detail and return valid JSON adhering strictly to this structure:

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

Ensure the output is 100% valid JSON. Do not include markdown codeblocks.`;

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
    // Safety check just in case Gemini ignored mimeType
    let jsonMatch = responseText;
    if (responseText.includes('```')) {
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
