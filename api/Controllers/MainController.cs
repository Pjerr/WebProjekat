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
        public Context Context {get; set;}
        public MainController(Context context){
            Context = context;
        }

        [Route("GetGrad")]
        [HttpGet]
        public async Task<List<Grad>> GetGradovi(){
            return await Context.Grad.Include(p=>p.Lokacije).ThenInclude(h=>h.Hranilice).ThenInclude(c=>c.Hrana).ToListAsync();
        }

        [Route("UpisiGrad")]
        [HttpPost]
        public async Task UpisiGrad([FromBody]Grad grad){
            Context.Grad.Add(grad);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniGrad")]
        [HttpPut]
        public async Task IzmeniGrad([FromBody]Grad grad){
            Context.Update<Grad>(grad);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiGrad")]
        [HttpDelete]

        public async Task IzbrisiGrad(int id){
            var grad = await Context.FindAsync<Grad>(id);
            Context.Remove(grad);
            await Context.SaveChangesAsync();
        }
    }
}
