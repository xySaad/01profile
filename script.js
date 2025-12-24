"use strict";

function waitForElement(selector) {
  return new Promise((resolve) => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

function onRouteChange(cb) {
  let last = location.pathname;

  const check = () => {
    if (location.pathname !== last) {
      last = location.pathname;
      cb(last);
    }
  };

  const push = history.pushState;
  history.pushState = function () {
    push.apply(this, arguments);
    check();
  };

  const replace = history.replaceState;
  history.replaceState = function () {
    replace.apply(this, arguments);
    check();
  };

  window.addEventListener("popstate", check);
}

function Search() {
  const wrapper = document.createElement("div");
  const resultWrapper = document.createElement("div");
  resultWrapper.style =
    "display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;";

  const search = document.createElement("input");
  search.style = "margin: auto; display: flex;";
  search.type = "search";
  search.placeholder = "Search";

  search.oninput = (e) => {
    const value = e.target.value;
    resultWrapper.innerHTML = "";

    if (value.length < 1) return;
    let results = [];

    if (value.length < 3) {
      results = [...document.querySelectorAll(`a[href^="/profile/${value}"]`)];
    } else {
      const profiles = [...document.querySelectorAll(`a[href^="/profile/"]`)];
      results = profiles.filter((p) =>
        p.href.split("/profile/")[1].includes(value)
      );
    }

    results.forEach((r) => {
      console.log(r);

      const href = r.getAttribute("href");
      const id = href.split("/profile/")[1];
      r.id = "";
      r.href = "#" + id;

      const cloned = r.parentNode.cloneNode(true);
      resultWrapper.append(cloned);

      r.id = id;
      r.href = href;
    });
  };

  wrapper.append(search, resultWrapper);
  return wrapper;
}

function entry() {
  waitForElement(".page_map___E7cR").then((map) => {
    map.parentNode.insertBefore(Search(), map);
  });
}

if (location.pathname === "/map") {
  entry();
}

onRouteChange((path) => {
  if (path === "/map") {
    entry();
  }
});
