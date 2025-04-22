"use client"

const ExamplePrompts = ({ generationType, contentType, onExampleClick }) => {
  const getExamples = () => {
    if (generationType === "image") {
      return [
        "A futuristic classroom with holographic displays and AI tutors",
        "A student studying in a cozy library with magical glowing books",
        "An abstract representation of knowledge transfer from teacher to student",
      ]
    }

    switch (contentType) {
      case "course_outline":
        return [
          "Create a comprehensive course outline for 'Introduction to Artificial Intelligence' for beginners.",
          "Design a 12-week course outline for 'Web Development with React' for intermediate learners.",
          "Develop a course outline for 'Digital Marketing Fundamentals' for beginners.",
        ]
      case "lesson_content":
        return [
          "Write a lesson on 'Understanding Neural Networks' for a beginner-level AI course.",
          "Create a detailed lesson on 'React Hooks and State Management' for intermediate web developers.",
          "Develop a lesson on 'SEO Optimization Techniques' for beginners in digital marketing.",
        ]
      case "chapter_content":
        return [
          "Write a chapter on 'The History and Evolution of Artificial Intelligence' for beginners.",
          "Create a chapter on 'Component Architecture in Modern Web Development' for intermediate learners.",
          "Develop a chapter on 'Content Marketing Strategies' for beginners in marketing.",
        ]
      default:
        return []
    }
    
  }

  const examples = getExamples()

  return (
    <div className="example-prompts">
      <h3>Example Prompts</h3>
      <div className="examples-list">
        {examples.map((example, index) => (
          <div key={index} className="example-item" onClick={() => onExampleClick(example)}>
            <p>"{example}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExamplePrompts
