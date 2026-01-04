import { state } from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";

const searchKey = state(false);

document.addEventListener("keydown", ({ key, ctrlKey }) => {
  if (key === "Escape") {
    searchKey.value = false;
    return;
  }

  if (ctrlKey && key === "/") {
    searchKey.value = true;
  }
});

export { searchKey };
