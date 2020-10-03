type Key = keyof HTMLElement | any;
type Props = HTMLElement;

export const RefCreated = Symbol('RefCreated');

export interface ElementDef<Props> {
  tagName: string;
  options: {
    props?: Props;
    children?: Array<HTMLElement | null | undefined>;
  }
}

export type FC<Props = undefined> = (props: Props) => HTMLElement;

export interface RefCallback {
  _refCallback: true;
}

type ElementDefinitionFactory<Props> = (tagName: string, options: ElementDef<any>['options']) => HTMLElement;

export const el: ElementDefinitionFactory<any> = (tagName, { props = {}, children = [] }): HTMLElement => {
  const element = document.createElement(tagName);

  for (let key in props) {
    (element as any)[key] = props[key];
  }

  if (props[RefCreated]) {
    props[RefCreated](element);
  }

  children?.forEach((child) => {
    child && element.appendChild(child);
  });

  return element;
};
