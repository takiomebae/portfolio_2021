const preventScroll = {
  x: 0,
  y: 0,
  setPos(x = window.pageXOffset, y = window.pageYOffset) {
    this.x = x;
    this.y = y;
  },
  handleEvent() {
    window.scrollTo(this.x, this.y);
  },
  enable() {
    this.setPos();
    window.addEventListener("scroll", this);
  },
  disable() {
    window.removeEventListener("scroll", this);
  },
};

module.exports = preventScroll;
