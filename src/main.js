import logo from "./logo.svg";
import styleSheet from "./style.css";

export function addElements() {
  var pageIcon = document.createElement("link");
  pageIcon.rel = "icon";
  pageIcon.type = "image/png";
  pageIcon.href = logo;
  document.head.appendChild(pageIcon);
  var logoElement = document.createElement("img");
  logoElement.src = logo;
  logoElement.id = "logo";
  logoElement.style.width = "100px";
  document.body.appendChild(logoElement);

  var styleElement = document.createElement("style");
  styleElement.textContent = styleSheet;
  document.head.appendChild(styleElement);
}

export function main() {
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

  function renderPage() {
    listContainer.innerHTML = "";
    const start = pageNumber * pageSize;
    const end = Math.min(start + pageSize, totalItems);
    for (let i = start; i < end; i++) {
      const li = document.createElement("li");
      li.textContent = `Item ${i + 1}`;
      listContainer.appendChild(li);
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
}
