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
        public async Task UpisiHranu(int idHranilice, [FromBody]Hrana hrana){
            var hranilica = await Context.Hranilice.FindAsync(idHranilice);
            hrana.Hranilica = hranilica;
            Context.Hrana.Add(hrana);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniHranu")]
        [HttpPut]
        public async Task IzmeniHranu([FromBody] Hrana hrana){
            Context.Update<Hrana>(hrana);
            await Context.SaveChangesAsync();
        }

        [Route("ObrisiHranu/{idHrane}")]
        [HttpDelete]
        public async Task ObrisiHranu(int idHrane){
            var hrana = await Context.Hrana.FindAsync(idHrane);
            Context.Remove(hrana);
            await Context.SaveChangesAsync();
        }
    }
}
