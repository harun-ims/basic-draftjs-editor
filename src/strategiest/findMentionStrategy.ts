import { ContentBlock } from "draft-js";

const mentionRegex = /@\w+/g;

const findMentionStrategy = (
  contentBlock: ContentBlock,
  callback: (start: number, end: number) => void
) => {
  const text = contentBlock.getText();
  let matchArr;
  while ((matchArr = mentionRegex.exec(text)) !== null) {
    const start = matchArr.index;
    const end = start + matchArr[0].length;
    callback(start, end);
  }
};

export default findMentionStrategy;
