import React, { useEffect, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const TextEditor = ({ onEditorChange, initialValue }) => {
  const [content, setContent] = useState(initialValue);

  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  const handleChange = (content) => {
    setContent(content);
    onEditorChange(content);
  };
  const sunEditorOptions = {
    placeholder: "Please type here...",
    buttonList: [
      ["undo", "redo"],
      ["font", "fontSize", "formatBlock"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor", "textStyle"],
      ["removeFormat"],
      ["outdent", "indent"],
      ["align", "horizontalRule", "list", "table"],
      ["link", "image", "video"],
      ["fullScreen", "showBlocks", "codeView"],
      ["preview"],
    ],
    minHeight: "200px",
  };
  return (
    <>
      <SunEditor
        setOptions={sunEditorOptions}
        setContents={content}
        onChange={handleChange}
      />
    </>
  );
};

export default TextEditor;
