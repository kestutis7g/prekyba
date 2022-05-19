using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopAPI.Migrations
{
    public partial class OrderUpdate1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderNumber",
                table: "OrderItem",
                column: "OrderNumber");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_Order_OrderNumber",
                table: "OrderItem",
                column: "OrderNumber",
                principalTable: "Order",
                principalColumn: "Number",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_Order_OrderNumber",
                table: "OrderItem");

            migrationBuilder.DropIndex(
                name: "IX_OrderItem_OrderNumber",
                table: "OrderItem");
        }
    }
}
