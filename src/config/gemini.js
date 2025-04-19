const apiKey = 'AIzaSyCrNz61x6RYcChRCESbaKoUT4ZaL5boths';

function runChat(prompt) {
  const data = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: prompt },
        ],
      },
    ],
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then(async response => {
      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Full Gemini API error:', errorBody);
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .then(result => {
      const output = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      console.log("Gemini response:", output);
      return output;
    })
    .catch(error => {
      console.error('Error from Gemini API:', error);
    });
}

export default runChat;