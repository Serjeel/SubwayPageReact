import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getItemsInfo } from '../../api';
import { setCountersValue, setIngredients, setItems } from '../../redux/actions';
import MenuItem from '../MenuItem/MenuItem';
import { categories, filteredData } from '../constants';
import SubwayLogo from '../../i/Subway_logo.png'
import DonerLogo from '../../i/Doner_logo.png'
import KFCLogo from '../../i/South_fried_chicken_logo.png'
import './MenuBlock.scss';
import { menu } from '../timelyMenu';

function MenuBlock() {
    
    // const [username, setUsername] = useState("peter");
    const selectedTab = useSelector(state => state.selectedTab)
    console.log(selectedTab);
    const data = useSelector(state => state.items)
    console.log(data.filter(item => item.category === selectedTab));
    
    
    return (
        <div className="menu-block">
            <div className="items-block">
                {data.filter(item => item.category === selectedTab).map((item, i) => (
                    <MenuItem item={item} i={i + 1} logo={SubwayLogo} key={i} />
                ))}
            </div>
        </div>
    );
}

export default MenuBlock;
