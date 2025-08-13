import * as preact from "preact";
import * as preactHooks from "preact/hooks";

/**
 *
 * @param items items to make into a list (the type is just an element!)
 * @param ordered if to use ol or ul default true: ol
 * @returns a list of each item
 */
export function makeList(
  items: preact.VNode[],
  ordered: boolean = true,
): preact.JSX.Element {
  let maped = items.map((el) => {
    return <li key={el}>{el}</li>;
  });
  let output: preact.JSX.Element;
  if (ordered) {
    output = <ol>{maped}</ol>;
  } else {
    output = <ul>{maped}</ul>;
  }
  return output;
}
