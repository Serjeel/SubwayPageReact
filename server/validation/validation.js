module.exports.validateUserOrderDeleteChange = (token, selectedOrder) => {
    if (selectedOrder.username === token.username) {
        return true
    } else {
        return false
    }
}

module.exports.validateChange = (body) => {
    if (body.hasOwnProperty('orderId')
        && (body.hasOwnProperty('amount')
            || body.hasOwnProperty('size')
            || body.hasOwnProperty('bread')
            || body.hasOwnProperty('vegetables')
            || body.hasOwnProperty('sauces')
            || body.hasOwnProperty('fillings'))) {
        return true
    } else {
        return false
    }
}

module.exports.validateCreate = (body) => {
    if (body.hasOwnProperty('title')
        && body.hasOwnProperty('amount')) {
        return true
    } else {
        return false
    }
}

module.exports.productAvailability = (title, products) => {
    if (products[0].menu.find(item => item.name === title)) {
        return true
    } else {
        return false
    }
}

module.exports.ingredientAvailability = (body, products) => {
    let sizeAvailability = false;
    let breadAvailability = false;
    let vegetablesAvailability = [];
    let saucesAvailability = [];
    let fillingsAvailability = [];


    for (let i in products[0].sizes) {
        if (products[0].sizes[i].name === body.size) {
            sizeAvailability = true;
        }
    }

    for (let i in products[0].breads) {
        if (products[0].breads[i].name === body.bread) {
            breadAvailability = true;
        }
    }

    for (let j in body.vegetables) {
        for (let i in products[0].vegetables) {
            if (products[0].vegetables[i].name === body.vegetables[j]) {
                vegetablesAvailability[j] = true;
                break;
            } else {
                vegetablesAvailability[j] = false;
            }
        }
    }

    for (let j in body.sauces) {
        for (let i in products[0].sauces) {
            if (products[0].sauces[i].name === body.sauces[j]) {
                saucesAvailability[j] = true;
                break;
            } else {
                saucesAvailability[j] = false;
            }
        }
    }

    for (let j in body.fillings) {
        for (let i in products[0].fillings) {
            if (products[0].fillings[i].name === body.fillings[j]) {
                fillingsAvailability[j] = true;
                break;
            } else {
                fillingsAvailability[j] = false;
            }
        }
    }

    if (sizeAvailability && breadAvailability && !vegetablesAvailability.includes(false) &&
        !saucesAvailability.includes(false) && !fillingsAvailability.includes(false)) {
        return true
    } else {
        return false
    }
}

module.exports.calculatePrice = (body, title, products) => {
    let sizePrice = 0;
    let breadPrice = 0;
    let vegetablesPrice = 0;
    let saucesPrice = 0;
    let fillingsPrice = 0;
    for (let i in products[0].sizes) {
        if (products[0].sizes[i].name === body.size) {
            sizePrice = products[0].sizes[i].price
        }
    }

    for (let i in products[0].breads) {
        if (products[0].breads[i].name === body.bread) {
            breadPrice = products[0].breads[i].price
        }
    }

    for (let i in products[0].vegetables) {
        for (let j in body.vegetables) {
            if (products[0].vegetables[i].name === body.vegetables[j]) {
                vegetablesPrice += products[0].vegetables[i].price
            }
        }
    }

    for (let i in products[0].sauces) {
        for (let j in body.sauces) {
            if (products[0].sauces[i].name === body.sauces[j]) {
                saucesPrice += products[0].sauces[i].price
            }
        }
    }

    for (let i in products[0].fillings) {
        for (let j in body.fillings) {
            if (products[0].fillings[i].name === body.fillings[j]) {
                fillingsPrice += products[0].fillings[i].price
            }
        }
    }

    return products[0].menu.find(item => item.name === title).price +
        sizePrice + breadPrice + vegetablesPrice + saucesPrice + fillingsPrice
}

module.exports.arrayOfIngredients = (body, key, products) => {
    let res = [];

    for (let i in products[0][key]) {
        for (let j in body[key]) {
            if (products[0][key][i].name === body[key][j]) {
                res.push({
                    name: body[key][j],
                    price: products[0][key][i].price
                })
            }
        }
    }

    return res
}


module.exports.calculateCompletedPrice = (orderItems) => {
    let price = 0;
    orderItems.map(item => {
        price += item.price * item.amount
    })
    return price
}