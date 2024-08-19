import React, { useState, useEffect, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  ContentBlock,
  Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import TopBar from "./components/TopBar";
import ImageComponent from "./components/custom-block/ImageComponent";
import decorator from "./decorators";

interface User {
  id: number;
  name: string;
  avatar: string;
  url: string;
}

const users: User[] = [
  {
    id: 1,
    name: "User 1",
    avatar: "https://avatar.iran.liara.run/public/8",
    url: "/profile/user1",
  },
  {
    id: 2,
    name: "User 2",
    avatar: "https://avatar.iran.liara.run/public/12",
    url: "/profile/user2",
  },
  {
    id: 3,
    name: "Harun Or Rashid",
    avatar: "https://avatar.iran.liara.run/public/22",
    url: "/profile/user3",
  },
];

const App: React.FC = () => {
  const editorRef = useRef<Editor | null>(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorator)
  );

  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionText, setMentionText] = useState("");

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (mentionText.startsWith("@")) {
      const fetchedSuggestions = users.filter((user: User) =>
        user.name.toLowerCase().includes(mentionText.slice(1).toLowerCase())
      );
      setSuggestions(fetchedSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [mentionText]);

  const handleBeforeInput = (
    chars: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const block = currentContent.getBlockForKey(selection.getStartKey());
    const textBeforeCursor = block
      .getText()
      .slice(0, selection.getStartOffset());
    const mentionMatch = textBeforeCursor.match(/@\S*$/);

    if (mentionMatch) {
      setMentionText(mentionMatch[0]);
    } else {
      setMentionText("");
    }
    return "not-handled";
  };

  const insertMention = (mention: User): void => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const newContentState = Modifier.replaceText(
      contentState,
      selection.merge({
        anchorOffset: selection.getAnchorOffset() - mentionText.length,
        focusOffset: selection.getAnchorOffset(),
      }),
      mention.name,
      undefined,
      undefined
    );

    setEditorState(
      EditorState.push(editorState, newContentState, "insert-characters")
    );
    setShowSuggestions(false);
    setMentionText("");
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  const myBlockStyleFn = (contentBlock: ContentBlock): string => {
    const type = contentBlock.getType();

    switch (type) {
      case "blockquote":
        return "superFancyBlockquote";
      case "left":
        return "left-align";
      case "center":
        return "center-align";
      case "right":
        return "right-align";
      default:
        return "";
    }
  };

  const blockRendererFn = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === "atomic") {
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
          ref={editorRef}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder="Write something!"
          blockRendererFn={blockRendererFn}
          blockStyleFn={myBlockStyleFn}
          handleBeforeInput={(chars) => handleBeforeInput(chars, editorState)}
        />
        {showSuggestions && (
          <ul
            style={{
              position: "absolute",
              backgroundColor: "white",
              border: "1px solid #ccc",
              listStyle: "none",
              padding: "5px",
              marginTop: "5px",
            }}
          >
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => insertMention(suggestion)}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={suggestion.avatar}
                  alt={suggestion.name}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
