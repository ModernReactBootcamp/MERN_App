import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Todo extends Component {
  render() {
    return (
      <tr>
        <td className={this.props.todo.todo_completed ? 'completed' : ''}>
          {this.props.todo.todo_description}
        </td>
        <td className={this.props.todo.todo_completed ? 'completed' : ''}>
          {this.props.todo.todo_responsible}
        </td>
        <td className={this.props.todo.todo_completed ? 'completed' : ''}>
          {this.props.todo.todo_priority}
        </td>
        <td>
          <Link to={'/edit/' + this.props.todo._id}>Edit</Link>
        </td>
      </tr>
    );
  }
}

export default Todo;
