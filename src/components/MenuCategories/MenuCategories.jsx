import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedTab } from '../../redux/actions';

import { categories } from '../constants';
import './MenuCategories.scss';

function MenuCategories() {
    const dispatch = useDispatch();

    const selectedTab = useSelector(state => state.selectedTab)
    console.log(selectedTab);

    const changeCategory = (key) => {
        dispatch(setSelectedTab(key));
    };

    // Возможно здесь не нужен id в принципе, а только key для галочки

    return (
        <div className="menu-categories">
            {Object.keys(categories).map(key => (
                <p className={selectedTab === key ? "category-active" : "category"}
                    id={key} key={key} onClick={() => changeCategory(key)}>{categories[key]}</p>
            ))}
        </div>
    );
}

export default MenuCategories;
