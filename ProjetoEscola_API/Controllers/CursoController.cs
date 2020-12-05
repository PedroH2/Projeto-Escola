using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ProjetoEscola_API.Data;
using ProjetoEscola_API.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace ProjetoEscola_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursoController : Controller
    {
        private readonly EscolaContext _context;
        public CursoController(EscolaContext context){
                _context = context;
                //constructor
        }
        [HttpGet]
        public ActionResult <List<Curso>> GetAll(){
            return _context.Curso.ToList();
        }
        [HttpGet("{CursoId}")]
        public ActionResult<List<Curso>> Get(int cursoId){
            try{
                var result = _context.Curso.Find(cursoId);
                if (result == null){
                    return NotFound();
                }
                    return Ok(result);
                }
            catch
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
        }
        [HttpPost]
        public async Task <ActionResult> post(Curso model){
            try{
                _context.Curso.Add(model);
                if (await _context.SaveChangesAsync() == 1){
                    return Created($"/api/curso/{model.codCurso}",model);
                }
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados.");
            }
            return BadRequest();
        }
        [HttpPut("{CursoId}")]
        public async Task<IActionResult> put(int CursoId, Curso dadosCursoAlt)
        {
            try {
        
            var result = await _context.Curso.FindAsync(CursoId);
            if (CursoId != result.Id){
                return BadRequest();
            }
                result.Id = dadosCursoAlt.Id;
                result.nomeCurso = dadosCursoAlt.nomeCurso;
                result.codCurso = dadosCursoAlt.codCurso;
                await _context.SaveChangesAsync();
                return Created($"/api/curso/{dadosCursoAlt.Id}", dadosCursoAlt);
            }
            catch{
            return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
        }
        [HttpDelete("{Curso}")]
        public async Task<ActionResult> delete(int CursoId)
        {
            try{
            //verifica se existe aluno a ser excluído
            var curso = await _context.Aluno.FindAsync(CursoId);
            if (curso == null){
            //método do EF
                return NotFound();
            }
            _context.Remove(curso);
            await _context.SaveChangesAsync();
                return NoContent();
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
            }
            // retorna BadRequest se não conseguiu deletar
            return BadRequest();
        }   
    }
}