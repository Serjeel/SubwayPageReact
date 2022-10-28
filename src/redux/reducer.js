import constants from './constans';

const defaultState = {
    /*username: Cookies.get('token') ? Decode(Cookies.get('token')).username : "",*/
    isAuthorized: false,
    selectedTab: "sandwiches",
    selectedModalTab: "sizes",
    selectedAuthorizationTab: "login",
    items: [],
    ingredients: [],
    countersValue: [],
    orderItems: [],
    totalPrice: 0,
    modalWindowAddShow: false,
    modalWindowEditShow: false,
    modalWindowAuthorizationShow: false,
    modalContent: {},
    sandwiches: [],
    tabReadyContent: {
        size: "15 См",
        bread: "Белый итальянский",
        vegetables: [],
        sauces: [],
        fillings: []
    },
    changeableOrderItem: {},
    previousValues: {
        sizes: 0,
        breads: 0
    }
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case constants.SET_SELECTED_TAB:
      return {...state, selectedTab: action.payload}

      case constants.SET_IS_AUTHORIZED:
      return {...state, isAuthorized: action.payload}

      case constants.SET_SELECTED_MODAL_TAB:
      return {...state, selectedModalTab: action.payload}

      case constants.SET_SELECTED_AUTHORIZATION_TAB:
      return {...state, selectedAuthorizationTab: action.payload}

      case constants.SET_ITEMS:
      return {...state, items: action.payload}

      case constants.SET_INGREDIENTS:
      return {...state, ingredients: action.payload}

      case constants.SET_COUNTERS_VALUE:
      return {...state, countersValue: action.payload}

      case constants.SET_ORDER_ITEMS:
      return {...state, orderItems: action.payload}

      case constants.SET_TOTAL_PRICE:
      return {...state, totalPrice: action.payload}

      case constants.SET_MODAL_WINDOW_ADD_SHOW:
      return {...state, modalWindowAddShow: action.payload}

      case constants.SET_MODAL_WINDOW_EDIT_SHOW:
      return {...state, modalWindowEditShow: action.payload}

      case constants.SET_MODAL_WINDOW_AUTHORIZATION_SHOW:
      return {...state, modalWindowAuthorizationShow: action.payload}

      case constants.SET_MODAL_CONTENT:
      return {...state, modalContent: action.payload}

      case constants.SET_SANDWICHES:
      return {...state, sandwiches: action.payload}

      case constants.SET_TAB_READY_CONTENT:
      return {...state, tabReadyContent: action.payload}

      case constants.SET_CHANGEABLE_ORDER_ITEM:
      return {...state, changeableOrderItem: action.payload}

      case constants.SET_PREVIOUS_VALUES:
      return {...state, previousValues: action.payload}

      case constants.SET_ITEMS_INFO:
      return {...state, items: action.payload}
    default:
      return state;
  }
};