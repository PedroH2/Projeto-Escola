
import React,{Component} from 'react'
import {Switch, Route, Redirect} from 'react-router'
import CadastroAluno from './components/CadastroAluno/index'
import CadastroCurso from './components/CadastroCurso'
import Carometro from './components/Carometro'

export default class Rotas extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={CadastroAluno}/>
                <Route exact path="/cadastrocurso" component={CadastroCurso}/>
                <Route exact path="/carometro" component={Carometro}/>
                <Redirect from='*' to='/' />
            </Switch>
        )
    }
}