import { useContext } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import  { BackgroundContext } from './contexts/backgroundContext';
import Search from './pages/search/Search';
import Weather from './pages/weather/Weather';

function App() {


  const {backgroundURL} = useContext(BackgroundContext);

  return (
    <Router>
        <div className="App">
          <img className="App-Background" src={backgroundURL} alt="background" />
          <div className="App-Content">
          <Header />
          <div className="App-Body">
            <Switch>
              {/* <Route path="/onboard">
                <Onboard />
              </Route>
              <Route path="/login">
                <Login />
              </Route> */}
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/">
                <Weather />
              </Route>
            </Switch>
          </div>
          <Footer />
        </div>
        </div>
    </Router>
  );
}

export default App;
