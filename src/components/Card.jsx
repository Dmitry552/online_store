import React, {Component} from 'react';
import {connect} from 'react-redux';

import {product, change_quantity} from '../actions/CardListAction';

class Card extends Component {

  render() {

    const {id, img, title, price, position, product, quantity, change_quantity} = this.props;
    return (
      <div className="product-item" >
        <img src={img} alt="Картинка товара"/>
        <div className="product-list">
          <h3>{title}</h3>
          <span className="price">{+price} &#36;</span>
          {!position ?
            <div className="quantity_of_goods">
              <button className="decrease" onClick={()=>(change_quantity(id, 'decrement'))}>-</button>
              <input className='Id' max="50" min="1" id='{id}' type="number" value={quantity} onChange={(e) => change_quantity(id, '', e.target.value)}/>
              <button className="increase" onClick={()=>(change_quantity(id, 'increment'))}>+</button>
            </div> 
            : ''
          }
          
          <button className="button" onClick={() => product(id)}>{position ? 'В корзину' : 'Удалить'}</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({CardListReducer}, {id}) => ({
  position: CardListReducer.prais_list.filter((e)=>(e.id === id))[0].position,
  quantity: CardListReducer.quantity.filter((e)=>(e.id === id))[0].quantity

})

const mapDispatchToProps = {
  product,
  change_quantity
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)