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
    public class LokacijaController : ControllerBase
    {
        public Context Context {get; set;}
        public LokacijaController(Context context){
            Context = context;
        }

        [Route("GetSveLokacije")]
        [HttpGet]
        public async Task<List<Lokacija>> GetAllLokacije(){
            return await Context.Lokacije.Include((p)=>p.Hranilice).ThenInclude(c=>c.Hrana).ToListAsync();
        }

        [Route("UpisiLokaciju/{idGrada}")]
        [HttpPost]
        public async Task UpisiLokaciju(int idGrada, [FromBody]Lokacija lok){
            var grad = await Context.Grad.FindAsync(idGrada);
            lok.Grad = grad;   
            Context.Lokacije.Add(lok);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniLokaciju")]
        [HttpPut]
        public async Task IzmeniLokaciju([FromBody] Lokacija lok){
            Context.Update<Lokacija>(lok);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiLokaciju/{idLokacije}")]
        [HttpDelete]
        public async Task IzbrisiLokaciju(int idLokacije)
        {
            var lokacija = await Context.Lokacije.FindAsync(idLokacije);
            Context.Remove(lokacija);
            await Context.SaveChangesAsync();
        }
    }
}
