import { useState, useEffect } from 'react'
import MacWindows from '../MacWindows'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './notes.scss'
const Notes = ({windowName}) => {
  const [notesContent, setNotesContent] = useState('')

  useEffect(() => {
    fetch('/info.txt')
      .then(res => res.text())
      .then(text => {
        setNotesContent(text)
      })
      .catch(err => {
        console.error('Error fetching notes:', err)
      })
  }, [])

  return (
    <MacWindows windowName={windowName}>
      <div className="notes-window">
       {notesContent ? <SyntaxHighlighter language="typescript" style={atelierDuneDark}>
          {notesContent}
        </SyntaxHighlighter> : <p>Loading notes...</p>}
      </div>
    </MacWindows>
  )
}

export default Notes