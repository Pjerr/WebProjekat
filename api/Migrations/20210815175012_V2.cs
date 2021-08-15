using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_hranilica_lokacija_LokacijaID",
                table: "hranilica");

            migrationBuilder.DropForeignKey(
                name: "FK_lokacija_grad_GradID",
                table: "lokacija");

            migrationBuilder.AddForeignKey(
                name: "FK_hranilica_lokacija_LokacijaID",
                table: "hranilica",
                column: "LokacijaID",
                principalTable: "lokacija",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_lokacija_grad_GradID",
                table: "lokacija",
                column: "GradID",
                principalTable: "grad",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_hranilica_lokacija_LokacijaID",
                table: "hranilica");

            migrationBuilder.DropForeignKey(
                name: "FK_lokacija_grad_GradID",
                table: "lokacija");

            migrationBuilder.AddForeignKey(
                name: "FK_hranilica_lokacija_LokacijaID",
                table: "hranilica",
                column: "LokacijaID",
                principalTable: "lokacija",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_lokacija_grad_GradID",
                table: "lokacija",
                column: "GradID",
                principalTable: "grad",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
