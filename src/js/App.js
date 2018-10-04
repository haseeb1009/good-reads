import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from './store';
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import Home from './components/SearchBar';
import BookDetail from './components/BookDetail';
import BookList from './components/BookList';


const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact={true} path='/' render={() => (
            <div className="App">
              <Home />
            </div>
          )}
          />
          <Route exact={true} path='/bookdetail' render={() => (
            <div className="App">
              <BookDetail />
            </div>
          )}
          />
          <Route exact={true} path='/allbooks' render={() => (
            <div className="App">
              <BookList />
            </div>
          )}
          />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

const app = document.getElementById('app')
ReactDOM.render(<App />, app);

