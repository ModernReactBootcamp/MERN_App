import React, { Component } from 'react';
import axios from 'axios';

class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_desc: '',
      todo_resp: '',
      todo_priority: '',
      todo_completed: false
    };
  }

  onChangeTodoDesc = e => {
    this.setState({
      todo_desc: e.target.value
    });
  };

  onChangeTodoResp = e => {
    this.setState({
      todo_resp: e.target.value
    });
  };

  onChangeTodoPriority = e => {
    this.setState({
      todo_priority: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    // TODO ADD TODO LIST TO BACKEND HERE

    console.log(
      `Submitted ${this.state.todo_desc}, ${this.state.todo_resp}, 
      ${this.state.todo_priority}, ${this.state.todo_completed}`
    );

    const newTodo = {
      todo_description: this.state.todo_desc,
      todo_responsible: this.state.todo_resp,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };

    axios.post('/todos/add', newTodo).then(res => {
      console.log(res.data);
    });

    this.setState({
      todo_desc: '',
      todo_resp: '',
      todo_priority: '',
      todo_completed: false
    });
  };

  render() {
    return (
      <div style={{ margintTop: 10 }}>
        <h3>Create New Todo</h3>
        <form action='' onSubmit={this.onSubmit}>
          <div className='form-group'>
            <label htmlFor=''>Description: </label>
            <input
              required
              type='text'
              className='form-control'
              value={this.state.todo_desc}
              onChange={this.onChangeTodoDesc}
            />
          </div>
          <div className='form-group'>
            <label htmlFor=''>Responsible: </label>
            <input
              required
              type='text'
              className='form-control'
              value={this.state.todo_resp}
              onChange={this.onChangeTodoResp}
            />
          </div>
          <div className='form-group'>
            <div className='form-check form-check-inline'>
              <input
                type='radio'
                className='form-check-input'
                id='pLow'
                value='Low'
                checked={this.state.todo_priority === 'Low'}
                onChange={this.onChangeTodoPriority}
              />
              <label htmlFor='' className='form-check-label'>
                Low
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                type='radio'
                className='form-check-input'
                id='pMedium'
                value='Medium'
                checked={this.state.todo_priority === 'Medium'}
                onChange={this.onChangeTodoPriority}
              />
              <label htmlFor='' className='form-check-label'>
                Medium
              </label>
            </div>
            <div className='form-check form-check-inline'>
              <input
                type='radio'
                className='form-check-input'
                id='pHigh'
                value='High'
                checked={this.state.todo_priority === 'High'}
                onChange={this.onChangeTodoPriority}
              />
              <label htmlFor='' className='form-check-label'>
                High
              </label>
            </div>
          </div>
          <div className='form-group'>
            <input
              type='submit'
              value='Create Todo'
              className='btn btn-primary'
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTodo;
