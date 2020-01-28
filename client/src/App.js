import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import TodosList from './components/TodosList';
import EditTodo from './components/EditTodo';
import CreateTodo from './components/CreateTodo';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className='container'>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
              <Link to='/' className='navbar-brand'>
                MERN Stack Todo App
              </Link>
              <div className='nav-collapse'>
                <ul className='navbar-nav mr-auto'>
                  <li className='navbar-item'>
                    <Link to='/' className='nav-link'>
                      Todos
                    </Link>
                  </li>
                  <li className='navbar-item'>
                    <Link to='/create' className='nav-link'>
                      Create Todo
                    </Link>
                  </li>
                  {/* <li className="navbar"></li> */}
                </ul>
              </div>
            </nav>

            <Route path='/' exact component={TodosList} />
            <Route path='/edit/:id' component={EditTodo} />
            <Route path='/create' exact component={CreateTodo} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
