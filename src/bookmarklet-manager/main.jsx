import logo from "./assets/logo.svg"; // imported as inline SVG
import styleSheet from "./assets/style.css"; // imported as inline CSS

import { bookmarklets } from "./classes.ts"; // data helper

// react
// import { Fragment } from "react";
import { createRoot } from "react-dom/client";

var pageIcon = document.createElement("link");
pageIcon.rel = "icon";
pageIcon.type = "image/png";
pageIcon.href = logo;
document.head.appendChild(pageIcon);
var styleElement = document.createElement("style");
styleElement.textContent = styleSheet;
document.head.appendChild(styleElement);
var purecss = document.createElement("link");
purecss.rel = "stylesheet";
purecss.href = "https://cdn.jsdelivr.net/npm/purecss@3.0.0/build/pure-min.css";
purecss.integrity =
  "sha384-X38yfunGUhNzHpBaEBsWLO+A0HDYOQi8ufWDkZ0k9e0eXz/tH3II7uKZ9msv++Ls";
purecss.crossOrigin = "anonymous";
document.head.appendChild(purecss);
var viewportMeta = document.createElement("meta");
viewportMeta.name = "viewport";
viewportMeta.content = "width=device-width, initial-scale=1";
document.head.appendChild(viewportMeta);

function menu() {
  function listItem(boop) {
    return (
      <li key={"bookmarklet " + boop.id}>
        <button>run {boop.name}</button>
      </li>
    );
  }
  return (
    <ol id="list">
      {bookmarklets.map((boop) => {
        listItem(boop);
      })}
    </ol>
  );
}

function main() {}
var reactDiv = document.createElement("div");
reactDiv.id = "app";
document.body.appendChild(reactDiv);
const REACTROOT = createRoot(reactDiv);
REACTROOT.render(<menu />);

/*export function main() {
  let pageNumber = 0;
  const pageSize = parseInt(localStorage.getItem("pageSize")) || 10; // Default to 10 if not set
  const totalItems = 50; // Example: 50 items total
  const listDiv = document.createElement("div");
  listDiv.id = "list";
  document.body.append(listDiv);

  // Controls
  const controls = document.createElement("div");
  controls.className = "controls";
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  controls.append(prevBtn, nextBtn);
  listDiv.appendChild(controls);

  // List container
  const listContainer = document.createElement("ol");
  listDiv.appendChild(listContainer);
  listDiv.className = "pure-u-1 pure-u-md-1 pure-u-lg-1"; // PureCSS classes for responsive layout

  function renderPage() {
    listContainer.innerHTML = "";
    const start = pageNumber * pageSize;
    const end = Math.min(start + pageSize, totalItems);
    for (let i = start; i < end; i++) {
      const listItem = document.createElement("li");
      listItem.className = "pure-g-1-2 pure-g-md-1-3 pure-g-lg-1-4"; // PureCSS classes for responsive layout
      // Create a link
      const openBookmark = document.createElement("button");
      openBookmark.onclick = () => {
        const bookmarkletBeingOpened = new bookmarklet(i);
        const script = document.createElement("script");
        script.textContent = bookmarkletBeingOpened.script;
        const window = window.open(
          `https://google.com/bookmarlet.${bookmarkletBeingOpened.page}`,
          "_blank"
        );
      };
      openBookmark.textContent =
        localStorage.getItem(`bookmarklet${i}.name`) ||
        `Item ${i + 1} has no name`; // Use stored name or default
      // Create a button
      const editBookmarklet = document.createElement("button");
      editBookmarklet.textContent = "Action";
      editBookmarklet.onclick = () => {
        const newContents = prompt(
          "Enter new contents for this bookmarklet: (without javascript: prefix)",
          localStorage.getItem(`bookmarklet${i}.contents`)
            ? localStorage
                .getItem(`bookmarklet${i}.contents`)
                .replace("javascript:", "")
            : "alert('Hello, World!');"
        );
        const newName = prompt(
          "Enter new name for this bookmarklet:",
          localStorage.getItem(`bookmarklet${i}.name`) || `Bookmarklet ${i + 1}`
        );
        localStorage.setItem(
          `bookmarklet${i}.contents`,
          "javascript:" + newContents ||
            'javascript:alert("no bookmark is stored here")'
        );
        localStorage.setItem(`bookmarklet${i}.name`, newName);
        renderPage(); // Re-render the page to reflect changes
      };
      listItem.appendChild(openBookmark);
      listItem.appendChild(editBookmarklet);
      listContainer.appendChild(listItem);
    }
    prevBtn.disabled = pageNumber === 0;
    nextBtn.disabled = end >= totalItems;
  }

  prevBtn.onclick = function () {
    if (pageNumber > 0) {
      pageNumber--;
      renderPage();
    }
  };
  nextBtn.onclick = function () {
    if ((pageNumber + 1) * pageSize < totalItems) {
      pageNumber++;
      renderPage();
    }
  };

  renderPage();
}*/
