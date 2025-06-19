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
            migrationBuilder.DropForeignKey(
                name: "FK_TasksPlay_TaskPlayParams_TaskPlayParamId",
                table: "TasksPlay");

            migrationBuilder.DropIndex(
                name: "IX_TasksPlay_TaskPlayParamId",
                table: "TasksPlay");

            migrationBuilder.DropIndex(
                name: "IX_TaskPlayParams_TaskPlayId",
                table: "TaskPlayParams");

            migrationBuilder.DropColumn(
                name: "TaskPlayParamId",
                table: "TasksPlay");

            migrationBuilder.AddColumn<bool>(
                name: "IsPrimary",
                table: "TaskPlayParams",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_TaskPlayParams_TaskPlayId_ParamKey",
                table: "TaskPlayParams",
                columns: new[] { "TaskPlayId", "ParamKey" },
                unique: true,
                filter: "[TaskPlayId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskPlayParams_TasksPlay_TaskPlayId",
                table: "TaskPlayParams",
                column: "TaskPlayId",
                principalTable: "TasksPlay",
                principalColumn: "IdTask",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskPlayParams_TasksPlay_TaskPlayId",
                table: "TaskPlayParams");

            migrationBuilder.DropIndex(
                name: "IX_TaskPlayParams_TaskPlayId_ParamKey",
                table: "TaskPlayParams");

            migrationBuilder.DropColumn(
                name: "IsPrimary",
                table: "TaskPlayParams");

            migrationBuilder.AddColumn<int>(
                name: "TaskPlayParamId",
                table: "TasksPlay",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TasksPlay_TaskPlayParamId",
                table: "TasksPlay",
                column: "TaskPlayParamId",
                unique: true,
                filter: "[TaskPlayParamId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_TaskPlayParams_TaskPlayId",
                table: "TaskPlayParams",
                column: "TaskPlayId",
                unique: true,
                filter: "[TaskPlayId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_TasksPlay_TaskPlayParams_TaskPlayParamId",
                table: "TasksPlay",
                column: "TaskPlayParamId",
                principalTable: "TaskPlayParams",
                principalColumn: "IdParam");
        }
    }
}
