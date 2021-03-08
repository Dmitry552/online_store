import React, {Component} from 'react';
import {connect} from 'react-redux';
import List from './List';

import {Total} from '../actions/CardListAction';

class Basket extends Component {

  componentDidMount() {
    const {Total} = this.props;
    Total();
  }

  componentDidUpdate() {
    const {Total} = this.props;
    Total();
  }

  render() {

    const {card_list, total} = this.props;

    return (
      <div className="wrapper">
        <div className="conteiner">
          <div className="card-list">
            {card_list.length > 0 ? card_list.map((list) => (
              <List 
                key={list.id}
                id={list.id}
                title={list.title}
                img={list.img}
                price={list.price}
                quantity={list.quantity}
                total={list.total}
                discount={list.discount}
              />
            )) : <h3>Корзина пуста</h3>}
            {card_list.length > 0 ? 
              <div className="Buy">
                <div className="purchase">
                  <div className="full_cost"><p>{total}</p><i className="fas fa-euro-sign"/></div>
                </div>
              </div>
            : ''}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({CardListReducer}, ) => ({
  card_list: CardListReducer.card,
  total: CardListReducer.total
})

const mapDispatchToProps = {
  Total
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)