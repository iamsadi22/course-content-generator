const API_ENDPOINT = "https://api.getwpfunnels.com/generate"
const API_KEY = "my-secret-key-1"

export const generateContent = async (prompt, type, contentType) => {
  let requestBody

  if (type === "text") {
    requestBody = {
      type: "text",
      prompt: prompt,
      contentType: contentType,
    }
  } else {
    requestBody = {
      type: "image",
      prompt: prompt,
    }
  }

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // For image generation, return the image URL
    if (type === "image" && data.imageUrl) {
      return data.imageUrl
    }

    // For text generation, return the generated text
    if (type === "text" && data.text) {
      return data.text
    }

    return data.result || "No content generated"
  } catch (error) {
    console.error("Error calling API:", error)
    throw error
  }
}
