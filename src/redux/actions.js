import constants from './constans'; // Перенести оставшиеся функции

export const setSelectedTab = (selectedTab) => ({ type: constants.SET_SELECTED_TAB, payload: selectedTab });

export const setIsAuthorized = (isAuthorized) => ({ type: constants.SET_IS_AUTHORIZED, payload: isAuthorized });

export const setSelectedModalTab = (selectedModalTab) => ({ type: constants.SET_SELECTED_MODAL_TAB, payload: selectedModalTab });

export const setSelectedAuthorizationTab = (selectedAuthorizationTab) => ({ type: constants.SET_SELECTED_AUTHORIZATION_TAB, payload: selectedAuthorizationTab });

export const setItems = (items) => ({ type: constants.SET_ITEMS, payload: items });

export const setIngredients = (ingredients) => ({ type: constants.SET_INGREDIENTS, payload: ingredients });

export const setCountersValue = (countersValue) => ({ type: constants.SET_COUNTERS_VALUE, payload: countersValue });

export const setOrderItems = (orderItems) => ({ type: constants.SET_ORDER_ITEMS, payload: orderItems });

export const setTotalPrice = (totalPrice) => ({ type: constants.SET_TOTAL_PRICE, payload: totalPrice });

export const setModalWindowAddShow = (modalWindowAddShow) => ({ type: constants.SET_MODAL_WINDOW_ADD_SHOW, payload: modalWindowAddShow });

export const setModalWindowEditShow = (modalWindowEditShow) => ({ type: constants.SET_MODAL_WINDOW_EDIT_SHOW, payload: modalWindowEditShow });

export const setModalWindowAuthorizationShow = (modalWindowAuthorizationShow) => ({ type: constants.SET_MODAL_WINDOW_AUTHORIZATION_SHOW, payload: modalWindowAuthorizationShow });

export const setModalContent = (modalContent) => ({ type: constants.SET_MODAL_CONTENT, payload: modalContent });

export const setSandwiches = (sandwiches) => ({ type: constants.SET_SANDWICHES, payload: sandwiches });

export const setTabReadyContent = (tabReadyContent) => ({ type: constants.SET_TAB_READY_CONTENT, payload: tabReadyContent });

export const setChangeableOrderItem = (changeableOrderItem) => ({ type: constants.SET_CHANGEABLE_ORDER_ITEM, payload: changeableOrderItem });

export const setPreviousValues = (previousValues) => ({ type: constants.SET_PREVIOUS_VALUES, payload: previousValues });