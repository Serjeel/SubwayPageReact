
import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import MainHeader from './components/MainHeader/MainHeader'
import MenuCategories from './components/MenuCategories/MenuCategories';
import Order from './components/Order/Order';
import MenuBlock from './components/Menublock/MenuBlock';
import './App.scss';
import { getItemsInfo } from './api';
import { setCountersValue, setIngredients, setItems } from './redux/actions';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    Items();
  }, []);



  const Items = async () => {
    const data = await getItemsInfo();

    let countersValue = [];
    data.menu.forEach(() => {
      countersValue.push(1)
    });

    dispatch(setCountersValue(countersValue));

    dispatch(setItems(data.menu));

    dispatch(setIngredients({
      sizes: data.sizes,
      breads: data.breads,
      vegetables: data.vegetables,
      sauces: data.sauces,
      fillings: data.fillings
    }))
  }

  return (
    <div className="App">
      <MainHeader />
      <div className="main-form">
        <div className="categories_and_orders-block">
          <MenuCategories />
          <Order />
        </div>
        <MenuBlock />
      </div>
    </div>
  );
}

export default App;
