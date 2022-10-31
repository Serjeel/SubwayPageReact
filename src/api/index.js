import axios from 'axios';
import Cookies from 'js-cookie';

export async function getItemsInfo() {
    let data = {};
    await axios.get(`http://localhost:8000/food/getAllFood`)
        .then(res => { data = res.data[0] });
    return data;
}

export async function getAuthentification(inputsContent) {
    let data = {}
    await axios.post('http://localhost:8000/user/login', {
        username: inputsContent.logUsername.toLowerCase(),
        password: inputsContent.logPassword
    }).then(res => { data = res.data });

    return data;
}

export async function getAuthorization() {
    let data = {};
    try {
        await axios.get(`http://localhost:8000/user/protected`, {
            headers: {
                Authorization: Cookies.get("token")
            }
        })
            .then(res => { data = res.data });
    } catch {
        data = {
            success: false,
            user: {
                id: "",
                username: ""
            }
        }
    }

    return data;
}

export async function getRegistration(inputsContent) {
    let data = {};
    await axios.post('http://localhost:8000/user/register', {
        username: inputsContent.regUsername.toLowerCase(),
        password: inputsContent.regPassword
    }).then(res => { data = res.data });

    return data;
}

export async function getAllOrders(username) {
    let data = {};
    await axios.get(`http://localhost:8000/order/getAllOrders?username=${username}`)
        .then(res => { data = res.data });

    return data;
}

/*export async function getCreateNewOrder(i) {
    let data = {};
    await axios.post('http://localhost:8000/order/createNewOrder', {
        title: storage.data.items[i].name,
        username: storage.data.username,
        amount: storage.data.countersValue[i]
    }, {
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => { data = res.data });

    return data;
}*/

/*export async function getCreateNewSandwichOrder() {
    let data = {};
    await axios.post('http://localhost:8000/order/createNewOrder', {
        title: storage.data.modalContent.title,
        username: storage.data.username,
        amount: storage.data.modalContent.amount,
        size: storage.data.tabReadyContent.size,
        bread: storage.data.tabReadyContent.bread,
        vegetables: storage.data.tabReadyContent.vegetables,
        sauces: storage.data.tabReadyContent.sauces,
        fillings: storage.data.tabReadyContent.fillings
    }, {
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => { data = res.data });

    return data;
}*/

/*export async function getChangeOrderInfo() {
    let data = {};
    await axios.patch('http://localhost:8000/order/changeOrderInfo', {
        orderId: storage.data.changeableOrderItem.orderId,
        amount: storage.data.modalContent.amount,
        size: storage.data.tabReadyContent.size,
        bread: storage.data.tabReadyContent.bread,
        vegetables: storage.data.tabReadyContent.vegetables,
        sauces: storage.data.tabReadyContent.sauces,
        fillings: storage.data.tabReadyContent.fillings
    }, {
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => { data = res.data });

    return data;
}*/

/*export async function getDeleteOrder(i) {
    let data = {};
    await axios.delete(
        `http://localhost:8000/order/deleteOrder?orderId=${orderItems[i].orderId}`, {
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => { data = res.data });

    return data;
}*/

export async function getCreateNewCompletedOrder() {
    let data = {};
    await axios.post(
        'http://localhost:8000/completedOrder/createNewCompletedOrder', {}, {
        headers: {
            Authorization: Cookies.get("token")
        }
    }).then(res => { data = res.data })

    return data;
}