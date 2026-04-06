export const RETRIEVE_URL = "http://localhost:8000/retrieve";

export const askBackend = async (question) => {
  const response = await fetch(RETRIEVE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (!data.answer) {
    throw new Error("Unexpected API response structure.");
  }
  return data.answer;
};
