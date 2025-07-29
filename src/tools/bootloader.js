import { prompt } from "../lib/popups";
var option = Number(
  prompt(
    `Choose an option (type number of it):
    1. devtools (eruda)
    ...`,
    "1", // default value
    true, //retry
    "number" // type
  )
);
switch (option) {
  case 1:
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/eruda";
    script.onload = () => {
      eruda.init();
    };
    document.head.appendChild(script);
    break;
  // Add more cases for other options as needed
  default:
    alert("Invalid option. Please try again.");
    break;
}
