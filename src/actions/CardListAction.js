import { 
  ADD_PRAICE_LIST,
  ITEM,
  CHANGE_QUANTITY,
  TOTAL,
  DELETE_ITEM
} from '../actionTypes';

import Prais from '../prais.json'; //Вместо обращения к серверу

export const add_product = () => async (dispatch, getState) => {
  //const product = await fetch('').json();  Обратились к серверу за списком товаров
  if(getState().CardListReducer.quantity.length) {
    return dispatch({type: ADD_PRAICE_LIST, paiload: {Prais, quantity: getState().CardListReducer.quantity}});
  } else {
    return dispatch({type: ADD_PRAICE_LIST, paiload: {Prais, quantity: Prais.map((e)=>({id: e.id, quantity: 1}))}});
  }
}

export const product = (id) => (dispatch, getState) => {
  const product = getState().CardListReducer.prais_list[getState().CardListReducer.prais_list.findIndex((e)=> e.id === id)];
  const card_arrey = getState().CardListReducer.card;
  if(card_arrey.find((e)=> e.id === id)) { //Если такой товар уже есть в карзине, он удаляется
    card_arrey.splice(card_arrey.findIndex((e)=> e.id === id), 1);
    return dispatch({type: ITEM, paiload: {id: id, card: card_arrey, position: product.position = true}});
  }
  const quantity_arrey = getState().CardListReducer.quantity;
  const quantity = quantity_arrey[quantity_arrey.findIndex((e)=> e.id === id)];
  card_arrey.push(product)
  const card = card_arrey[card_arrey.findIndex((e)=> e.id === id)]
  Object.assign(card, {discount: '', total: ''})
  card.total = quantity.quantity * card.price
  return dispatch({type: ITEM, paiload: {id: id, card: card_arrey, position: product.position = false}});
}

export const change_quantity = (id, indicator, value) => (dispatch, getState) => {
  const quantity_product = getState().CardListReducer.quantity.filter((e)=>(e.id === id));
  const product = getState().CardListReducer.card.filter((e)=>(e.id === id));
  let quantity = quantity_product[0].quantity;
  if(indicator === 'increment') {
    quantity ++;
  } else if(indicator === 'decrement') {
    quantity --;
  } else if(value) {
    quantity = value
  } else return;
  if(quantity <= 0) quantity = 1;
  if(!(quantity%3) && product[0].title === 'Папая') {  //Расчет скидок
    
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

    return dispatch({type: DELETE_ITEM, paiload: {id: id, prais_list: true, quantity: 1}});
}