import React,{ Component } from 'react';
import {BrowserRouter as Router,Route } from 'react-router-dom'
import Todos from './components/Todos'
import Header from './components/layout/Header'
import AddTodo from './components/addtodo'
import About from './components/pages/about'
import {v4 as uuid} from "uuid";
import axios from 'axios'
import './App.css';

class App extends Component {
  state = {
    todos: []
  }
  componentDidMount(){
     axios.get('http://127.0.0.1:8000/api/')
     .then(res => this.setState({todos:res.data}))
  }
  markComplete = (id) => {
    this.setState({ todos:this.state.todos.map(todo=>{
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    })});
  }
  deleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res =>    this.setState({todos:[...this.state.todos.filter(todo => todo.id !==id)]}));
  }
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos',{
      title,
      completed:false
    })
    .then(res => this.setState({todos:[...this.state.todos,res.data]}));
  }
  render(){
  
  return (
    <Router>
    <div className="App">
    <div className = "container">
    <Header/>
    <Route exact path='/' render = {props => (
      <React.Fragment>
       <AddTodo addTodo={this.addTodo}/>
    <Todos todos={this.state.todos} markComplete={this.markComplete} deleteTodo = {this.deleteTodo}/>
      </React.Fragment>
      )}/>
      <Route path="/about" component={About} />
   
    </div>
    </div>
    </Router>
  );
  }
}

export default App;
