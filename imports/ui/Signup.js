import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component{

  constructor(props){
    super(props);
    //state component to add custom states
    this.state = {
      count: this.props.count || 0,
      error: ''
    };
  }

  increment(){
    //function to setState data
    this.setState({
      error: ''
    });
  }

  onSubmit(e){
    e.preventDefault();

    //this.refs ---> son las refs que ofrece REACT para recuperar cualquier element del DOM más facilmente.
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({error: 'Password must be more than 8 characters long'});
    }

    //como el key y el value se llaman igual con ES6 podemos evitar crear el key: 'value' y ponerlo directamente... {email,password} en lugar de {email: email,password: password}
    Accounts.createUser({email,password}, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });

  }


  render(){
    return (
        <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Signup</h1>

            {this.state.error ? <p> {this.state.error} </p> : undefined}

            <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input type="email" ref="email" name="email" placeholder="Email"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Create Account</button>
            </form>

            <Link to="/">Already have an account?</Link>
          </div>
        </div>
    );
  }
}
