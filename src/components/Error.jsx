import React from "react";

function Error() {
  return (
    <>
      <h2>Произошла ошибка!</h2>
      <p className="vpn__error">
        Вероятнее всего у вас не включен VPN, так как сервис themoviedb.org, который предоставляет нам информацию, не корректно работает в
        России.<br></br> На данный момент мы готовим крупное обновление, в котором мы также полностью откажемся от иностранных сервисов,а
        пока, рекомендуем установить: &nbsp;<br></br>
        <a
          target="_blank"
          href="https://chrome.google.com/webstore/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno?hl=ru"
        >
          <button className="vpn">Free VPN</button>
        </a>
      </p>
    </>
  );
}

export default Error;
