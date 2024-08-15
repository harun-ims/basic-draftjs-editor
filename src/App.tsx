import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  ContentBlock,
} from "draft-js";
import "draft-js/dist/Draft.css";
import TopBar from "./components/TopBar";
import ImageComponent from "./components/custom-block/ImageComponent";
import decorator from "./decorators";

const App: React.FC = () => {
  const editor = React.useRef<Editor | null>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );

  // Default focus on the editor
  useEffect(() => {
    if (!editor.current) return;

    editor.current.focus();
  }, []);

  // Handle keyboard shortcuts
  function handleKeyCommand(
    command: string,
    editorState: EditorState
  ): DraftHandleValue {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  }

  // Block Style function
  function myBlockStyleFn(contentBlock: ContentBlock) {
    const type = contentBlock.getType();

    if (type === "blockquote") {
      return "superFancyBlockquote";
    } else if (type === "left") {
      return "left-align";
    } else if (type === "center") {
      return "center-align";
    } else if (type === "right") {
      return "right-align";
    }

    return "";
  }

  const blockRendererFn = (contentBlock: ContentBlock) => {
    const type = contentBlock.getType();
    if (type === "atomic") {
      return {
        component: ImageComponent,
        editable: false,
      };
    }
    return null;
  };

  return (
    <div className="max-w-7xl w-full flex flex-col mx-auto mt-5 pt-2 border rounded-md">
      <TopBar editorState={editorState} setEditorState={setEditorState} />

      <div className="min-h-60 p-4">
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder="Write something!"
          blockRendererFn={blockRendererFn}
          blockStyleFn={myBlockStyleFn}
        />
      </div>
    </div>
  );
};

export default App;
