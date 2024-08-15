import { CompositeDecorator } from "draft-js";
import LinkDecorator from "../components/custom-block/LinkDecorator";
import findLinkEntities from "../utils/linkStrategy";

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: LinkDecorator,
  },
]);

export default decorator;
