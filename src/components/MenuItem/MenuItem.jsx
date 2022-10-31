import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlusIcon from '../../i/plus.svg'
import MinusIcon from '../../i/minus.svg'
import { setCountersValue } from '../../redux/actions';
import './MenuItem.scss';

function MenuItem({ item, i, logo }) {
    // const [username, setUsername] = useState("peter");
    const dispatch = useDispatch();

    const countersValue = useSelector(state => state.countersValue);

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

    return (
        <div className="item" id={`item-${i}`}>
            <img className="logo" src={logo} alt="logo" />
            <img className="item-image" src={require(`.${item.image}`)} alt="item-image" />
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
                        onClick={() => handleMinusClick()} />
                </button>
                <input className="item-counter" type="text" id={`counter-${i}`}
                    value={countersValue[i - 1]}
                    onChange={(e) => { handleInputChange(e.target) }} />
                <button className='counter-button'>
                    <img className="counter-icon" src={PlusIcon} id={`plus-${i}`}
                        onClick={() => handlePlusClick()} />
                </button>
            </div>
            <button className="item-button" id={`button-${i}`}>В КОРЗИНУ</button>
        </div>
    );
}

export default MenuItem;
