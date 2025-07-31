//import { prompt } from "../lib/popups";

var option = Number(
  prompt(
    `Choose an option (type number of it):
    1. devtools (eruda)
    ...`,
    "1"
  )
);
switch (parseFloat(option)) {
  case 1:
    const script = document.createElement("script");

    // TODO: make this use either a built in copy of eruda or bypass CORS and use the CDN
    script.src = "https://cdn.jsdelivr.net/npm/eruda";
    script.onload = () => {
      eruda.init();
    };
    script.onerror = (error) => {
      alert(`Failed to load eruda. error: ${error || "Unknown error"}`);
    }
    document.head.appendChild(script);
    break;
  // Add more cases for other options as needed
  default:
    alert("Invalid option. Please try again.");
    break;
}
