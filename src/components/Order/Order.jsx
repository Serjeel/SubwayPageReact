import React from 'react';
import TrashBasket from '../../i/trash.svg'
import ShoppingBasket from '../../i/basket.svg'
import './Order.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setChangeableOrderItem, setModalContent, setModalWindowEditShow, setOrderItems, setPreviousValues, setSandwiches, setSelectedModalTab, setTabReadyContent, setTotalPrice } from '../../redux/actions';
import { getCreateNewCompletedOrder, getDeleteOrder } from '../../api';

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

    const handleDeleteIconClick = (i) => {

        const DeleteOrder = async () => {
            const data = await getDeleteOrder(i, orderItems);

            let orders = orderItems.slice(0);
            let sandwichItems = sandwiches.slice(0);

            dispatch(setTotalPrice(totalPrice - (orderItems[i].price *
                orderItems[i].amount)));

            const deletedSandwich = sandwichItems.find(arr => arr.orderId ===
                orderItems[i].orderId);
            if (deletedSandwich) {
                const n = sandwichItems.findIndex(arr => arr.orderId ===
                    deletedSandwich.orderId)
                sandwichItems.splice(n, 1);
            }
            orders.splice(i, 1);

            dispatch(setSandwiches(sandwichItems));
            dispatch(setOrderItems(orders));
        }

        DeleteOrder();
    }

    const handleComleteOrderButtonClick = () => {

        const CompleteOrder = async () => {
            const data = await getCreateNewCompletedOrder();
            if (!data.status) {
                dispatch(setSandwiches([]));
                dispatch(setOrderItems([]));
                dispatch(setTotalPrice(0));
                alert("?????????? ????????????????");
            } else {
                alert(data.status);
            }
        }

        CompleteOrder();
    }

    return (
        <div className="order">
            <div className="order-head">
                <img className="basket-icon" src={ShoppingBasket} />
                <p className="head-title">??????????????</p>
            </div>
            <div className="order-headers">
                <p className="title-header">????????????????</p>
                <p className="amount-header">??????-????</p>
                <p className="price-header">????????</p>
            </div>
            <div className="order-items-block">
                {orderItems.map((item, i) => (
                    <div className="order-items" id={`order-${i + 1}`} key={`order-${i + 1}`}>
                        <p className={item.bread ? "sandwich-title" : "order-title"}
                            onClick={() => item.bread ? handleOrderClick(i) : {}}>{item.title}</p>
                        <p className="order-amount">{item.amount}</p>
                        <p className="order-price">{item.price * item.amount} ??????.</p>
                        <img className="delete-icon" id={`delete-${i + 1}`} key={`delete-${i + 1}`}
                            src={TrashBasket} onClick={() => handleDeleteIconClick(i)} />
                    </div>))}
            </div>
            <div>
                <div className="sum">
                    <p className="sum-text">????????: </p>
                    <p className="sum-value" id="sum">{totalPrice}</p>
                    <p className="sum-currency">??????.</p>
                </div>
            </div>
            <button className="order-button" onClick={() => handleComleteOrderButtonClick()}>???????????????? ??????????</button>
        </div>
    );
}

export default Order;
