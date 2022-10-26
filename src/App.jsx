
import React, { useState } from 'react';
import MainHeader from './components/MainHeader/MainHeader'
import MenuCategories from './components/MenuCategories/MenuCategories';
import Order from './components/Order/Order';
import MenuBlock from './components/Menublock/MenuBlock';
import './App.scss';

function App() {
  const [selectedTab, setSelectedTab] = useState("sandwiches")
  return (
    <div className="App">
      <MainHeader />
      <div class="main-form">
        <div className="categories_and_orders-block">
          <MenuCategories selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <Order />
        </div>
        <MenuBlock selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
    </div>
  );
}

export default App;
