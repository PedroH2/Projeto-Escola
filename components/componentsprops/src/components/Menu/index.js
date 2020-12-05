import React, {Component} from 'react'
import Logo from '../../assets/images/logo_escola.png'
import './index.css'
import {Link} from 'react-router-dom'

export default class Menu extends Component{
    render(){
        return(
            <nav className="fundo">
                <Link href="/">
                    <img className="Logo" src={Logo} alt = "Logo Escola"/>
                </Link>
                <Link className="itemMenu" to="/carometro">
                    Carômetro
                </Link>
                <Link className="itemMenu" to="/cadastrocurso">
                    Curso
                </Link>
                <Link className="itemMenu" to="/cadastroaluno">
                    Alunos
                </Link>
            </nav>
        )
    }
}