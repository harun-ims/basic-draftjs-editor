import React from "react";
import { ContentState, DraftDecoratorComponentProps } from "draft-js";

// Define the type for the props
interface MentionProps extends DraftDecoratorComponentProps {
  contentState: ContentState;
  entityKey: string;
  decoratedText: string;
}

const Mention: React.FC<MentionProps> = (props) => {
  return (
    <span style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}>
      {props.children}
    </span>
  );
};

export default Mention;
