const preventScroll = require("./preventScroll");

const loading = () => {
  const load = document.getElementById("loading");
  const content = document.getElementById("container");
  window.scrollTo(0, 0);
  preventScroll.enable();
  window.addEventListener("load", function () {
    this.setTimeout(() => {
      content.classList.add("active");
      load.classList.add("done");
      preventScroll.disable();
    }, 500);
    this.setTimeout(() => {
      preventScroll.disable();
    }, 1500);
  });
};

module.exports = loading;
