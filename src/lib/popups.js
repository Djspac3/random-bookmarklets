/**
 * @param {number?} width positive integer for popup width
 * @param {number?} height positive integer for popup height
 * @returns {WindowProxy} popup window
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
