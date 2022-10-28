import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlusIcon from '../../i/plus.svg'
import MinusIcon from '../../i/minus.svg'
import { setCountersValue } from '../../redux/actions';
import './MenuItem.scss';

function MenuItem({ item, i, logo }) {
    console.log("Menuitem");
    // const [username, setUsername] = useState("peter");
    const dispatch = useDispatch();

    const countersValue = useSelector(state => state.countersValue);
    console.log('>>>>>>', countersValue);

    const handlePlusClick = () => {
        let value = countersValue;
        value[i - 1] += 1;
        // console.log(countersValue[i - 1]);
        dispatch(setCountersValue(value))
        console.log(countersValue);
    }

    const handleMinusClick = () => {
        dispatch(setCountersValue(countersValue[i - 1] - 1))
    }

    return (
        <div className="item" id={`item-${i}`}>
            <img className="logo" src={logo} />
            <img className="item-image" src={require(`.${item.image}`)} />
            <p className="item-name">{item.name}</p>
            <p className="item-composition">{item.description}</p>
            <div className="item-price-block">
                <p className="price-text">Цена:</p>
                <p className="price-value" id={`price-${i}`}>{item.price}</p>
                <p className="price-currency">руб.</p>
            </div>
            <p className="item-amount">Количество</p>
            <div className="amount-block">
                <img className="minus-icon" src={MinusIcon} id={`minus-${i}`} />
                <input className="item-counter" type="text" id={`counter-${i}` }
                    value={countersValue[i-1]} onChange={(e) => { dispatch(setCountersValue(e.target.value)) }} />
                <img className="plus-icon" src={PlusIcon} id={`plus-${i}`} 
                onClick={() =>  handlePlusClick() /*Почему-то не происходит ререндер*/}/>
            </div>
            <button className="item-button" id={`button-${i}`}>В КОРЗИНУ</button>
        </div>
    );
}

export default MenuItem;
