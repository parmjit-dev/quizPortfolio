import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  Route, Switch, Redirect, BrowserRouter,
} from 'react-router-dom';
import SignInAndUp from './pages/sign/sign.component';
import Header from './components/header/header.component';
import QuizPage from './pages/createQuiz/createQuiz.page';
import DashBoard from './pages/dashboard/dashboard.component';

const App = () =>
  // const handleLogin = (data) => {
  //   setUserAuth({
  //     login: true,
  //     userData: data,
  //   });
  // };
  // useEffect(async () => { // runs right after the first render
  //     const usersData = await axios('https://jsonplaceholder.typicode.com/users');
  //     // console.log(users.data);
  //     this.setState({ users: usersData.data });
  //     console.log(this.dogs)
  //   })
  // const changeDog = shuffle(dog);
  (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" />
        <Route path="/signin" component={SignInAndUp} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/about" />
        <Route path="/quiz" component={QuizPage} />
      </Switch>
    </BrowserRouter>

  );
export default App;
