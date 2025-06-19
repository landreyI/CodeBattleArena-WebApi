using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeBattleArena.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddActiveItemSetNull : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayerItems_AspNetUsers_IdPlayer",
                table: "PlayerItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerItems_Items_IdItem",
                table: "PlayerItems");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerItems_AspNetUsers_IdPlayer",
                table: "PlayerItems",
                column: "IdPlayer",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerItems_Items_IdItem",
                table: "PlayerItems",
                column: "IdItem",
                principalTable: "Items",
                principalColumn: "IdItem");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlayerItems_AspNetUsers_IdPlayer",
                table: "PlayerItems");

            migrationBuilder.DropForeignKey(
                name: "FK_PlayerItems_Items_IdItem",
                table: "PlayerItems");

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerItems_AspNetUsers_IdPlayer",
                table: "PlayerItems",
                column: "IdPlayer",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PlayerItems_Items_IdItem",
                table: "PlayerItems",
                column: "IdItem",
                principalTable: "Items",
                principalColumn: "IdItem",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
