import React, { useState } from 'react';
import PlusIcon from '../../i/plus.svg'
import MinusIcon from '../../i/minus.svg'
import './MenuItem.scss';

function MenuItem({ item, i, logo, countersValue }) {
    // const [username, setUsername] = useState("peter");

    return ( // Разделить папку items на части по нужным компонентам
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
                <input className="item-counter" type="text" id={`counter-${i}`} /*value={countersValue[i - 1]}*/ />
                <img className="plus-icon" src={PlusIcon} id={`plus-${i}`} />
            </div>
            <button className="item-button" id={`button-${i}`}>В КОРЗИНУ</button>
        </div>
    );
}

export default MenuItem;
