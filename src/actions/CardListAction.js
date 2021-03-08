import { 
  ADD_PRAICE_LIST,
  ITEM,
  CHANGE_QUANTITY,
  TOTAL,
  DELETE_ITEM
} from '../actionTypes';

import Prais from '../prais.json'; //Вместо обращения к серверу

export const add_product = () => async (dispatch) => {
  //const product = await fetch('').json();  Обратились к серверу за списком товаров
  return dispatch({type: ADD_PRAICE_LIST, paiload: Prais});
}

export const product = (id) => (dispatch, getState) => {
  
  const product = getState().CardListReducer.prais_list[+id-1]
  const card = getState().CardListReducer.card;
  if(card.find((e)=> e.id === id)) { //Если такой товар уже есть в карзине, он удаляется
    card.splice(card.findIndex((e)=> e.id === id), 1);
    return dispatch({type: ITEM, paiload: {id, card, position: product.position = true}});
  }
  Object.assign(product, {quantity: 1, total: '', discount: 0})
  product.total = product.quantity * product.price
  card.push(product)
  return dispatch({type: ITEM, paiload: {id: id, card: card, position: product.position = false}});
}

export const change_quantity = (id, indicator, value) => (dispatch, getState) => {
  const product = getState().CardListReducer.card.filter((e)=>(e.id === id));
  let quantity = 0;
  if(indicator === 'increment') {
    quantity = product[0].quantity + 1;
  } else if(indicator === 'decrement') {
    quantity = product[0].quantity - 1;
  } else if(value) {
    product[0].quantity = value;
    quantity = product[0].quantity
  } else return;
  if(quantity <= 0) quantity = 1;
  if(!(quantity%3)) {  //Расчет скидок
    
    product[0].discount = product[0].price/2 * quantity/3;
  }
  if(quantity < 3) product[0].discount = 0
  return dispatch({type: CHANGE_QUANTITY, paiload: {id: id, quantity: quantity, discount: product[0].discount}});
}

export const Total = () => (dispatch, getState) => {
  let Total = 0;
  let cart = getState().CardListReducer.card;
  cart.forEach((e)=>{
    Total += e.total;
  })
  return dispatch({type: TOTAL, paiload: Total});
}

export const Delete = (id) => (dispatch) => {
    return dispatch({type: DELETE_ITEM, paiload: id});
}