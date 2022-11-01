import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setModalContent, setPreviousValues, setSelectedModalTab, setTabReadyContent } from '../../redux/actions';

import './Ingredient.scss';

function Ingredient({ item, i, objectKey }) {
    // const [username, setUsername] = useState("peter");
    const dispatch = useDispatch();
    console.log(item, i, objectKey);
    const selectedModalTab = useSelector(state => state.selectedModalTab);
    const ingredients = useSelector(state => state.ingredients);
    const modalContent = useSelector(state => state.modalContent);
    const previousValues = useSelector(state => state.previousValues);

    const tabReadyContent = useSelector(state => state.tabReadyContent);

    const modalItemClick = () => {
        let readyContent = Object.assign({}, tabReadyContent);
        let modContent = Object.assign({}, modalContent);
        let preValues = Object.assign({}, previousValues);

        if (selectedModalTab === "sizes" || selectedModalTab === "breads") {

            readyContent[selectedModalTab.slice(0, -1)] =
                ingredients[selectedModalTab][objectKey].name;

            modContent.price += ingredients[selectedModalTab][objectKey].price;
            modContent.price -= previousValues[selectedModalTab];

            dispatch(setModalContent(modContent));

            preValues[selectedModalTab] =
                ingredients[selectedModalTab][objectKey].price;

            dispatch(setPreviousValues(preValues));
            dispatch(setTabReadyContent(readyContent));
        } else {
            if (tabReadyContent[selectedModalTab].includes(
                ingredients[selectedModalTab][objectKey].name)) {
                let n = tabReadyContent[selectedModalTab].indexOf(
                    ingredients[selectedModalTab][objectKey].name);
                modContent.price -= ingredients[selectedModalTab][objectKey].price;

                readyContent[selectedModalTab].splice(n, 1);

                dispatch(setModalContent(modContent));
                dispatch(setTabReadyContent(readyContent));
            } else {
                readyContent[selectedModalTab].push(
                    ingredients[selectedModalTab][objectKey].name);

                modContent.price += ingredients[selectedModalTab][objectKey].price;
                dispatch(setModalContent(modContent));
                dispatch(setTabReadyContent(readyContent));
            }
        }
    }

    return (
        <div className={tabReadyContent.size === item.name ||
            tabReadyContent.bread === item.name ||
            tabReadyContent.vegetables.includes(item.name) ||
            tabReadyContent.sauces.includes(item.name) ||
            tabReadyContent.fillings.includes(item.name)
            ? "modal-item-active" : "modal-item"} id={`item-${i}`}
            onClick={() => modalItemClick()}>
            <img className="item-image" src={require(`.${item.image}`)} />
            <p className="item-name">{item.name}</p>
            <div className="item-price-block">
                <p className="price-text">Цена:</p>
                <p className="price-value" id={`price-${i}`}>{item.price}</p>
                <p className="price-currency">руб.</p>
            </div>
        </div>
    );
}

export default Ingredient;
