import React, { Component } from 'react';
import axios from 'axios';
import Todo from './Todo';

class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount = () => {
    axios
      .get('/todos/')
      .then(res => {
        this.setState({
          todos: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidUpdate = () => {
    axios
      .get('/todos/')
      .then(res => {
        this.setState({
          todos: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  todoList = () => {
    return this.state.todos.map((todo, i) => {
      return <Todo todo={todo} key={i} />;
    });
  };

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className='table table-striped' style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}

export default TodosList;
