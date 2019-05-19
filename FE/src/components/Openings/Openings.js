import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Api from '../helpers/Api';
import './Openings.less';

class Openings extends Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.state = {
      openings: [],
      active: null,
      id: this.extractId(props.match.params),
    };
  }
  
  componentDidMount() {
    this.updateState(this.state.id);
  }

  componentWillReceiveProps(props) {
    if (props.location.pathname !== this.props.location.pathname) {
      this.updateState(this.extractId(props.match.params));
    }
  }

  extractId(params) {
    if ('id' in params) {
      return parseInt(params.id);
    }
    return null;
  }

  async updateState(id) {
    const newState = { id, active: null };
    newState.openings = await Api.getOpenings();
    if (id) {
      newState.active = await Api.getOpening(id);
    }

    this.setState(newState);
  }

  render() {
    return (
      <section className="Openings">
        <h2>Hiring</h2>
        <ul>
          {this.state.openings.map((opening) => {
            if (opening.id === this.state.id) {
              return (
                <li className="active">
                  <Link to="/careers">{opening.title}</Link>
                  <span>{this.state.active.description}</span>
                </li>
              );
            }

            return (
              <li>
                <Link to={`/careers/${opening.id}`}>{opening.title}</Link>
              </li>
            );
          })}
        </ul>
        {this.state.active ? <span>{this.state.active.description}</span> : ''}
      </section>
    );
  }
}

export default Openings;
