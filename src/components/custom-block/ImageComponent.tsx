import React from "react";
import { ContentBlock, ContentState } from "draft-js";

interface ImageComponentProps {
  block: ContentBlock;
  contentState: ContentState;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  block,
  contentState,
}) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  return (
    <div className="image-block">
      <img src={src} alt="Image" />
    </div>
  );
};

export default ImageComponent;
