import React, {Component} from 'react';
import {connect} from 'react-redux';

import {product} from '../actions/CardListAction';

class Card extends Component {

  render() {

    const {id, img, title, price, position, product} = this.props;
    return (
      <div className="product-item" >
        <img src={img} alt="Картинка товара"/>
        <div className="product-list">
          <h3>{title}</h3>
          <span className="price">{+price} &euro;</span>
          <button className="button" onClick={() => product(id)}>{position ? 'В корзину' : 'Удалить'}</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({CardListReducer}, {id}) => ({
  position: CardListReducer.prais_list[CardListReducer.prais_list.findIndex((e)=> (e.id === id))].position
})

const mapDispatchToProps = {
  product
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)