import React, { useState } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import SubwayLogo from '../../i/Subway_logo.png'
import DonerLogo from '../../i/Doner_logo.png'
import KFCLogo from '../../i/South_fried_chicken_logo.png'
import './MenuBlock.scss';
import { menu } from './timelyMenu';

function MenuBlock({selectedTab, setSelectedTab}) {
    // const [username, setUsername] = useState("peter");
    const data = menu;
    let countersValue = []
    data.map(() => {
        countersValue.push(1)
    })
    return (
        <div className="menu-block">
            <div className="items-block">
                {data.filter(item =>item.category === selectedTab).map((item, i) => (
                    <MenuItem item={item} i={i + 1} logo={SubwayLogo} countersValue={countersValue} />
                ))}
            </div>
        </div>
    );
}

export default MenuBlock;
