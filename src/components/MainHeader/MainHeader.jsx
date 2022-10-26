import React, { useState } from 'react';
import './MainHeader.scss';

function MainHeader() {
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [username, setUsername] = useState("peter");

    return (
        <div className="main-header">
            <div className="button-block">
                {!isAuthorized && (<>
                    <p className="username">{username}</p>
                    <button className="login_and_register-button">Выход</button>
                </>)}
                {(isAuthorized && <button className="login_and_register-button">
                    Войти/Зарегистироваться</button>)}
            </div>
            <h1 className="headline">СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
        </div>
    );
}

export default MainHeader;
