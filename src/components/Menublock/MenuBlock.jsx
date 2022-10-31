import React from 'react';
import { useSelector } from 'react-redux'
import MenuItem from '../MenuItem/MenuItem';

import SubwayLogo from '../../i/Subway_logo.png'
import DonerLogo from '../../i/Doner_logo.png'
import KFCLogo from '../../i/South_fried_chicken_logo.png'
import './MenuBlock.scss';

function MenuBlock() {

    // const [username, setUsername] = useState("peter");
    const selectedTab = useSelector(state => state.selectedTab)
    const data = useSelector(state => state.items)

    return (
        <div className="menu-block">
            <div className="items-block">
                {data.map((item, i) => (
                    item.category === selectedTab && /*Изменить, чтобы не ругался компилятор*/
                    <MenuItem item={item} i={i + 1} logo={item.market === "sfc" ? KFCLogo : 
                    item.market === "doner" ? DonerLogo : SubwayLogo} key={`item-${i}`} />
                ))}
            </div>
        </div>
    );
}

export default MenuBlock;
