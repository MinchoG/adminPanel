import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
fetchAbout
} from '../../redux/actions'
import "./About.less";

class About extends Component {

  componentDidMount() {
    this.props.fetchAbout();
  }

  render() {
    return (
      <section className="About">
        <h2>About us</h2>
        {this.props.about.data.map(v => (<p key={v.id}>{v.description}</p>))}
        <img src={`http://localhost:3001/images/${this.props.about.image}`} alt="big fat globe" />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  about: state.about
});

const mapDispatchToProps = dispatch => ({
  fetchAbout: (payload) => dispatch(fetchAbout(payload)),
})

About.propTypes = {
  fetchAbout: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (About);
