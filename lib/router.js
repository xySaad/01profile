export function onRouteChange(cb) {
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
export const navigate = (path) => {
  window.history.pushState({}, "", path);
  const navEvent = new PopStateEvent("popstate");
  window.dispatchEvent(navEvent);
};
