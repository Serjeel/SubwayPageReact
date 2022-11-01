import React from 'react';
import TrashBasket from '../../i/trash.svg'
import ShoppingBasket from '../../i/basket.svg'
import './Order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setChangeableOrderItem, setModalContent, setModalWindowEditShow, setPreviousValues, setSelectedModalTab, setTabReadyContent } from '../../redux/actions';

function Order() {
    const dispatch = useDispatch();
    const orderItems = useSelector(state => state.orderItems);
    const totalPrice = useSelector(state => state.totalPrice);
    const ingredients = useSelector(state => state.ingredients);
    const sandwiches = useSelector(state => state.sandwiches);

    const handleOrderClick = (i) => {
        console.log(orderItems[i]);
        let changeableOrderItem = {};
        changeableOrderItem = orderItems[i];
        dispatch(setChangeableOrderItem(changeableOrderItem));
        dispatch(setSelectedModalTab("sizes"));
        dispatch(setModalWindowEditShow(true));

        dispatch(setTabReadyContent({
            bread: orderItems[i].bread,
            fillings: orderItems[i].fillings.slice(0),
            sauces: orderItems[i].sauces.slice(0),
            size: orderItems[i].size,
            vegetables: orderItems[i].vegetables.slice(0),
        }));

        dispatch(setModalContent({
            amount: orderItems[i].amount,
            id: orderItems[i].id,
            price: orderItems[i].price,
            title: orderItems[i].title
        }));
        let n = 0;
        for (let j in ingredients.sizes) {
            if (orderItems[i].size === ingredients.sizes[j].name) {
                n = ingredients.sizes[j].price;
            }
        }
        dispatch(setPreviousValues({
            sizes: n,
            breads: 0
        }))
    }

    return (
        <div className="order">
            <div className="order-head">
                <img className="basket-icon" src={ShoppingBasket} />
                <p className="head-title">Корзина</p>
            </div>
            <div className="order-headers">
                <p className="title-header">Название</p>
                <p className="amount-header">Кол-во</p>
                <p className="price-header">Цена</p>
            </div>
            <div className="order-items-block">
                {orderItems.map((item, i) => (
                    <div className="order-items" id={`order-${i + 1}`} key={`order-${i + 1}`}>
                        <p className={item.bread ? "sandwich-title" : "order-title"}
                        onClick={() => item.bread ? handleOrderClick(i) : {}}>{item.title}</p>
                        <p className="order-amount">{item.amount}</p>
                        <p className="order-price">{item.price * item.amount} руб.</p>
                        <img className="delete-icon" id={`delete-${i + 1}`} key={`delete-${i + 1}`}
                            src={TrashBasket} />
                    </div>))}
            </div>
            <div>
                <div className="sum">
                    <p className="sum-text">Цена: </p>
                    <p className="sum-value" id="sum">{totalPrice}</p>
                    <p className="sum-currency">руб.</p>
                </div>
            </div>
            <button className="order-button">ОФОРМИТЬ ЗАКАЗ</button>
        </div>
    );
}

export default Order;
