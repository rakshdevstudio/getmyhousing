import React, { useEffect, useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const PreviewEditor = ({ initialValue, height, readOnly, width }) => {
  const [content, setContent] = useState(initialValue);
  const editorRef = useRef(null);

  useEffect(() => {
    if (readOnly) {
      setContent(initialValue);
    }
  }, [initialValue, readOnly]);

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
    .sun-editor{
      border:0px
    }
    .sun-editor .se-toolbar {
      display: block;
      position: relative;
      height: auto;
      width: 100%;
      overflow: visible;
      padding: 0;
      margin: 0;
      background-color: #fafafa;
       outline:none; 
      z-index: 5;
  }
    .sun-editor-editable[contenteditable=true] .se-component {
       outline:none;
  }
      .sun-editor .se-resizing-bar {
        min-height:0px; 
        border-top:0px
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const sunEditorOptions = {
    buttonList: readOnly
      ? []
      : [
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
    minHeight: height,
    minWidth: width,
    readOnly: readOnly,
  };
  return (
    <SunEditor
      ref={editorRef}
      setOptions={sunEditorOptions}
      setContents={content}
      readOnly={readOnly}
      setDefaultStyle="min-height: 0; height: auto;"
      setDefaultAttribute="overflow:hidden;"
    />
  );
};

export default PreviewEditor;
