import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import Ingredient from '../Ingredient/Ingredient';
import { getAuthentification, getChangeOrderInfo, getCreateNewSandwichOrder, getRegistration } from '../../api';
import CloseIcon from '../../i/close-icon.svg';
import PlusIcon from '../../i/plus.svg';
import MinusIcon from '../../i/minus.svg';
import ResultImage from '../../i/result_sandwich.jpg'
import { setCountersValue, setModalContent, setModalWindowAddShow, setModalWindowAuthorizationShow, setModalWindowEditShow, setOrderItems, setPreviousValues, setSandwiches, setSelectedAuthorizationTab, setSelectedModalTab, setTabReadyContent, setTotalPrice } from '../../redux/actions';

import './ModalWindowSandwich.scss';

function ModalWindowSandwich() {
    const dispatch = useDispatch();
    const username = useSelector(state => state.username);
    const ingredients = useSelector(state => state.ingredients);
    const selectedModalTab = useSelector(state => state.selectedModalTab);
    const modalContent = useSelector(state => state.modalContent);
    const tabReadyContent = useSelector(state => state.tabReadyContent);
    const modalWindowAddShow = useSelector(state => state.modalWindowAddShow);
    const modalWindowEditShow = useSelector(state => state.modalWindowEditShow);
    const totalPrice = useSelector(state => state.totalPrice);
    const orderItems = useSelector(state => state.orderItems);
    const changeableOrderItem = useSelector(state => state.changeableOrderItem);

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

    const handleButtonModalClick = () => {
        setSelectedModalTab("sizes");
        if (modalWindowAddShow) {
            dispatch(setModalWindowAddShow(false));

            const CreateOrder = async () => {
                const data = await getCreateNewSandwichOrder(modalContent, username, tabReadyContent);


                let orders = orderItems.slice(0);
                let newItem = data[0];

                let vegetables = [];
                let sauces = [];
                let fillings = [];

                for (let i in newItem.vegetables) {
                    vegetables.push(newItem.vegetables[i].name)
                }

                for (let i in newItem.sauces) {
                    sauces.push(newItem.sauces[i].name)
                }

                for (let i in newItem.fillings) {
                    fillings.push(newItem.fillings[i].name)
                }

                newItem.vegetables = vegetables;
                newItem.sauces = sauces;
                newItem.fillings = fillings;

                orders.push(newItem)

                dispatch(setOrderItems(orders));
                dispatch(setSandwiches(orders.filter(item => item.bread)));

                dispatch(setTotalPrice(totalPrice + (newItem.price *
                    newItem.amount)));
                dispatch(setTabReadyContent({
                    size: "15 См",
                    bread: "Белый итальянский",
                    vegetables: [],
                    sauces: [],
                    fillings: []
                }))
            }

            CreateOrder();
        }
        if (modalWindowEditShow) {
            dispatch(setModalWindowEditShow(false));

            const ChangeOrder = async () => {
                const data = await getChangeOrderInfo(changeableOrderItem, modalContent, tabReadyContent);

                let orders = orderItems;
                let changedItem = data[0];

                let vegetables = [];
                let sauces = [];
                let fillings = [];

                for (let i in changedItem.vegetables) {
                    vegetables.push(changedItem.vegetables[i].name)
                }

                for (let i in changedItem.sauces) {
                    sauces.push(changedItem.sauces[i].name)
                }

                for (let i in changedItem.fillings) {
                    fillings.push(changedItem.fillings[i].name)
                }

                let changeableItem = orderItems.find(i => i.orderId ===
                    changeableOrderItem.orderId);
                let previousPrice = changeableItem.price * changeableItem.amount;

                orders.find(item => item.orderId === changeableOrderItem.orderId).size = changedItem.size;
                orders.find(item => item.orderId === changeableOrderItem.orderId).bread = changedItem.bread;
                orders.find(item => item.orderId === changeableOrderItem.orderId).vegetables = vegetables;
                orders.find(item => item.orderId === changeableOrderItem.orderId).sauces = sauces;
                orders.find(item => item.orderId === changeableOrderItem.orderId).fillings = fillings;

                orders.find(item => item.orderId === changeableOrderItem.orderId).amount = modalContent.amount;
                orders.find(item => item.orderId === changeableOrderItem.orderId).price =
                    modalContent.price;

                dispatch(setOrderItems(orders));
                dispatch(setSandwiches(orders.filter(item => item.bread)))

                dispatch(setTotalPrice(totalPrice + (modalContent.price *
                    modalContent.amount) - previousPrice));
                dispatch(setTabReadyContent({
                    size: "15 См",
                    bread: "Белый итальянский",
                    vegetables: [],
                    sauces: [],
                    fillings: []
                }))
            }

            ChangeOrder();
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
                                    <button className="item-button" id="button-modal" onClick={() =>
                                        handleButtonModalClick()}>{modalWindowAddShow ? "В КОРЗИНУ" :
                                            (modalWindowEditShow ? "ИЗМЕНИТЬ" : [])}</button>
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
