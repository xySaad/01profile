import html from "https://cdn.jsdelivr.net/npm/rbind/src/index.js";
import waitForElement from "../lib/waitElement.js";
import { Input } from "./components/Input.js";
import { position, children, OujdaObject } from "./lib/states.js";
import { searchKey } from "../lib/accessibility.js";

const { div, link, a } = html;

const Search = () => {
  return div({ class: "search" }).add(
    link({
      rel: "stylesheet",
      href: URL.parse("styles.css", import.meta.url),
    }),
    Input(),
    div({
      class: "result",
      hidden: ($) => {
        const pressed = $(searchKey);
        return $(children).length === 0 || !pressed;
      },
    }).add(
      children.map((child, idx) =>
        a({
          "data-focus": ($) => $(position) == idx(),
          class: "child",
          href: "/intra" + child.path,
          textContent: child.path.substring("/oujda/".length),
        })
      )
    )
  );
};

export default async function Intra() {
  if (document.querySelector('nav[data-test="navBar"] .search')) {
    return;
  }

  const resp = await fetch("https://learn.zone01oujda.ma/api/object/oujda");
  const json = await resp.json();
  OujdaObject.children = json.children;
  waitForElement('nav[data-test="navBar"]').then((nav) => {
    const s = Search();
    nav.insertBefore(s, nav.lastChild);
    s.mount();
  });
}
