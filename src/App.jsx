
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import MainHeader from './components/MainHeader/MainHeader'
import MenuCategories from './components/MenuCategories/MenuCategories';
import Order from './components/Order/Order';
import MenuBlock from './components/Menublock/MenuBlock';
import ModalWindowAuthorization from './components/ModalWindowAuthorization/ModalWindowAuthorization';
import ModalWindowSandwich from './components/ModalWindowSandwich/ModalWindowSandwich';
import './App.scss';
import { getItemsInfo, getAllOrders, getAuthorization } from './api';
import { setCountersValue, setIngredients, setIsAuthorized, setItems, setOrderItems, setSandwiches, setTotalPrice } from './redux/actions';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const username = useSelector(state => state.username);
  const modalWindowAuthorizationShow = useSelector(state => state.modalWindowAuthorizationShow);
  const modalWindowAddShow = useSelector(state => state.modalWindowAddShow);
  const modalWindowEditShow = useSelector(state => state.modalWindowEditShow);

  useEffect(() => {
    Items();
    OrderItems();
    Authorization();
  }, []);

  const Items = async () => {
    const data = await getItemsInfo();

    let countersValue = [];
    data[0].menu.forEach(() => {
      countersValue.push(1)
    });

    dispatch(setCountersValue(countersValue));

    dispatch(setItems(data[0].menu));

    dispatch(setIngredients({
      sizes: data[0].sizes,
      breads: data[0].breads,
      vegetables: data[0].vegetables,
      sauces: data[0].sauces,
      fillings: data[0].fillings
    }))
  }

  const OrderItems = async () => {

    const data = await getAllOrders(username);

    let orderItems = data;
    // let sandwiches = data[0].filter(item => item.bread)

    let vegetables = [];
    let sauces = [];
    let fillings = [];

    for (let i in orderItems) {
      vegetables = []
      for (let j in orderItems[i].vegetables) {
        if (orderItems[i].vegetables[j].name) {
          vegetables.push(orderItems[i].vegetables[j].name);
        }
      }
      orderItems[i].vegetables = vegetables;
      sauces = [];
      for (let j in orderItems[i].sauces) {
        if (orderItems[i].sauces[j].name) {
          sauces.push(orderItems[i].sauces[j].name);
        }
      }
      orderItems[i].sauces = sauces;
      fillings = [];
      for (let j in orderItems[i].fillings) {
        if (orderItems[i].fillings[j].name) {
          fillings.push(orderItems[i].fillings[j].name);
        }
      }
      orderItems[i].fillings = fillings;
    }
    dispatch(setOrderItems(orderItems))
    dispatch(setSandwiches(orderItems.filter(item => item.bread)))

    let totalPrice = 0;
    data.map((item) => {
      totalPrice += item.price * item.amount;
    })
    dispatch(setTotalPrice(totalPrice))
  }

  const Authorization = async () => {
    const auth = await getAuthorization();
    if (auth.success) {
      dispatch(setIsAuthorized(auth.success));
    } else {
      Cookies.remove("token");
    }
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
      <div className="modal-block">
        {modalWindowAuthorizationShow && <ModalWindowAuthorization/>}
        {(modalWindowAddShow || modalWindowEditShow) && <ModalWindowSandwich/>}
      </div>
    </div>
  );
}

export default App;
