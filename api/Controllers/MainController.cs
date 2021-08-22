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
    public class MainController : ControllerBase
    {
        public Context Context { get; set; }
        public MainController(Context context)
        {
            Context = context;
        }

        [Route("GetAllGradovi")]
        [HttpGet]
        public async Task<List<Grad>> GetGradovi()
        {
            return await Context.Grad.Include(p => p.Lokacije).ThenInclude(h => h.Hranilice).ThenInclude(c => c.Hrana).ToListAsync();
        }

        [Route("UpisiGrad")]
        [HttpPost]
        public async Task UpisiGrad([FromBody] Grad grad)
        {
            Context.Grad.Add(grad);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniGrad")]
        [HttpPut]
        public async Task IzmeniGrad([FromBody] Grad grad)
        {
            Context.Update<Grad>(grad);
            await Context.SaveChangesAsync();
        }

        //doraditi
        [Route("IzbrisiGrad/{idGrada}")]
        [HttpDelete]

        public async Task IzbrisiGrad(int idGrada)
        {
            var grad = await Context.Grad.Include(p => p.Lokacije).ThenInclude(h => h.Hranilice).ThenInclude(c => c.Hrana).Where(x=>x.ID==idGrada).FirstOrDefaultAsync();
            foreach (var lokacija in grad.Lokacije)
            {
                foreach (var hranilica in lokacija.Hranilice)
                {
                    foreach (var hrana in hranilica.Hrana)
                    {
                        Context.Remove(hrana);
                    }
                    Context.Remove(hranilica);
                }
                Context.Remove(lokacija);
            }
            Context.Remove(grad);
            await Context.SaveChangesAsync();
        }

        [Route("PsiJedu/{idGrada}")]
        [HttpPut]
        public async Task<IActionResult> Jedi(int idGrada)
        {
            var grad = await Context.Grad.Include(p => p.Lokacije).ThenInclude(h => h.Hranilice).ThenInclude(c => c.Hrana).Where(x=>x.ID==idGrada).FirstOrDefaultAsync();

            // var sveHranilice = await Context.Hranilice.Include(x=>x.Hrana).ToListAsync();

            foreach(var lokacija in grad.Lokacije){
                foreach(var hranilica in lokacija.Hranilice){
                    foreach(var hrana in hranilica.Hrana)
                    {
                        Random rand = new Random();
                        if (hrana.TrenutnaKolicina > 0)
                            {
                                var pojedenaHrana = rand.Next(1, hrana.TrenutnaKolicina / 2);
                                hrana.TrenutnaKolicina -= pojedenaHrana;
                                hranilica.TrenutniKapacitet -= pojedenaHrana;
                            }
                    }
                }
            }

            // foreach (var hranilica in sveHranilice)
            // {

            //     foreach(var hrana in hranilica.Hrana)
            //     {
            //     Random rand = new Random();
            //     if (hrana.TrenutnaKolicina > 0)
            //         {
            //             var pojedenaHrana = rand.Next(1, hrana.TrenutnaKolicina / 2);
            //             hrana.TrenutnaKolicina -= pojedenaHrana;
            //             hranilica.TrenutniKapacitet -= pojedenaHrana;
            //         }
            //     }
            // }
            await Context.SaveChangesAsync();
            return StatusCode(200, "uspesno pojedena hrana");
        }
    }
}
