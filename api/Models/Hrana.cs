using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api.Models{

    [Table("hrana")]
    public class Hrana{
        [Key]
        [Column("id")]
        public int ID {get; set;}

        [Column("tip")]
        public string Tip {get; set;}

        [Column("trenutnaKolicina")]
        public int TrenutnaKolicina {get; set;}

        [JsonIgnore]
        public Hranilica Hranilica {get; set;}
    }
}