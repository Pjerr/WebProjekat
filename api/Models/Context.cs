using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class Context : DbContext
    {
        public DbSet<Lokacija> Lokacije { get; set; }
        public DbSet<Hrana> Hrana { get; set; }

        public DbSet<Hranilica> Hranilice { get; set; }

        public DbSet<Grad> Grad { get; set; }
        public Context(DbContextOptions options) : base(options)
        {

        }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<Lokacija>().HasOne(x=>x.Grad).WithMany(x=>x.Lokacije).OnDelete(DeleteBehavior.Cascade);
        //     modelBuilder.Entity<Hranilica>().HasOne(x=>x.Lokacija).WithMany(x=>x.Hranilice).OnDelete(DeleteBehavior.Cascade);
        // }
    }
}