class Val {
  /**
   * @constructor
   * @param {string} フォームにつけたID名
   * @param {string} 入力必須inputにつけたclass名
   */
  constructor(id, required) {
    this.id = id;
    this.required = required;
  }

  /**
   * メールアドレスの形式チェック
   * @param {string} フォームに入力された値
   * @return {boolean}
   */
  mailCheck(mail) {
    var mail_regex1 = new RegExp(
      "(?:[-!#-'*+/-9=?A-Z^-~]+.?(?:.[-!#-'*+/-9=?A-Z^-~]+)*|\"(?:[!#-[]-~]|\\\\[\x09 -~])*\")@[-!#-'*+/-9=?A-Z^-~]+(?:.[-!#-'*+/-9=?A-Z^-~]+)*"
    );
    var mail_regex2 = new RegExp("^[^@]+@[^@]+$");
    if (mail.match(mail_regex1) && mail.match(mail_regex2)) {
      // 全角チェック
      if (
        mail.match(
          /[^a-zA-Z0-9\!\"\#\$\%\&\'\(\)\=\~\|\-\^\\\@\[\;\:\]\,\.\/\\\<\>\?\_\`\{\+\*\} ]/
        )
      ) {
        return false;
      }
      // 末尾TLDチェック（〜.co,jpなどの末尾ミスチェック用）
      if (!mail.match(/\.[a-z]+$/)) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  /**
   * 電話番号の形式チェック
   * @param {string} フォームに入力された値
   * @return {boolean}
   */
  phoneCheck(phone) {
    var tel = phone.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi, "");
    if (!tel.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * エラーメッセージ表示用のspanを生成する
   * @return {HTMLElement}
   */
  createSpan() {
    const span = document.createElement("span");
    span.classList.add("error-message");
    return span;
  }

  /**
   * エラーメッセージの文言を変更する
   * @param {HTMLElement} 対象のinput
   * @param {string} エラーメッセージ
   */
  addMessage(element, message) {
    element.nextElementSibling.innerHTML = message;
  }

  /**
   * メールアドレスの形式チェック
   * @param {string} フォームに入力された値
   * @return {boolean}
   */
  createErrorArea(children) {
    for (const i of children) {
      if (i.classList.contains(this.required)) {
        const newItem = this.createSpan();
        i.parentNode.insertBefore(newItem, i.nextElementSibling);
      }
    }
  }

  /**
   * 入力内容チェック処理
   * @param {HTMLElement} i 入力チェック対象のinput
   * @param {function} func
   * @param {string} message
   * @return {boolean}
   */
  check(i, func, message) {
    if (func && message) {
      if (i.value === "") {
        i.classList.add("error");
        this.addMessage(i, "入力してください");
        return false;
      } else {
        if (func(i.value) === false) {
          i.classList.add("error");
          this.addMessage(i, message);
          return false;
        } else {
          i.classList.remove("error");
          this.addMessage(i, "");
          return true;
        }
      }
    } else {
      if (i.value === "") {
        i.classList.add("error");
        this.addMessage(i, "入力してください");
        return false;
      } else {
        i.classList.remove("error");
        this.addMessage(i, "");
        return true;
      }
    }
  }

  /**
   * バリデーション分岐
   */
  val() {
    const form = document.getElementById(this.id);
    const children = document.getElementsByClassName(this.required);
    this.createErrorArea(children);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let error = 0;
      for (const i of children) {
        // メール //
        if (i.classList.contains("mail")) {
          if (
            !this.check(
              i,
              this.mailCheck,
              "メールアドレスを正しく入力してください"
            )
          ) {
            error += 1;
          }
          // 電話番号 //
        } else if (i.classList.contains("phone")) {
          if (
            !this.check(
              i,
              this.phoneCheck,
              "電話番号を正しく入力してください(半角数字 / ハイフン可)"
            )
          ) {
            error += 1;
          }
          // 入力チェック //
        } else {
          if (!this.check(i)) {
            error += 1;
          }
        }
      }
      if (error === 0) {
        form.submit();
      }
    });
  }
}

module.exports = Val;
