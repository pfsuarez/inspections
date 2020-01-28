using Microsoft.EntityFrameworkCore.Migrations;

namespace InspectionsAPI.Migrations
{
    public partial class InitialData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Inspectors(Name) VALUES ('Inspector 1')");
            migrationBuilder.Sql("INSERT INTO Inspectors(Name) VALUES ('Inspector 2')");
            migrationBuilder.Sql("INSERT INTO Inspectors(Name) VALUES ('Inspector 3')");

            migrationBuilder.Sql("INSERT INTO Statuses(Name) VALUES ('New')");
            migrationBuilder.Sql("INSERT INTO Statuses(Name) VALUES ('In Progress')");
            migrationBuilder.Sql("INSERT INTO Statuses(Name) VALUES ('Done')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Inspectors");
            migrationBuilder.Sql("DELETE FROM Statuses");
        }
    }
}