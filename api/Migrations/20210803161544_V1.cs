using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "grad",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_grad", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "lokacija",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    maxKapacitet = table.Column<int>(type: "int", nullable: false),
                    trenutniKapacitet = table.Column<int>(type: "int", nullable: false),
                    nazivLokacije = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GradID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lokacija", x => x.id);
                    table.ForeignKey(
                        name: "FK_lokacija_grad_GradID",
                        column: x => x.GradID,
                        principalTable: "grad",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "hranilica",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    maxKapacitet = table.Column<int>(type: "int", nullable: false),
                    trenutniKapacitet = table.Column<int>(type: "int", nullable: false),
                    LokacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hranilica", x => x.id);
                    table.ForeignKey(
                        name: "FK_hranilica_lokacija_LokacijaID",
                        column: x => x.LokacijaID,
                        principalTable: "lokacija",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "hrana",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tip = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    trenutnaKolicina = table.Column<int>(type: "int", nullable: false),
                    HranilicaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hrana", x => x.id);
                    table.ForeignKey(
                        name: "FK_hrana_hranilica_HranilicaID",
                        column: x => x.HranilicaID,
                        principalTable: "hranilica",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_hrana_HranilicaID",
                table: "hrana",
                column: "HranilicaID");

            migrationBuilder.CreateIndex(
                name: "IX_hranilica_LokacijaID",
                table: "hranilica",
                column: "LokacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_lokacija_GradID",
                table: "lokacija",
                column: "GradID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "hrana");

            migrationBuilder.DropTable(
                name: "hranilica");

            migrationBuilder.DropTable(
                name: "lokacija");

            migrationBuilder.DropTable(
                name: "grad");
        }
    }
}
