using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeBattleArena.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTaskPlay : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Reward",
                table: "TasksPlay",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Experience",
                table: "TasksPlay",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Experience",
                table: "TasksPlay");

            migrationBuilder.AlterColumn<int>(
                name: "Reward",
                table: "TasksPlay",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
