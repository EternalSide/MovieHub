import React from "react";

function Error() {
  return (
    <>
      <h2>Произошла ошибка!</h2>
      <p className="vpn__error">
        Вероятнее всего у вас не включен VPN, так как сервис themoviedb.org,
        который предоставляет нам информацию, не работает в России, рекомендуем
        установить: &nbsp;
        <a
          target="_blank"
          href="https://chrome.google.com/webstore/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno?hl=ru"
        >
          Free Vpn
        </a>
      </p>
    </>
  );
}

export default Error;
