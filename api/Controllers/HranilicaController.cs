using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HranilicaController : ControllerBase
    {
        public Context Context {get; set;}
        public HranilicaController(Context context){
            Context = context;
        }

        [Route("GetAllHranilice")]
        [HttpGet]
        public async Task<List<Hranilica>> GetAllHranilice(){
            return await Context.Hranilice.Include(p=>p.Hrana).ToListAsync();
        }

        [Route("UpisiHranilicu/{idLokacije}")]
        [HttpPost]
        public async Task UpisiHranilicu(int idLokacije, [FromBody]Hranilica hranilica){
            var lokacija = await Context.Lokacije.FindAsync(idLokacije);
            hranilica.Lokacija = lokacija;
            Context.Hranilice.Add(hranilica);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniHranilicu")]
        [HttpPut]
        public async Task IzmeniHranilicu([FromBody] Hranilica hranilica){
            Context.Update<Hranilica>(hranilica);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiHranilicu/{idHranilice}")]
        [HttpDelete]
        public async Task ObrisiHranilicu(int idHranilice){
            var hranilica = await Context.FindAsync<Hranilica>(idHranilice);
            Context.Remove(hranilica);
            await Context.SaveChangesAsync();
        }
    }
}
