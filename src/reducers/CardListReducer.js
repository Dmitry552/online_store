const initialStore = {
  prais_list: [],
  card: [],
  total: 0
}

export const CardListReducer = (state = initialStore, action) => {
  switch (action.type) {
    case 'ADD_PRAICE_LIST': 
      return {
        ...state,
        prais_list: action.paiload
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
        card: state.card.map((e)=>{
          if(e.id === action.paiload.id) {
            e.quantity = action.paiload.quantity
            e.discount = action.paiload.discount
            e.total = e.quantity * e.price - e.discount
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
          !(e.id === action.paiload)
        ))
      };
    
    default: return state;
  }
}

