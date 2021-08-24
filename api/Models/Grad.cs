using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models{

    [Table("grad")]
    public class Grad{

        [Key]
        [Column("id")]
        [DataType("int")]
        public int ID {get; set;}

        [Column("naziv")]
        [DataType("nvarchar255")]
        [MaxLength(255)]
        public string Naziv {get; set;}

        public virtual List<Lokacija> Lokacije {get; set;}
    }
}