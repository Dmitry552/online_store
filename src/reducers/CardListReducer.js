const initialStore = {
  prais_list: [],
  card: [],
  quantity: [],
  total: 0
}

export const CardListReducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'ADD_PRAICE_LIST': 
      return {
        ...state,
        
        prais_list: action.paiload.Prais,
        quantity: action.paiload.quantity
      };
    case 'ITEM': 
      return {
        ...state,
        prais_list: state.prais_list.map((e)=>{
          if(e.id === action.paiload.id) {
            e.position = action.paiload.position
            return e
          } else {return e}
        }),
        card: action.paiload.card
      };
    case 'CHANGE_QUANTITY': 
      return {
        ...state,
        quantity: state.quantity.map((e)=>{
          if(e.id === action.paiload.id) {
            e.quantity = action.paiload.quantity
            return e
          } else {return e}
        }),
        card: state.card.map((e)=>{
          if(e.id === action.paiload.id) {
            e.discount = action.paiload.discount
            e.total = state.quantity.filter((e)=>(e.id === action.paiload.id))[0].quantity * e.price - action.paiload.discount
            return e
          } else {return e}
        }),
        
      };
    case 'TOTAL': 
      return {
        ...state,
        total: action.paiload
      };
    case 'DELETE_ITEM': 
      return {
        ...state,
        card: state.card.filter((e)=>(
          !(e.id === action.paiload.id)
        )),
        prais_list: state.prais_list.map((e)=>{
          if(e.id === action.paiload.id) {
            e.position = action.paiload.prais_list;
            return e
          } else {return e}
        }),
        quantity: state.quantity.map((e)=>{
          if(e.id === action.paiload.id) {
            e.quantity = action.paiload.quantity;
            return e
          } else {return e}
        }),
      };
    
    default: return state;
  }
}

