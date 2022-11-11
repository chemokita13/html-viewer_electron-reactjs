import { useState } from 'react'
import Editor, { loader } from "@monaco-editor/react"; // monaco editor
import * as monaco from "monaco-editor";


import './App.css' // styles

function App() {

  loader.config({ monaco });

  const [EditorValue, setEditorValue] = useState('')// default value

  const setHTMLpart = () => { return { __html: EditorValue } }

  return (
    <section className="content">
      <div className="editor-part">
        <Editor
          height='100%'
          theme="vs-dark"
          language="html"
          value={EditorValue}
          onChange={(newValue) => { setEditorValue(newValue) }}
          className='editor' />
      </div>
      <div className="renderer" dangerouslySetInnerHTML={setHTMLpart()}></div>
    </section>
  )
}

export default App
