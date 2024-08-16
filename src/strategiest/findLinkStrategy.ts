/* eslint-disable no-useless-escape */
import { ContentBlock } from "draft-js";

const linkRegex =
  /\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]|\b(?:www\.)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]|\b[-A-Z0-9+&@#\/%=~_|]+\.[A-Z]{2,}\b/gi;

const findLinkEntities = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) => {
  const text = contentBlock.getText();
  let matchArr;
  while ((matchArr = linkRegex.exec(text)) !== null) {
    const start = matchArr.index;
    const end = start + matchArr[0].length;
    callback(start, end);
  }
};

export default findLinkEntities;
