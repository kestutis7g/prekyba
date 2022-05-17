using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopAPI.Migrations
{
    public partial class ordersUpdate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "userId",
                table: "Orders",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "sum",
                table: "Orders",
                newName: "Sum");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Orders",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "discount",
                table: "Orders",
                newName: "Discount");

            migrationBuilder.RenameColumn(
                name: "date",
                table: "Orders",
                newName: "Date");

            migrationBuilder.RenameColumn(
                name: "comment",
                table: "Orders",
                newName: "Comment");

            migrationBuilder.RenameColumn(
                name: "number",
                table: "Orders",
                newName: "Number");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Orders",
                newName: "userId");

            migrationBuilder.RenameColumn(
                name: "Sum",
                table: "Orders",
                newName: "sum");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "Orders",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Discount",
                table: "Orders",
                newName: "discount");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Orders",
                newName: "date");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Orders",
                newName: "comment");

            migrationBuilder.RenameColumn(
                name: "Number",
                table: "Orders",
                newName: "number");
        }
    }
}
