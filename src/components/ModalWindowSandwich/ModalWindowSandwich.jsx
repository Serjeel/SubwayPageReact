import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Ingredient from '../Ingredient/Ingredient';
import { getAuthentification, getRegistration } from '../../api';
import CloseIcon from '../../i/close-icon.svg';
import PlusIcon from '../../i/plus.svg';
import MinusIcon from '../../i/minus.svg';
import ResultImage from '../../i/result_sandwich.jpg'
import { setCountersValue, setModalContent, setModalWindowAddShow, setModalWindowAuthorizationShow, setModalWindowEditShow, setPreviousValues, setSelectedAuthorizationTab, setSelectedModalTab } from '../../redux/actions';

import './ModalWindowSandwich.scss';

function ModalWindowSandwich() {
    const dispatch = useDispatch();
    const ingredients = useSelector(state => state.ingredients);
    const selectedModalTab = useSelector(state => state.selectedModalTab);
    const modalContent = useSelector(state => state.modalContent);
    const tabReadyContent = useSelector(state => state.tabReadyContent);
    const modalWindowAddShow = useSelector(state => state.modalWindowAddShow);
    const modalWindowEditShow = useSelector(state => state.modalWindowEditShow);
    const countersValue = useSelector(state => state.countersValue);

    const tabs = {
        sizes: "Размер",
        breads: "Хлеб",
        vegetables: "Овощи",
        sauces: "Соусы",
        fillings: "Начинка",
        ready: "Готово!"
    };

    const closeIconClick = () => {
        dispatch(setPreviousValues({
            sizes: 0,
            breads: 0
        }))
        if (modalWindowAddShow) {
            dispatch(setModalWindowAddShow(false));
        } else {
            dispatch(setModalWindowEditShow(false));
        }
    }

    const handleTabClick = (tab) => {
        dispatch(setSelectedModalTab(tab));
    }

    const handlePlusClick = () => {
        let content = Object.assign({}, modalContent);
        content.amount += 1;
        dispatch(setModalContent(content));
    }

    const handleMinusClick = () => {
        if (modalContent.amount > 1) {
            let content = Object.assign({}, modalContent);
            content.amount -= 1;
            dispatch(setModalContent(content));
        }
    }

    const handleInputChange = (target) => {
        let content = Object.assign({}, modalContent);
        if (modalContent.amount >= 1) {
            content.amount = parseInt(target.value);
            dispatch(setModalContent(content))
        } else {
            content.amount = 1;
            dispatch(setModalContent(content))
            target.value = 1;
        }
    }

    return (
        <div className="modal-block">
            <div className="modal-sandwich-window">
                <div className="modal-sandwich-content">
                    <div className="modal-header-block">
                        <h3 className="modal-header">Проверьте и добавьте в корзину</h3>
                        <img className="close-icon" src={CloseIcon} onClick={() => closeIconClick()} />
                    </div>
                    <div className="modal-tabs-block">
                        <div className="modal-tabs">

                            {Object.keys(tabs).map((i) => (
                                <p className={selectedModalTab === i ? "tab-active" : "tab"}
                                    id={i} key={i} onClick={() => handleTabClick(i)}>{tabs[i]}</p>
                            ))}

                        </div>
                    </div>
                    <div className="arrows-block">
                    </div>
                    <div className="tab-content-block">
                        {selectedModalTab === "ready" ?
                            <>
                                <div className="image-block">
                                    <img className="result-image" src={ResultImage} />
                                </div>
                                <div className="final-order-block">
                                    <p className="final-order-ready">Ваш сендвич готов!</p>
                                    <div className="final-order-size">
                                        <p className="final-order-size-text">Размер:</p>
                                        <p className="final-order-size-value">{tabReadyContent.size}</p>
                                    </div>
                                    <div className="final-order-bread">
                                        <p className="final-order-bread-text">Хлеб:</p>
                                        <p className="final-order-bread-value">{tabReadyContent.bread}</p>
                                    </div>
                                    <div className="final-order-vegetables">
                                        <p className="final-order-vegetables-text">Овощи:</p>
                                        <p className="final-order-vegetables-value">{tabReadyContent.vegetables.length === 0
                                            ? "Нет" : tabReadyContent.vegetables}</p>
                                    </div>
                                    <div className="final-order-sauces">
                                        <p className="final-order-sauces-text">Соусы:</p>
                                        <p className="final-order-sauces-value">{tabReadyContent.sauces.length === 0
                                            ? "Нет" : tabReadyContent.sauces}</p>
                                    </div>
                                    <div className="final-order-filling">
                                        <p className="final-order-filling-text">Начинка:</p>
                                        <p className="final-order-filling-value">{tabReadyContent.fillings.length === 0
                                            ? "Нет" : tabReadyContent.fillings}</p>
                                    </div>
                                    <p className="final-order-title" id="item-name-modal">{modalContent.title}</p>
                                </div>
                            </>
                            :
                            Object.keys(ingredients[selectedModalTab]).map((item, i) => (
                                <Ingredient item={ingredients[selectedModalTab][item]} i={i} objectKey={item} key={`ingredient-${i}`} />
                            ))}
                    </div>
                    <div className="modal-footer">
                        <div className="item-price-block">
                            <p className="price-text">Цена:</p>
                            <p className="price-value" id="price-modal">{selectedModalTab === "ready" ?
                                modalContent.price * modalContent.amount : modalContent.price}</p>
                            <p className="price-currency">руб.</p>
                        </div>
                        <div className="modal-order-block">
                            {selectedModalTab === "ready" &&
                                <>
                                    <p className="item-amount">Количество</p>
                                    <div className="amount-block">
                                        <button className='counter-button'>
                                            <img className="counter-icon" src={MinusIcon} id='minus-modal'
                                                onClick={() => handleMinusClick()} alt="minus" />
                                        </button>
                                        <input className="item-counter" type="text" id="counter-modal"
                                            value={modalContent.amount} onChange={(e) => {
                                                handleInputChange(e.target)
                                            }} />
                                        <button className='counter-button'>
                                            <img className="counter-icon" src={PlusIcon} id='plus-modal'
                                                onClick={() => handlePlusClick()} alt="plus" />
                                        </button>
                                    </div>
                                    <button className="item-button" id="button-modal">{modalWindowAddShow ?
                                        "В КОРЗИНУ" : (modalWindowEditShow ? "ИЗМЕНИТЬ" : [])}</button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ModalWindowSandwich;
