import React from 'react'

function TextSection({ item }) {
  return (
    <div className="col-12 mt-2 textSection  font-weight-bold" style={{ color: item?.token?.foreground ?? "#fff" }}>
      Solve “{item.token.name}” Task, {item?.task_type === "website_click" && <span>
        Stay for {item.website_click?.duration ?? item?.token?.duration}sec
      </span>} and then come back to claim your bonus.
    </div>
  )
}

export default TextSection
