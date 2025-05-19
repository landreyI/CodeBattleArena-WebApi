using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeBattleArena.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWorkTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateStartGame",
                table: "Sessions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TimePlay",
                table: "Sessions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishTask",
                table: "PlayersSession",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateStartGame",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "TimePlay",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "FinishTask",
                table: "PlayersSession");
        }
    }
}
