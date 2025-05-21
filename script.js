// Get references to the HTML elements
const responseContainer = document.getElementById('response');
const iceBtn = document.getElementById('iceBtn');
const factBtn = document.getElementById('factBtn');
const jokeBtn = document.getElementById('jokeBtn');
const weatherBtn = document.getElementById('weatherBtn');
const contextSelect = document.getElementById('contextSelect'); // Get the dropdown

// This function returns a system prompt with the selected context inserted
function getSystemPrompt(context) {
  // Map context values to readable names and extra instructions
  const contextMap = {
    classroom: {
      name: "a classroom",
      extra: "Keep your responses short, light-hearted, and easy for students to respond to."
    },
    standup: {
      name: "a remote team standup",
      extra: "Keep your responses short, light-hearted, and suitable for work."
    },
    gamenight: {
      name: "a virtual game night",
      extra: "Keep your responses playful, fun, and group-friendly."
    },
    interview: {
      name: "a job interview setting",
      extra: "Keep your responses professional, friendly, and appropriate for interviews."
    }
  };

  const selected = contextMap[context] || contextMap.classroom;

  // Single template for the system prompt
  return `You are a witty and welcoming assistant designed to break awkward silences in ${selected.name}. ${selected.extra} No preamble, just return the content.`;
}

// This function sends a prompt to the OpenAI API and displays the response
async function getIcebreakerResponse(prompt) {
  // Show a fun loading message
  responseContainer.textContent = "Breaking the silence... 🧊";

  // Get the selected context from the dropdown
  const context = contextSelect.value;
  const systemPrompt = getSystemPrompt(context);

  // Prepare the messages for the API
  const messages = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: prompt
    }
  ];

  try {
    // Send a POST request to the OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // apiKey should be defined in secrets.js
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages
      })
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Parse the response
    const result = await response.json();

    // Show the AI's response
    responseContainer.textContent = result.choices[0].message.content;
  } catch (error) {
    // Show a simple error message
    responseContainer.textContent = "Oops! Something went wrong. Please try again.";
  }
}

// Add event listeners to each button
iceBtn.addEventListener('click', () => {
  getIcebreakerResponse('Give me a fun meeting icebreaker question or topic.');
});

factBtn.addEventListener('click', () => {
  getIcebreakerResponse('Tell me a weird or surprising fact.');
});

jokeBtn.addEventListener('click', () => {
  getIcebreakerResponse('Tell me a mild, friendly joke I can share with classmates.');
});

weatherBtn.addEventListener('click', () => {
  getIcebreakerResponse('Write a conversation starter that opens with a weather-related question and invites people to check outside and share.');
});