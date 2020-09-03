import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { CardList } from './components/card-list/card-list.component';
// import {setCurrentUser} from './redux/user/user.action'
// import {connect} from 'react-redux'
// import SignInAndUp from './pages/sign/sign.component';
import {
  Route, Switch, Redirect, BrowserRouter,
} from 'react-router-dom';
import Header from './components/header/header.component';
// import CreateQuestion from './components/create-form/create-form.component';
// import Header from './components/header/header.component';
import quizPage from './pages/createQuiz/createQuiz.page';
const App = () => {
  const users = [];
  // useEffect(async () => { // runs right after the first render
  //     const usersData = await axios('https://jsonplaceholder.typicode.com/users');
  //     // console.log(users.data);
  //     this.setState({ users: usersData.data });
  //     console.log(this.dogs)
  //   })
  // const changeDog = shuffle(dog);
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" />
          <Route path="/signin" />
          <Route path="/dashboard" />
          <Route path="/about" />
          <Route path="/quiz" component={quizPage}/>
        </Switch>
      </BrowserRouter>

    </div>

  );
};

export default App;