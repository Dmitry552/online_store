import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Card from './Card';

import {add_product} from '../actions/CardListAction';


class CardList extends Component {

  componentDidMount() {
    const {add_product} = this.props;
    add_product();
  }

  render() {
    const {prais_list, indicator} = this.props;
    return (
      <div className="wrapper">
        <div className="head">
          <div className="head_shipping">
            <Link to='/basket'><button className="btn"><i className="fas fa-shopping-cart"></i></button></Link>
            {indicator ? 
              <div className="indicator">
                <span>{indicator}</span>
              </div>
            : ''}
          </div>
        </div>
        <div className="conteiner">
          {prais_list ? prais_list.map((item) => (
            <Card
              key={item.id}
              id = {item.id}
              img = {item.img}
              title = {item.title}
              price = {item.price}
            />
          )) : 'Loading...'}
        </div>
        
      </div>
    )
  }
}

const mapStateToProps = ({CardListReducer}) => ({
  prais_list: CardListReducer.prais_list,
  indicator: CardListReducer.card.length
})

const mapDispatchToProps = {
  add_product
}

export default connect(mapStateToProps, mapDispatchToProps)(CardList);