import html from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import { position, children, query } from "../lib/states.js";
import { searchKey } from "../../lib/accessibility.js";
const { input } = html;

export const Input = () => {
  const elm = input({
    placeholder: "Search... (Ctrl + /)",
    is: { value: query },
    onkeydown,
  });
  searchKey.register((pressed) => {
    if (pressed) {
      elm.focus();
    } else {
      elm.blur();
    }
  });
  return elm;
};

const onkeydown = ({ key }) => {
  if (key === "ArrowDown") {
    position.value += 1;
  }
  if (key === "ArrowUp") {
    position.value -= 1;
  }

  if (key === "Enter") {
    location.href = "/intra" + children.value[position.value].path;
  }

  if (position.value < 0) {
    position.value = children.value.length - 1;
  }
  if (position.value > children.value.length - 1) {
    position.value = 0;
  }
};
