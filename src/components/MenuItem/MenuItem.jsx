import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlusIcon from '../../i/plus.svg'
import MinusIcon from '../../i/minus.svg'
import { setCountersValue, setModalContent, setModalWindowAddShow, setModalWindowAuthorizationShow, setOrderItems, setSelectedModalTab, setTabReadyContent, setTotalPrice } from '../../redux/actions';
import './MenuItem.scss';
import { getCreateNewOrder } from '../../api';

function MenuItem({ item, i, logo }) {
    // const [username, setUsername] = useState("peter");
    const dispatch = useDispatch();

    const countersValue = useSelector(state => state.countersValue);
    const items = useSelector(state => state.items);
    const selectedTab = useSelector(state => state.selectedTab);
    const username = useSelector(state => state.username);
    const totalPrice = useSelector(state => state.totalPrice);
    const orderItems = useSelector(state => state.orderItems);

    const handlePlusClick = () => {
        let value = countersValue.slice(0);
        value[i - 1] += 1;
        dispatch(setCountersValue(value))
    }

    const handleMinusClick = () => {
        let value = countersValue.slice(0);
        if (value[i - 1] > 1) {
            value[i - 1] -= 1;
            dispatch(setCountersValue(value))
        }
    }

    const handleInputChange = (target) => {
        let value = countersValue.slice(0);
        if (value[i - 1] >= 1) {
            value[i - 1] = parseInt(target.value);
            dispatch(setCountersValue(value))
        } else {
            value[i - 1] = 1;
            dispatch(setCountersValue(value))
            target.value = 1;
        }
    }

    const handleButtonClick = () => {
        if (username) {
            if (selectedTab === "sandwiches") {
                dispatch(setSelectedModalTab("sizes"));
                dispatch(setModalWindowAddShow(true));
                dispatch(setModalContent({
                    title: items[i - 1].name,
                    amount: countersValue[i - 1],
                    price: items[i - 1].price
                }));
                dispatch(setTabReadyContent({
                    size: "15 См",
                    bread: "Белый итальянский",
                    vegetables: [],
                    sauces: [],
                    fillings: []
                }))
            } else {
                const CreateOrder = async () => {
                    const data = await getCreateNewOrder(i - 1, items, username, countersValue);

                    let orders = orderItems.slice(0);
                    let newItem = data[0];

                    orders.push(newItem);

                    dispatch(setOrderItems(orders));
                    dispatch(setTotalPrice(totalPrice + (items[i].price
                        * countersValue[i])))
                }

                CreateOrder();
            }
        } else {
            alert("Сначала нужно авторизоваться!");
            dispatch(setModalWindowAuthorizationShow(true));
        }
    }

    return (
        <div className="item" id={`item-${i}`}>
            <img className="logo" src={logo} alt="logo" />
            <img className="item-image" src={require(`.${item.image}`)} alt="item" />
            <p className="item-name">{item.name}</p>
            <p className="item-composition">{item.description}</p>
            <div className="item-price-block">
                <p className="price-text">Цена:</p>
                <p className="price-value" id={`price-${i}`}>{item.price}</p>
                <p className="price-currency">руб.</p>
            </div>
            <p className="item-amount">Количество</p>
            <div className="amount-block">
                <button className='counter-button'>
                    <img className="counter-icon" src={MinusIcon} id={`minus-${i}`}
                        onClick={() => handleMinusClick()} alt="minus" />
                </button>
                <input className="item-counter" type="text" id={`counter-${i}`}
                    value={countersValue[i - 1]}
                    onChange={(e) => { handleInputChange(e.target) }} />
                <button className='counter-button'>
                    <img className="counter-icon" src={PlusIcon} id={`plus-${i}`}
                        onClick={() => handlePlusClick()} alt="plus" />
                </button>
            </div>
            <button className="item-button" id={`button-${i}`} onClick={() =>
                handleButtonClick()}>В КОРЗИНУ</button>
        </div>
    );
}

export default MenuItem;
