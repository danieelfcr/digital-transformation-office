using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DataServices.Migrations
{
    /// <inheritdoc />
    public partial class SeedUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "IsAdmin", "Name", "Password" },
                values: new object[,]
                {
                    { 1, "admin@dto.com", true, "Admin", "$2a$11$Aee9b5mUX9sqI0oRxQeFuuIZPmK8tOSXttqWW/0CTyvnBqxIi4ch2" },
                    { 2, "daniel@dto.com", false, "Daniel", "$2a$11$FMc3Rhe6JZacxu/VIUGNMOGK1HhH21OlgTSYQ7O1RWy1LjzB1Tt8W" },
                    { 3, "hector@dto.com", false, "Hector", "$2a$11$uY3qXlcB55QzSnj/q/ya/.3MhN9vhQWSUp4sZ1C67DPyEb/MUITZ." }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
