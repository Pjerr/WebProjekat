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
        public async Task<IActionResult> UpisiHranilicu(int idLokacije, [FromBody]Hranilica hranilica){
            var lokacija = await Context.Lokacije.FindAsync(idLokacije);
            if(lokacija.TrenutniKapacitet + 1 <= lokacija.MaxKapacitet)
            {
                hranilica.Lokacija = lokacija;
                lokacija.TrenutniKapacitet++;
                Context.Hranilice.Add(hranilica);
                await Context.SaveChangesAsync();
                return StatusCode(200,"Uspesno dodata hranilica");
            }
            else return StatusCode(400, "Nema mesta u ovoj lokaciji");
        }

        [Route("IzmeniHranilicu")]
        [HttpPut]
        public async Task IzmeniHranilicu([FromBody] Hranilica hranilica){
            Context.Update<Hranilica>(hranilica);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiHranilicu/{idHranilice}/{idLokacije}")]
        [HttpDelete]
        public async Task<IActionResult> ObrisiHranilicu(int idHranilice, int idLokacije){
            //pre brisanja hranilice mora da uradim lokacija.TrenutniKapacitet--;
            var lokacija = await Context.Lokacije.FindAsync(idLokacije);
            var hranilica = await Context.FindAsync<Hranilica>(idHranilice);
            if(lokacija!=null && hranilica!=null)
            {
                lokacija.TrenutniKapacitet--;
                Context.Remove(hranilica);
                await Context.SaveChangesAsync();
                return StatusCode(200,"Uspesno obrisana hranilica");
            }
            else return StatusCode(400,"Ne postoji ili hranilica ili lokacija");
        }
    }
}
