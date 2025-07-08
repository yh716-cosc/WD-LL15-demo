// Get references to the buttons and the output area
const icebreakerBtn = document.getElementById('icebreaker-btn');
const factBtn = document.getElementById('fact-btn');
const jokeBtn = document.getElementById('joke-btn');
const weatherBtn = document.getElementById('weather-btn');
const output = document.getElementById('output');

// Shared system prompt to set the tone and personality
const systemPrompt = "You are a friendly, helpful assistant for classroom conversations. Keep responses light, positive, and easy to understand.";

// Function to call OpenAI API with a specific user message
async function getOpenAIResponse(userMessage) {
  // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
  const apiKey = 'YOUR_OPENAI_API_KEY';

  // Prepare the request body for OpenAI's API
  const body = {
    model: "gpt-4.1",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ],
    max_tokens: 60,
    temperature: 0.7
  };

  try {
    // Make the API request using fetch and await the response
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    // Parse the JSON response
    const data = await response.json();

    // Return the assistant's reply
    return data.choices[0].message.content.trim();
  } catch (error) {
    // Show an error message if something goes wrong
    return "Sorry, I couldn't get a response. Please try again.";
  }
}

// Add event listeners for each button
icebreakerBtn.addEventListener('click', async () => {
  // Ask for a light conversation starter
  output.textContent = "Thinking...";
  const reply = await getOpenAIResponse("Give me a fun conversation starter for a group.");
  output.textContent = reply;
});

factBtn.addEventListener('click', async () => {
  // Ask for a surprising fact
  output.textContent = "Thinking...";
  const reply = await getOpenAIResponse("Share a weird or surprising fact.");
  output.textContent = reply;
});

jokeBtn.addEventListener('click', async () => {
  // Ask for a safe, light joke
  output.textContent = "Thinking...";
  const reply = await getOpenAIResponse("Tell me a mild, classroom-safe joke.");
  output.textContent = reply;
});

weatherBtn.addEventListener('click', async () => {
  // Ask for a weather-related conversation prompt
  output.textContent = "Thinking...";
  const reply = await getOpenAIResponse("Start a conversation about the weather that gets people to share what it's like outside where they are.");
  output.textContent = reply;
});
