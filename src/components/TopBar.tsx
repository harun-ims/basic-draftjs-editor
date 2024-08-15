import React, { useRef } from "react";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";
import {
  FaBold,
  FaUnderline,
  FaItalic,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaImage,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import { LuHeading1, LuHeading2, LuHeading3, LuHeading4 } from "react-icons/lu";

interface TopBarProps {
  setEditorState: (state: EditorState) => void;
  editorState: EditorState;
}

const topBarItems = [
  { icon: FaBold, size: 14, style: "BOLD", type: "inline" },
  { icon: FaUnderline, size: 14, style: "UNDERLINE", type: "inline" },
  { icon: FaItalic, size: 14, style: "ITALIC", type: "inline" },
  { icon: LuHeading1, size: 18, style: "header-one", type: "block" },
  { icon: LuHeading2, size: 18, style: "header-two", type: "block" },
  { icon: LuHeading3, size: 18, style: "header-three", type: "block" },
  { icon: LuHeading4, size: 18, style: "header-four", type: "block" },
  { icon: FaListUl, size: 14, style: "unordered-list-item", type: "block" },
  { icon: FaListOl, size: 14, style: "ordered-list-item", type: "block" },
  { icon: FaQuoteLeft, size: 14, style: "blockquote", type: "block" },
];

const alignItems = [
  { icon: FaAlignLeft, size: 14, style: "left", type: "block" },
  { icon: FaAlignCenter, size: 14, style: "center", type: "block" },
  { icon: FaAlignRight, size: 14, style: "right", type: "block" },
];

const TopBar: React.FC<TopBarProps> = ({ setEditorState, editorState }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        "IMAGE",
        "IMMUTABLE",
        { src: url }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = AtomicBlockUtils.insertAtomicBlock(
        editorState,
        entityKey,
        " "
      );
      setEditorState(newEditorState);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="self-center bg-blue-200/80 max-w-min px-5 py-1 flex items-center gap-6 rounded-md">
      {topBarItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Icon
            key={index}
            size={item.size}
            className="hover:cursor-pointer hover:text-blue-500"
            onClick={() => {
              if (item.type === "inline") {
                setEditorState(
                  RichUtils.toggleInlineStyle(editorState, item.style)
                );
              } else if (item.type === "block") {
                setEditorState(
                  RichUtils.toggleBlockType(editorState, item.style)
                );
              }
            }}
          />
        );
      })}

      {alignItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Icon
            key={index}
            size={item.size}
            className="hover:cursor-pointer hover:text-blue-500"
            onClick={() => {
              setEditorState(
                RichUtils.toggleBlockType(editorState, item.style)
              );
            }}
          />
        );
      })}

      <FaImage
        size={14}
        className="hover:cursor-pointer hover:text-blue-500"
        onClick={() => fileInputRef.current?.click()}
      />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={addImage}
      />
    </div>
  );
};

export default TopBar;
