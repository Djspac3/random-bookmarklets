// move the popup function to use for overwriting
const _prompt = window.prompt;

/**
 *
 * @param {string} message
 * @param {*} defaultInput
 * @param {boolean?} retry to retry if either the value is none or doesnt match return type
 * @param {string?} returnType - "string", "number", "boolean", or "any" (default is "string")
 * @returns {string|number|boolean} the input value converted to the specified return type
 */
export function prompt(message, defaultInput, retry, returnType) {
  if (!returnType || returnType === "any") returnType = "string"; // default to "any" aka the string type as thats default
  if (typeof retry != Boolean) retry = false;
  if (!defaultInput) defaultInput = "string";
  if (defaultInput === "any") defaultInput = "string";

  if (retry) {
    // repeat until valid input
    let input = _prompt(message, defaultInput);
    while (retry) {
      input = _prompt(message, defaultInput);
      switch (returnType) {
        case "string":
          if (input) retry = false;
        case "number":
          if (parseFloat(input) || parseFloat(input) === 0) {
            input = parseFloat(input);
            retry = false;
          }
        case "boolean":
          if (
            input.toLowerCase() === "true" ||
            input.toLowerCase() === "false"
          ) {
            input = input === "true";
            retry = false;
          }
        default:
          throw new Error(
            `Invalid return type: ${returnType}. Expected "string", "number", "boolean", or "any".`
          );
      }
    }
  } else {
    // non repeat
    var input = _prompt(message, defaultInput);
    switch (returnType) {
      case "string":
        if (input) retry = false;
      case "number":
        if (parseFloat(input) || parseFloat(input) === 0) {
          input = parseFloat(input);
          retry = false;
        }
      case "boolean":
        if (input.toLowerCase() === "true" || input.toLowerCase() === "false") {
          input = input === "true";
          retry = false;
        }
      default:
        throw new Error(
          `Invalid return type: ${returnType}. Expected "string", "number", "boolean", or "any".`
        );
    }
  }
}
/**
 * @description Opens a popup window with the specified HTML content.
 * If the popup is blocked/failed, it alerts the user and throws an error.
 * @param {number?} width positive integer for popup width
 * @param {number?} height positive integer for popup height
 * @returns {WindowProxy?} popup window
 */
export function promptHtml(width, height) {
  width = width || 600;
  height = height || 400;
  html = html || "<html><body>NO HTML USED</body></html>";
  var popup = open(
    "about:blank",
    "",
    "prompt=true,width=" +
      width +
      ",height=" +
      height +
      ",resizable=yes,scrollbars=yes"
  );
  if (popup) {
    callback = callback || function () {};
    callback(popup);
  } else {
    alert("Popup blocked! Please allow popups for this site.");
    throw new Error("library: promptHtml: Popup blocked/failed to open");
  }
  return popup;
}
