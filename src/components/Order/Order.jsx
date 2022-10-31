import React from 'react';
import TrashBasket from '../../i/trash.svg'
import ShoppingBasket from '../../i/basket.svg'
import './Order.scss';
import { useSelector } from 'react-redux';

function Order() {
    // const [username, setUsername] = useState("peter");
    const orderItems = useSelector(state => state.orderItems)
    const totalPrice = useSelector(state => state.totalPrice)

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
                        <p className="order-title"
                            >{item.title}</p>
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
