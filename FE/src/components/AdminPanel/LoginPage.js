import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginError, receiveLogin} from '../../redux/actions';

class LoginPage extends Component {

  handleClick(e) {
    
    const username = this.refs.username.value;
    const password  = this.refs.password.value;
    console.log(username, password);
    const user = username.trim();
    const pass = password.trim();
    const payload = {
      user,
      pass
    }
    this.props.receiveLogin(payload);
    
  }

  render() {
    console.log(this.props);
    return (
      <div className="login">
        <label>
          username:
          <input
            type="text"
            ref='username'
            name="username"
            id="username"
          />
        </label>
        <br />
        <br />
        <label>
          password:
          <input
            type="password"
            ref="password"
            name="password"
            id="password"
          />
        </label>
        <br />
        <br />
        <button
          name="submit"
          type="button"
          onClick={(e) =>
            this.handleClick(e)
          }>
          Submit
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  receiveLogin: (payload) => dispatch(receiveLogin(payload)),
  loginError: (payload)=> dispatch(loginError(payload)),
});

LoginPage.propTypes = {
  loginUser: PropTypes.func,
  requestLogin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
