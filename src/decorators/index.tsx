import { CompositeDecorator } from "draft-js";
import LinkDecorator from "../components/custom-block/LinkDecector";
import findLinkStrategy from "../strategiest/findLinkStrategy";

const decorator = new CompositeDecorator([
  {
    strategy: findLinkStrategy,
    component: LinkDecorator,
  },
]);

export default decorator;
