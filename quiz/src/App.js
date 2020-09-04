import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import SignInAndUp from './pages/sign.component';
import {
  Route, Switch, Redirect, BrowserRouter,
} from 'react-router-dom';
import Header from './components/header/header.component';
import QuizPage from './pages/createQuiz/createQuiz.page';

const App = () => {
  const [ userAuth, setUserAuth ] = useState(false);
  // useEffect(async () => { // runs right after the first render
  //     const usersData = await axios('https://jsonplaceholder.typicode.com/users');
  //     // console.log(users.data);
  //     this.setState({ users: usersData.data });
  //     console.log(this.dogs)
  //   })
  // const changeDog = shuffle(dog);
  return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" />
          <Route path="/signin" render={props => (<SignInAndUp  {...props } userAuth={ userAuth } />)}/>
          <Route path="/dashboard" />
          <Route path="/about" />
          <Route path="/quiz" render={ props => (<QuizPage { ...props } userAuth={ userAuth }/>)} />
        </Switch>
      </BrowserRouter>

  );
};

export default App;
