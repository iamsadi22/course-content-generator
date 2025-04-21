"use client"

import { useState, useRef, useEffect } from "react"
import "./App.css"
import ChatHeader from "./components/ChatHeader"
import ChatMessages from "./components/ChatMessages"
import ChatInput from "./components/ChatInput"
import GenerationTypeSelector from "./components/GenerationTypeSelector"
import ContentTypeSelector from "./components/ContentTypeSelector"
import ExamplePrompts from "./components/ExamplePrompts"
import { generateContent } from "./services/api"

function App() {
  const [messages, setMessages] = useState([])
  const [generationType, setGenerationType] = useState("text")
  const [contentType, setContentType] = useState("course_outline")
  const [loading, setLoading] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const [promptText, setPromptText] = useState("")
  const messagesEndRef = useRef(null)

  // Set document title
  useEffect(() => {
    document.title = "AI Course Generator"
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (prompt) => {
    if (!prompt.trim()) return

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: prompt,
      timestamp: new Date().toISOString(),
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setLoading(true)
    setShowPrompt(false)
    setPromptText("")

    try {
      // Call API based on generation type
      const response = await generateContent(prompt, generationType, contentType)

      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      }

      setMessages((prevMessages) => [...prevMessages, aiMessage])
    } catch (error) {
      console.error("Error generating content:", error)

      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, there was an error generating the content. Please try again.",
        isError: true,
        timestamp: new Date().toISOString(),
      }

      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleClearConversation = () => {
    setMessages([])
    setShowPrompt(true)
    setPromptText("")
  }

  const handleGenerationTypeChange = (type) => {
    setGenerationType(type)
  }

  const handleContentTypeChange = (type) => {
    setContentType(type)
  }

  const handleExampleClick = (exampleText) => {
    setPromptText(exampleText)
  }

  return (
    <div className="app">
      <div className="chat-container">
        <ChatHeader onClear={handleClearConversation} showClearButton={messages.length > 0} />

        <div className="chat-body">
          {messages.length === 0 ? (
            <div className="welcome-screen">
              <h1>AI Course Generator</h1>
              <p>Choose a generation type and start creating!</p>

              <div className="generation-options">
                <GenerationTypeSelector selectedType={generationType} onTypeChange={handleGenerationTypeChange} />

                {generationType === "text" && (
                  <ContentTypeSelector selectedType={contentType} onTypeChange={handleContentTypeChange} />
                )}
              </div>

              <ExamplePrompts
                generationType={generationType}
                contentType={contentType}
                onExampleClick={handleExampleClick}
              />
            </div>
          ) : (
            <ChatMessages messages={messages} loading={loading} messagesEndRef={messagesEndRef} />
          )}
        </div>

        {showPrompt && (
          <div className="chat-input-container">
            {messages.length > 0 && (
              <div className="generation-type-bar">
                <GenerationTypeSelector
                  selectedType={generationType}
                  onTypeChange={handleGenerationTypeChange}
                  compact={true}
                />

                {generationType === "text" && (
                  <ContentTypeSelector
                    selectedType={contentType}
                    onTypeChange={handleContentTypeChange}
                    compact={true}
                  />
                )}
              </div>
            )}

            <ChatInput
              onSendMessage={handleSendMessage}
              loading={loading}
              generationType={generationType}
              promptText={promptText}
              setPromptText={setPromptText}
            />
          </div>
        )}

        {!showPrompt && messages.length > 0 && (
          <div className="new-chat-button-container">
            <button className="new-chat-button" onClick={handleClearConversation}>
              New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
