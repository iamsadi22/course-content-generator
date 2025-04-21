"use client"

const ContentTypeSelector = ({ selectedType, onTypeChange, compact = false }) => {
  const contentTypes = [
    { id: "course_outline", label: "Course Outline" },
    { id: "lesson_content", label: "Lesson Content" },
    { id: "chapter_content", label: "Chapter Content" },
  ]

  return (
    <div className={`content-type-selector ${compact ? "compact" : ""}`}>
      {!compact && <h3>Content Type</h3>}

      <div className="selector-buttons">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            className={`selector-button ${selectedType === type.id ? "active" : ""}`}
            onClick={() => onTypeChange(type.id)}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ContentTypeSelector
