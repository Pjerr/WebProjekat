using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api.Models{

    [Table("lokacija")]
    public class Lokacija{
        [Key]
        [Column("id")]
        public int ID {get; set;}

        [Column("maxKapacitet")]
        public int MaxKapacitet {get; set;}

        [Column("trenutniKapacitet")]

        public int TrenutniKapacitet {get; set;}

        [Column("nazivLokacije")]
        public string NazivLokacije {get; set;}

        public virtual List<Hranilica> Hranilice {get; set;}

        [JsonIgnore]
        public Grad Grad {get; set;}
    }
}