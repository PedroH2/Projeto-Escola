import React, {Component} from 'react'

const apiUrl = 'http://localhost:5000/api/curso'
const stateInicial = { 
    curso: {id:'', nomeCurso: '', codCurso: 0},
    dadosCurso:[]
}

export default class CadastroCurso extends Component{

    state = {...stateInicial};

    componentDidMount(){
        fetch(apiUrl)
        .then( res => res.json())
        .then(
            (result) => {
                 this.setState({ dadosCurso: result
                });
                console.log("Função didMount: " + result);
            },
        (error) => {
        this.setState({error});
        })      
    }

    limpar(){
        this.setState({curso: stateInicial.curso});
    }
    salvar(){
        const curso = this.state.curso;
        curso.codCurso = Number(curso.codCurso);
        const metodo = curso.id ? 'put' : 'post';
        const url = curso.id ? `${apiUrl}/${curso.id}`: apiUrl;

        fetch(url, {
            method: metodo,
            headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(curso)
        })
        .then(
            resp=>{
                resp.json().then((data)=>{
                    console.log(data);
                    const listaCursos = this.getListaAtualizada(data);
                    this.setState({ curso: stateInicial.curso, dadosCurso: listaCursos});
                })
            }
        )
    }
    getListaAtualizada(curso){
        const lista = this.state.dadosCurso.filter(a=> a.id !== curso.id);
        lista.unshift(curso)
        return lista;
    }
    atualizaCampo(event){
        const curso = {...this.state.curso};
        curso[event.target.name] = event.target.value;
        this.setState({curso});
    }
    renderForm(){
        return(
            <div className="inclui-container">
                <label> Periodo: </label>
                    <input type="text" id="periodo" placeholder="periodo do Curso" className="form-input" name="periodo" value = {this.state.curso.periodo} onChange={e=> this.atualizaCampo(e)}/>
                <label> Nome: </label>
                    <input type="text" id="nomeCurso" placeholder="Nome do Curso" className="form-input" name="nomeCurso" value = {this.state.curso.nomeCurso} onChange={e=>this.atualizaCampo(e)}/>
                <label> Código do Curso: </label>
                    <input type="number" id="codCurso" placeholder="0" className="form-input" name="codCurso" value = {this.state.curso.codCurso} onChange={e=>this.atualizaCampo(e)}/>
                <button className="btnSalvar" onClick={e=> this.salvar(e)}>Salvar</button>
                <button className="btnCancelar" onClick={e=> this.limpar(e)}>Cancelar</button>
            </div>
        )
    }
    renderTable() {
        return (
            <div className="listagem">
                <table className="listaAlunos" id="tblListaAlunos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloRa">Periodo</th>
                            <th className="tabTituloNome">Nome do Curso</th>
                            <th className="tabTituloCurso">codigo do Curso</th>
                            <th className="tabTituloCurso"> </th>
                                    <th className="tabTituloCurso"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.dadosCurso.map((curso) =>
                            <tr key={curso.id}>
                                <td>{curso.periodo}</td>
                                <td>{curso.nomeCurso}</td>
                                <td>{curso.codCurso}</td>
                                <td>
                            <button onClick={() => this.carregar(curso)} >Altera </button>
                                </td>
                                <td>
                            <button onClick={() => this.remover(curso)} >Remove </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
        carregar(curso) {
        this.setState({ curso })
        }
        remover(curso) {
            const url = apiUrl+"/"+curso.id;
            if (window.confirm("Confirma remoção do curso: " + curso.periodo)) {
            console.log("entrou no confirm");
            fetch(url, { method: 'delete' })
            .then(resp => {
            const lista = this.getListaAtualizada(curso, false)
            this.setState({ dadosCurso: lista });
            });
        }
    }
    render() {
        return (
        <div className='corpo'>
        <h1 className="tituloCadastro">Cadastro de Cursos</h1>
        {this.renderForm()}
        {this.renderTable()}
        </div>
        )
        }
}