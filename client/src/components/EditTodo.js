import React, { Component } from 'react';
import axios from 'axios';

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_desc: '',
      todo_resp: '',
      todo_priority: '',
      todo_completed: false
    };
  }

  componentDidMount = () => {
    axios
      .get('/todos/' + this.props.match.params.id)
      .then(res => {
        console.log('GHere' + res.data.todo_todo_priority);
        this.setState({
          todo_desc: res.data.todo_description,
          todo_resp: res.data.todo_responsible,
          todo_priority: res.data.todo_priority,
          todo_completed: res.data.todo_completed
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

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

  onChangeTodoComplete = e => {
    this.setState({
      todo_completed: !this.state.todo_completed
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const obj = {
      todo_description: this.state.todo_desc,
      todo_responsible: this.state.todo_resp,
      todo_priority: this.state.todo_priority,
      todo_completed: this.state.todo_completed
    };
    axios.post('/todos/update/' + this.props.match.params.id, obj).then(res => {
      console.log(res);
    });
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <h3>Edit Your Todo</h3>
        <form onSubmit={this.onSubmit}>
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
          <div className='form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='completedCheckbox'
              name='completedCheckbox'
              onChange={this.onChangeTodoComplete}
              checked={this.state.todo_completed}
              value={this.state.todo_completed}
            />
            <label className='form-check-label' htmlFor=''>
              Completed
            </label>
          </div>
          <div className='form-group'>
            <input type='submit' value='Update' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
}

export default EditTodo;
