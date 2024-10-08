import React from "react";
import { ContentState, DraftDecoratorComponentProps } from "draft-js";

// Define the type for the props
interface LinkDecectorProps extends DraftDecoratorComponentProps {
  contentState: ContentState;
  entityKey: string;
  decoratedText: string;
}

const LinkDecector: React.FC<LinkDecectorProps> = (props) => {
  let url = props.decoratedText;
  // Add "http://" if the URL does not have a protocol
  if (!/^https?:\/\//i.test(url)) {
    url = "http://" + url;
  }
  return (
    <a
      href={url}
      style={{ color: "blue", textDecoration: "underline" }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  );
};

export default LinkDecector;
