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
    public class HranaController : ControllerBase
    {
        public Context Context {get; set;}
        public HranaController(Context context){
            Context = context;
        }

        [Route("GetAllHrana")]
        [HttpGet]
        public async Task<List<Hrana>> GetAllHrana(){
            return await Context.Hrana.ToListAsync();
        }

        [Route("UpisiHranu/{idHranilice}")]
        [HttpPost]
        public async Task<IActionResult> UpisiHranu(int idHranilice, [FromBody]Hrana hrana){
            var hranilica = await Context.Hranilice.FindAsync(idHranilice);
            hrana.Hranilica = hranilica;
            if(hranilica.MaxKapacitet >= hranilica.TrenutniKapacitet + hrana.TrenutnaKolicina)
            {
                var postojecaHrana = await Context.Hrana.Where(x=>x.Tip==hrana.Tip && x.Hranilica.ID==hrana.Hranilica.ID).FirstOrDefaultAsync();
                if(postojecaHrana==null) //ako ne postoji hrana u hranilici onda dodajem hranu u hranilicu
                {
                    // hrana.Hranilica = hranilica;
                    hranilica.TrenutniKapacitet += hrana.TrenutnaKolicina;
                    Context.Hrana.Add(hrana);
                }
                else {
                    postojecaHrana.TrenutnaKolicina+=hrana.TrenutnaKolicina;
                    hranilica.TrenutniKapacitet+=hrana.TrenutnaKolicina;
                    Context.Update<Hrana>(postojecaHrana);
                }
                Context.Update<Hranilica>(hranilica);
                await Context.SaveChangesAsync();
                return StatusCode(200, "Uspesno");
            }
            else 
                return StatusCode(400, "Nema mesta u hranilici");
        }

        [Route("IzmeniHranu")]
        [HttpPut]
        public async Task IzmeniHranu([FromBody] Hrana hrana){
            Context.Update<Hrana>(hrana);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiHranu/{idHrane}/{idHranilice}")]
        [HttpDelete]
        public async Task<IActionResult> ObrisiHranu(int idHrane, int idHranilice){
            var hranilica = await Context.Hranilice.FindAsync(idHranilice);
            var hrana = await Context.Hrana.FindAsync(idHrane);
            if(hranilica!=null && hrana !=null)
            {
                hranilica.TrenutniKapacitet-=hrana.TrenutnaKolicina;
                Context.Remove(hrana);
                await Context.SaveChangesAsync();
                return StatusCode(200,"Uspesno izbrisana hrana");
            }
            else return StatusCode(400,"Ne postoji ili hrana ili hranilica");
        }
    }
}
