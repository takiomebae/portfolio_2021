/**
 * スクロール処理間引き
 * @param {function} func 処理
 * @param {number} wait 間引き時間
 */
function throttle(func, wait = 300) {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
}

/**
 * アクティブクラス付与
 * @param {HTMLElement} e フェードイン対象エレメント
 */
const toggle = (e) => {
  const id = e.id ? e.id : null;
  if (!id) {
    return;
  }
  const target = document.getElementById(id);
  const rect = target.getBoundingClientRect();
  if (rect.top < 250) {
    target.classList.add("active");
  } else {
    target.classList.remove("active");
  }
  return target;
};

/**
 * スクロールイベント
 * @param {string} className アニメーションさせる要素に付与するクラス名
 */
const scroll = (className) => {
  const elements = document.getElementsByClassName(className);
  if (typeof elements === "undefined" || elements.length <= 0) {
    return;
  }
  const func = () => {
    for (const e of elements) {
      toggle(e);
    }
  };
  const throttled = throttle(func, 200);
  window.addEventListener("scroll", throttled);
};

module.exports = scroll;
