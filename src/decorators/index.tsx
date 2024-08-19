import { CompositeDecorator } from "draft-js";
import LinkDecorator from "../components/custom-block/LinkDecector";
import findLinkStrategy from "../strategiest/findLinkStrategy";
import findMentionsStrategy from "../strategiest/findMentionStrategy";
import Mention from "../components/custom-block/Mention";

const decorator = new CompositeDecorator([
  {
    strategy: findLinkStrategy,
    component: LinkDecorator,
  },
  {
    strategy: findMentionsStrategy,
    component: Mention,
  },
]);

export default decorator;
