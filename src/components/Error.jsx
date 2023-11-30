function Error() {
    return (
        <div>
            <h2>Фильмы не найдены!</h2>
            <p className="vpn__error">
                Вероятнее всего у вас не включен VPN, так как сервис themoviedb.org
                предостовляющий данные фильмов теперь заблокирован в России.
            </p>

            <a
                target="_blank"
                href="https://chrome.google.com/webstore/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno?hl=ru"
            >
                <button className="vpn">Free VPN</button>
            </a>
        </div>
    );
}

export default Error;
