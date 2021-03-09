import React, {Component} from 'react';
import {connect} from 'react-redux';

import {change_quantity, Delete} from '../actions/CardListAction';

class List extends Component {

  _hendlerDeleteProductCard = (id) => {
    const {Delete} = this.props;
    Delete(id);
  }

  render() {
    const {id, title, img, price, quantity, total, change_quantity, discount} = this.props;
    
    return (
      <div className="cart"> 
        <div className="img">
          <img src={img} alt="Название товара"/>
        </div>
        <div className="text">
          <h1>{title}</h1>
          <h1>{price} &#36;</h1>
        </div>
        <div className="kakto_nazv">
          <div className="renouncement" onClick={()=>(this._hendlerDeleteProductCard(id))}><i className="far fa-trash-alt"></i></div>
          <div className="koll">
            <div className="quantity_of_goods">
              <button className="decrease" onClick={()=>(change_quantity(id, 'decrement'))}>-</button>
              <input className='Id' max="50" min="1" id='{id}' type="number" value={quantity} onChange={(e) => change_quantity(id, '', e.target.value)}/>
              <button className="increase" onClick={()=>(change_quantity(id, 'increment'))}>+</button>
            </div>
            <div className="price">
              <p>{total} &#36;</p>
              {discount ?
                <span>( - {discount} &#36; )</span>
                : ''
              }
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({CardListReducer}, {id}) => ({
  card: CardListReducer.card,
  quantity: CardListReducer.quantity.filter((e)=>(e.id === id))[0].quantity
})

const mapDispatchToProps = {
  change_quantity,
  Delete
}

export default connect(mapStateToProps, mapDispatchToProps)(List)