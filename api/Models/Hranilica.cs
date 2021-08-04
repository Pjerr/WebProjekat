using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api.Models{
    [Table("hranilica")]
    public class Hranilica {
        [Key]
        [Column("id")]
        public int ID {get; set;}

        [Column("maxKapacitet")]
        public int MaxKapacitet {get; set;}

        [Column("trenutniKapacitet")]

        public int TrenutniKapacitet {get; set;}

        public virtual List<Hrana> Hrana {get; set;}

        [JsonIgnore]
        public Lokacija Lokacija {get; set;}
    }
}