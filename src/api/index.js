import axios from 'axios';
import Cookies from 'js-cookie';

async function makeRequest(requestType, requestUrl, requestData) {
    console.log(requestType);
    console.log(requestUrl);
    console.log(requestData);

    let data = {};
    if (requestData) {
        await axios[requestType](requestUrl, requestData, {
            headers: {
                Authorization: Cookies.get("token")
            }
        }).then(res => { data = res.data }).catch(err => {});
    } else {
        await axios[requestType](requestUrl, {
            headers: {
                Authorization: Cookies.get("token")
            }
        }).then(res => { data = res.data }).catch(err => {});
    }

    console.log(data);

    return data;
}

export async function getItemsInfo() {
    return makeRequest('get', 'http://localhost:8000/food/getAllFood', {})
}

export async function getAuthentification(inputsContent) {
    return makeRequest('post', 'http://localhost:8000/user/login', {
        username: inputsContent.logUsername.toLowerCase(),
        password: inputsContent.logPassword
    })
}

export async function getAuthorization() {
    return makeRequest('get', 'http://localhost:8000/user/protected')
}

export async function getRegistration(inputsContent) {
    return makeRequest('post', 'http://localhost:8000/user/register', {
        username: inputsContent.regUsername.toLowerCase(),
        password: inputsContent.regPassword
    })
}

export async function getAllOrders(username) {
    return makeRequest('get', `http://localhost:8000/order/getAllOrders?username=${username}`)
}

export async function getCreateNewOrder(i, items, username, countersValue) {
    return makeRequest('post', 'http://localhost:8000/order/createNewOrder', {
        title: items[i].name,
        username: username,
        amount: countersValue[i]
    })/*
    let data = {};
    await axios.post('http://localhost:8000/order/createNewOrder', {
        title: items[i].name,
        username: username,
        amount: countersValue[i]
    }, {
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => { data = res.data });

    return data;*/
}

export async function getCreateNewSandwichOrder(modalContent, username, tabReadyContent) {
    return makeRequest('post', 'http://localhost:8000/order/createNewOrder', {
        title: modalContent.title,
        username: username,
        amount: modalContent.amount,
        size: tabReadyContent.size,
        bread: tabReadyContent.bread,
        vegetables: tabReadyContent.vegetables,
        sauces: tabReadyContent.sauces,
        fillings: tabReadyContent.fillings
    })/*
    let data = {};
    await axios.post('http://localhost:8000/order/createNewOrder', {
        title: modalContent.title,
        username: username,
        amount: modalContent.amount,
        size: tabReadyContent.size,
        bread: tabReadyContent.bread,
        vegetables: tabReadyContent.vegetables,
        sauces: tabReadyContent.sauces,
        fillings: tabReadyContent.fillings
    }, {
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => { data = res.data });

    return data;*/
}

export async function getChangeOrderInfo(changeableOrderItem, modalContent, tabReadyContent) {
    return makeRequest('patch', 'http://localhost:8000/order/changeOrderInfo', {
        orderId: changeableOrderItem.orderId,
        amount: modalContent.amount,
        size: tabReadyContent.size,
        bread: tabReadyContent.bread,
        vegetables: tabReadyContent.vegetables,
        sauces: tabReadyContent.sauces,
        fillings: tabReadyContent.fillings
    })/*
    let data = {};
    await axios.patch('http://localhost:8000/order/changeOrderInfo', {
        orderId: changeableOrderItem.orderId,
        amount: modalContent.amount,
        size: tabReadyContent.size,
        bread: tabReadyContent.bread,
        vegetables: tabReadyContent.vegetables,
        sauces: tabReadyContent.sauces,
        fillings: tabReadyContent.fillings
    }, {
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => { data = res.data });

    return data;*/
}

export async function getDeleteOrder(i, orderItems) {
    return makeRequest('delete', `http://localhost:8000/order/deleteOrder?orderId=${orderItems[i].orderId}`)
    /*
    let data = {};
    await axios.delete(
        `http://localhost:8000/order/deleteOrder?orderId=${orderItems[i].orderId}`, {
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => { data = res.data }).catch(err => alert("Ошибка!" + err));

    return data;*/
}

export async function getCreateNewCompletedOrder() {
    return makeRequest('post', 'http://localhost:8000/completedOrder/createNewCompletedOrder', {})
    /*let data = {};
    await axios.post(
        'http://localhost:8000/completedOrder/createNewCompletedOrder', {}, {
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => { data = res.data })

    return data;*/
}