import React, { useContext, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import {
  Route, Switch, Redirect, BrowserRouter,
} from 'react-router-dom';
import SignInAndUp from './pages/sign/sign.component';
import Header from './components/header/header.component';
import QuizPage from './pages/createQuiz/createQuiz.page';
import DashBoard from './pages/dashboard/dashboard.component';
import { store } from './store/store';

const App = () => {
  const globalState = useContext(store);
  console.log(globalState);
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
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" />
        <Route
          path="/signin"
          render={() => {
            if (!globalState.state.loggedIn) {
              return <SignInAndUp />;
            }
            return <DashBoard />;
          }}
        />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/about" />
        <Route
          path="/quiz"
          render={() => {
            if (!globalState.state.loggedIn) {
              return <Redirect to={{ pathname: '/signin' }} />;
            }
            return <QuizPage />;
          }}
        />
      </Switch>
    </BrowserRouter>

  );
};
export default App;
