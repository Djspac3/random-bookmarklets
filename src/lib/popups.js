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
  var popup = open(
    "about:blank",
    "",
    "prompt=true,width=" +
      width +
      ",height=" +
      height +
      ",resizable=yes,scrollbars=yes",
  );
  if (!popup) {
    alert("Popup blocked! Please allow popups for this site.");
    throw new Error("library: promptHtml: Popup blocked/failed to open");
  }

  return popup;
}

/**
 * @param {string} message The message to display in the prompt.
 * @param {number?} defaultValue The default value to pre-fill in the prompt.
 * @returns {number} The number entered by the user, will be NaN if invalid
 * (Nan is falsy so u can do || to it)
 * @description Displays a prompt dialog to the user and returns the input as a number.
 * If the user cancels, it returns NaN.
 */
export function promptNumber(message, defaultValue) {
  return parseFloat(prompt(message.trim(), defaultValue || 0));
}
