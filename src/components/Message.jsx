import { formatTimestamp } from "../utils/helpers"
import { Card, CardContent } from "@/components/ui/card"

const Message = ({ message }) => {
  const { role, content, timestamp, isError } = message

  // Handle different content types
  const isImageContent = typeof content === "string" && content.startsWith("http") && role === "assistant"
  
  const formatCourseOutline = (raw) => {
    if (typeof raw !== 'string') return raw;
  
    const cleanText = raw.replace(/\\n/g, '\n'); // Convert \n to actual newlines
    const lines = cleanText.split('\n');
  
    let html = '';
    let inList = false;
  
    for (let line of lines) {
      const trimmed = line.trim();
  
      // Chapter line
      if (trimmed.startsWith('- Chapter')) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<h2>${trimmed.replace('- ', '')}</h2>`;
      }
      // Lesson line
      else if (trimmed.startsWith('- Lesson') || trimmed.startsWith('-')) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${trimmed.replace('- ', '')}</li>`;
      }
      // Extra info or summary
      else if (trimmed) {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        html += `<p>${trimmed}</p>`;
      }
    }
  
    if (inList) html += '</ul>';
    return `<div>${html}</div>`;
  };
  
  
  
  
  

  return (
    <div className={`message ${role} ${isError ? "error" : ""}`}>
      <div className="message-avatar">
        {role === "user" ? <div className="user-avatar">U</div> : <div className="assistant-avatar">AI</div>}
      </div>

      <div className="message-content-wrapper">
        <div className="message-header">
          <span className="message-sender">{role === "user" ? "You" : "AI Assistant"}</span>
          <span className="message-time">{formatTimestamp(timestamp)}</span>
        </div>

        <div className="message-content">
          {isImageContent ? (
            <img src={content || "/placeholder.svg"} alt="Generated" className="generated-image" />
          ) : (
            <Card className="bg-background border-none shadow-none">
              <CardContent className="prose prose-neutral dark:prose-invert pt-4">
                <div
                  className="text-content whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ __html: formatCourseOutline(content) }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Message
