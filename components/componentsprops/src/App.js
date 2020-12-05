import React, { Component } from 'react';
import Menu from './components/Menu';
import {BrowserRouter} from 'react-router-dom'
import Rotas from './Rotas'
import Footer from './components/Footer';
class App extends Component {
      constructor(props) {
          super(props);
          this.novoAluno = [];
          this.state = {};
      }
  render() {
  return (
      <div>
        <BrowserRouter>
          <Menu />
          <Rotas/>
          <Footer />
        </BrowserRouter>
      </div>
    )
  }
}
export default App;