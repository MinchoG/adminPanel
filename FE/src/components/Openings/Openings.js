import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Openings.less';

import { fetchOpenings, fetchOpeningsById } from '../../redux/actions';

class Openings extends Component {
  // constructor(props) {
  //   console.log(props);
  //   super(props);

  //   this.state = {
  //     openings: [],
  //     active: null,
  //     id: this.extractId(props.match.params),
  //   };
  // }

  // componentDidMount() {
  //   this.updateState(this.state.id);
  // }

    componentWillReceiveProps(props) {
    if (props.location.pathname !== this.props.location.pathname) {
      this.props.fetchOpeningsById(this.extractId(props.match.params));
      
    }
  }

  extractId(params) {
    if ('id' in params) {
      return parseInt(params.id);
    }
    return null;
  }

 

  componentDidMount() {
    const careerId = this.extractId(this.props.match.params);
    if (careerId) {
      console.log('fetching shit');
      this.props.fetchOpeningsById(careerId)
    } else {
      this.props.fetchOpenings();
    }
  }

  render() {
    
    return (
      <section className="Openings">
        <h2>Hiring</h2>
        <ul>
          { this.props.openings.data
            ? (this.props.openings.data.map(opening => {
              if (opening.id === this.props.openings.id) {
              console.log('I AM IN THE TRUTH case');
              return (
                <li className="active" key={opening.id}>
                  <Link to="/careers">{opening.title}</Link>
                  <span>{opening.description}</span>
                </li>
              );
              }
              console.log('I AM IN THE FALSE case');
              return (
                <li key={opening.id}>
                <Link to={`/careers/${opening.id}`}>{opening.title}</Link>
              </li>
              );
              }))
              : ''
          }
        </ul>
        
        { 
          this.props.openings.id 
          ? <span>{this.props.openings.active[0] ? this.props.openings.active[0].description : ''}</span> 
          : ''
          }
      </section>
    );
  }
}

const mapStateToProps = state => ({
  openings: state.openings
});

const mapDispatchToProps = dispatch => ({
  fetchOpenings: payload => dispatch(fetchOpenings(payload)),
  fetchOpeningsById: payload => dispatch(fetchOpeningsById(payload))
});

Openings.propTypes = {
  fetchOpenings: PropTypes.func,
  fetchOpeningsById: PropTypes.func,
  openings: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Openings);
