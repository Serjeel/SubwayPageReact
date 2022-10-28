import React from 'react';

import './ModalWindowAuthorization.scss';

function ModalWindowAuthorization() {
    // const [username, setUsername] = useState("peter");

    return (
        <div className="modal-block">
            <div class="modal-authorization-window">
                <div class="modal-authorization-content">
                    <div class="modal-header-block">
                        <h3 class="modal-authorization-header">Subway</h3>
                        <img class="close-icon" src="i/close-icon.svg" />
                    </div>
                    <div class="modal-tabs-authorization-block">
                        <div class="modal-authorization-tabs ">
                            ${modalTabs}
                        </div>
                    </div>
                    <div class="input-block">
                        <input class="authorization-input" id="username" type="text" placeholder=
                            "Имя пользователя" value={selectedAuthorizationTab === "login"
                                ? this.inputsContent.logUsername : this.inputsContent.regUsername} />
                        <input class="authorization-input" type="password" id="password" placeholder=
                            "Пароль" value={selectedAuthorizationTab === "login"
                                ? this.inputsContent.logPassword : this.inputsContent.regPassword} />
                        ${selectedAuthorizationTab === "registration" ? repeatPasswordInput : ""}
                    </div>
                    <button class="authorization-button">${selectedAuthorizationTab ===
                        "login" ? "Войти" : "Зарегистрироваться"}</button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindowAuthorization;
