import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setModalWindowAuthorizationShow } from '../../redux/actions';
import './MainHeader.scss';

function MainHeader() {
    const dispatch = useDispatch();

    const isAuthorized = useSelector(state => state.isAuthorized);
    const username = useSelector(state => state.username);
    console.log(isAuthorized);
    const modalWindowAuthorizationShow = useSelector(state => state.modalWindowAuthorizationShow)

    const loginButtonClick = () => {
        dispatch(setModalWindowAuthorizationShow(true));
    }

    const exitButtonClick = () => {
        Cookies.remove("token");
        window.location.reload();
    }

    return (
        <div className="main-header">
            <div className="button-block">
                {isAuthorized && (<>
                    <p className="username">{username}</p>
                    <button className="login_and_register-button" onClick={() => exitButtonClick()}
                    >Выход</button>
                </>)}
                {(!isAuthorized && <button className="login_and_register-button" onClick={() =>
                    loginButtonClick()}>Войти/Зарегистироваться</button>)}
            </div>
            <h1 className="headline">СДЕЛАЙТЕ ЗАКАЗ НАПРЯМУЮ ИЗ РЕСТОРАНА</h1>
        </div>
    );
}

export default MainHeader;
