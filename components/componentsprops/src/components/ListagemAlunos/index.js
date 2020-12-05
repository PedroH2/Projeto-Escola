import React, {Component} from 'react'
import './index.css'
import LinhaAluno from '../LinhaAluno'
import Footer from '../Footer/index'


const dadosAlunos = [];

export default class ListagemAlunos extends Component{
    constructor(props){
        super(props);
        this.state={
            dadosAlunos: []
            };
        }
    
    componentDidMount(){
        const apiUrl = "http://localhost:5000/api/aluno";

        fetch(apiUrl)
        .then( res => res.json())
        .then(
            (result) => {
                 this.setState({ dadosAlunos: result
                });
                console.log("buscaAlunos: " + result);
            },
        (error) => {
        this.setState({error});
        })      
    }
    render(){

        const {dadosAlunos} = this.state;
        return(
            <div className="listagem">
                <h1 className="tituloListagem">Listagem de Alunos</h1>
                    <table className="listaAlunos" id="tbListaAlunos">
                        <thead>
                            <tr className="cabecTabela">
                                <th className="tabTituloRa">Ra</th>
                                <th className="tabTituloNome">Nome</th>
                                <th className="tabTituloCurso">Curso</th>
                            </tr>
                        </thead>
                        {dadosAlunos.map((aluno)=> <LinhaAluno ra={aluno.ra} nome={aluno.nome} codCurso={aluno.codCurso}/>)}
                    </table>
                      <Footer/> 
            </div>
        )
    }
}