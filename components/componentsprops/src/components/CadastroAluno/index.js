
import React, { Component } from 'react';
import './CadastroALuno.css';


const apiUrl = 'http://localhost:5000/api/aluno';
const apiCur = 'http://localhost:5000/api/curso';

const stateInicial = {
    aluno: { ra: '', nome: '', codCurso: 0 },
    curso: { periodo: "", nomeCurso: '', codCurso: 0 },
    dadosAlunos: [],
    dadosCursos: []
}
const cores = [ 
        { 'id': 1, 'cor': 'amarelo' },
        {id: 2, 'cor': 'vermelho'},
        {id: 3, 'cor': 'azul'},
        {id: 4, 'cor': 'verde'}
        ];

export default class CadastroAluno extends Component{

    state = {...stateInicial };
    componentDidMount() {

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        dadosAlunos: result
                    });
                    console.log("Função didMount:" + result);
                });
        fetch(apiCur)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        dadosCursos: result                     
                    });        
                    console.log("Função didMount:" + result);        
            },
                (error) => {
                    this.setState({ error });
                }
            )
    }

    limpar() {
        this.setState({ aluno: stateInicial.aluno });
    }
    salvar() {
        const aluno = this.state.aluno;
        aluno.codCurso = Number(aluno.codCurso);
        const metodo = aluno.id ? 'put' : 'post';
        const url = aluno.id ? `${apiUrl}/${aluno.id}` : apiUrl;

        fetch(url, {
                method: metodo,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //body: JSON.stringify({"ra": "12345", "nome": "Teste", "codCurso": 11})
                body: JSON.stringify(aluno)
            })
            .then(
                resp => {
                    //console.log(resp.json());
                    resp.json().then((data) => {
                        console.log(data);
                        const listaAlunos = this.getListaAtualizada(data);
                        this.setState({ aluno: stateInicial.aluno, dadosAlunos: listaAlunos });
                    })
                })
    }
    getListaAtualizada(aluno, add = true) {
        const lista = this.state.dadosAlunos.filter(a => a.id !== aluno.id);
        if (add) lista.unshift(aluno);
        return lista;
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const aluno = {...this.state.aluno };
        //usar o atributo NAME do input identificar o campo a ser atualizado
        aluno[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ aluno });
    }

    renderForm() {
        return(
        <div className="inclui-container">

        <label> RA: </label>
        <input
            type="text"
            id="ra"        
            placeholder="RA do aluno"
            className="form-input"
            name="ra"
            value={this.state.aluno.ra}
            onChange={ e => this.atualizaCampo(e)}
        />
        <label> Nome: </label>
        <input
            type="text"
            id="nome"
            placeholder="Nome do aluno"
            className="form-input"
            name="nome"
            value={this.state.aluno.nome}
            onChange={ e => this.atualizaCampo(e)}
        />
        <label> Código do Curso: </label>
        <select>      
        {this.state.dadosCursos.map(
        (curso) =>    
        <option  key={curso.codCurso} value={curso.nomeCurso} >{curso.nomeCurso}</option>
        )}
        </select>
        <label>Seleção de cores: </label>
            <select>

            {cores.map((cor) =><option key={cor.id}>{cor.cor}</option>)}
            
            </select>
    

        <button className="btnSalvar"
            onClick={e => this.salvar(e)} >
                Salvar
        </button>
        <button className="btnCancelar"
            onClick={e => this.limpar(e)} >
                Cancelar
        </button>
    </div>
    )
}
renderTable() {
    return (
        <div className="listagem">
            <table className="listaAlunos" id="tblListaAlunos">
                <thead>
                    <tr className="cabecTabela">
                        <th className="tabTituloRa">Ra</th>
                        <th className="tabTituloNome">Nome</th>
                        <th className="tabTituloCurso">Curso</th>
                        <th className="tabTituloCurso"> </th>
                        <th className="tabTituloCurso"> </th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.dadosAlunos.map(
                        (aluno) =>
                            <tr key={aluno.id}>
                                <td>{aluno.ra}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.codCurso}</td>
                                <td>
                                    <button onClick={() => this.carregar(aluno)} >
                                        Altera
                                    </button>
                                    </td>
                                    <td>
    
                                    <button onClick={() => this.remover(aluno)} >
                                        Remove
                                    </button>
                                    </td>
                                    </tr>
                                )}
                        </tbody>

                    </table>
                </div>
        )
    }
    carregar(aluno) {
        this.setState({ aluno })
    }

    remover(aluno) {
        //console.log("ID: " + aluno.id);
    const url = apiUrl+"/"+aluno.id;

    if (window.confirm("Confirma remoção do aluno: " + aluno.ra)) {
        console.log("entrou no confirm");
        fetch(url, { method: 'delete' })
            .then(resp => {
                const lista = this.getListaAtualizada(aluno, false)
                this.setState({ dadosAlunos: lista });
            });
        }
}
    render() {
        return (
            <div className='corpo'>
                <h1 className="tituloCadastro">Cadastro de Alunos</h1>
                {this.renderForm()}
                
                {this.renderTable()}
            </div>
        )
    }
}