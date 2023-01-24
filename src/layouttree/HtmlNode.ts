type HTMLNode = {
  type: string;
  name?: string;
  start?: number;
  end?: number;
  children?: HTMLNode[];
};

export default HTMLNode;
