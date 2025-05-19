﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CodeBattleArena.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdditionalInformation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Victories = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "InputData",
                columns: table => new
                {
                    IdInputData = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InputData", x => x.IdInputData);
                });

            migrationBuilder.CreateTable(
                name: "LangProgrammings",
                columns: table => new
                {
                    IdLang = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CodeNameLang = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    NameLang = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    IdCheckApi = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LangProgrammings", x => x.IdLang);
                });

            migrationBuilder.CreateTable(
                name: "Leagues",
                columns: table => new
                {
                    IdLeague = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    MinWins = table.Column<int>(type: "int", nullable: false),
                    MaxWins = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leagues", x => x.IdLeague);
                });

            migrationBuilder.CreateTable(
                name: "TaskPlayParams",
                columns: table => new
                {
                    IdParam = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskPlayId = table.Column<int>(type: "int", nullable: true),
                    ParamKey = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    ParamValue = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskPlayParams", x => x.IdParam);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Chats",
                columns: table => new
                {
                    IdChat = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdPlayer1 = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdPlayer2 = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chats", x => x.IdChat);
                    table.ForeignKey(
                        name: "FK_Chats_AspNetUsers_IdPlayer1",
                        column: x => x.IdPlayer1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Chats_AspNetUsers_IdPlayer2",
                        column: x => x.IdPlayer2,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Friends",
                columns: table => new
                {
                    IdPlayer1 = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdPlayer2 = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FriendshipDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friends", x => new { x.IdPlayer1, x.IdPlayer2 });
                    table.ForeignKey(
                        name: "FK_Friends_AspNetUsers_IdPlayer1",
                        column: x => x.IdPlayer1,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Friends_AspNetUsers_IdPlayer2",
                        column: x => x.IdPlayer2,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TasksProgramming",
                columns: table => new
                {
                    IdTaskProgramming = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    LangProgrammingId = table.Column<int>(type: "int", nullable: false),
                    Difficulty = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TextTask = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Preparation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VerificationCode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TasksProgramming", x => x.IdTaskProgramming);
                    table.ForeignKey(
                        name: "FK_TasksProgramming_LangProgrammings_LangProgrammingId",
                        column: x => x.LangProgrammingId,
                        principalTable: "LangProgrammings",
                        principalColumn: "IdLang",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TasksPlay",
                columns: table => new
                {
                    IdTask = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Reward = table.Column<int>(type: "int", nullable: false),
                    IsRepeatable = table.Column<bool>(type: "bit", nullable: false),
                    TaskPlayParamId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TasksPlay", x => x.IdTask);
                    table.ForeignKey(
                        name: "FK_TasksPlay_TaskPlayParams_TaskPlayParamId",
                        column: x => x.TaskPlayParamId,
                        principalTable: "TaskPlayParams",
                        principalColumn: "IdParam");
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    IdMessage = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdChat = table.Column<int>(type: "int", nullable: false),
                    IdSender = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MessageText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SentDateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.IdMessage);
                    table.ForeignKey(
                        name: "FK_Messages_AspNetUsers_IdSender",
                        column: x => x.IdSender,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Messages_Chats_IdChat",
                        column: x => x.IdChat,
                        principalTable: "Chats",
                        principalColumn: "IdChat",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    IdSession = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    LangProgrammingId = table.Column<int>(type: "int", nullable: false),
                    State = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    MaxPeople = table.Column<int>(type: "int", nullable: false),
                    TaskId = table.Column<int>(type: "int", nullable: true),
                    WinnerId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatorId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateCreating = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsStart = table.Column<bool>(type: "bit", nullable: false),
                    IsFinish = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.IdSession);
                    table.ForeignKey(
                        name: "FK_Sessions_LangProgrammings_LangProgrammingId",
                        column: x => x.LangProgrammingId,
                        principalTable: "LangProgrammings",
                        principalColumn: "IdLang",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Sessions_TasksProgramming_TaskId",
                        column: x => x.TaskId,
                        principalTable: "TasksProgramming",
                        principalColumn: "IdTaskProgramming");
                });

            migrationBuilder.CreateTable(
                name: "TaskInputData",
                columns: table => new
                {
                    IdTaskProgramming = table.Column<int>(type: "int", nullable: false),
                    IdInputDataTask = table.Column<int>(type: "int", nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskInputData", x => new { x.IdTaskProgramming, x.IdInputDataTask });
                    table.ForeignKey(
                        name: "FK_TaskInputData_InputData_IdInputDataTask",
                        column: x => x.IdInputDataTask,
                        principalTable: "InputData",
                        principalColumn: "IdInputData",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskInputData_TasksProgramming_IdTaskProgramming",
                        column: x => x.IdTaskProgramming,
                        principalTable: "TasksProgramming",
                        principalColumn: "IdTaskProgramming",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayerTaskPlays",
                columns: table => new
                {
                    IdPlayerTaskPlay = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlayerId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TaskPlayId = table.Column<int>(type: "int", nullable: false),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false),
                    ProgressValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerTaskPlays", x => x.IdPlayerTaskPlay);
                    table.ForeignKey(
                        name: "FK_PlayerTaskPlays_AspNetUsers_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerTaskPlays_TasksPlay_TaskPlayId",
                        column: x => x.TaskPlayId,
                        principalTable: "TasksPlay",
                        principalColumn: "IdTask",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayersSession",
                columns: table => new
                {
                    IdPlayer = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IdSession = table.Column<int>(type: "int", nullable: false),
                    CodeText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Time = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Memory = table.Column<int>(type: "int", nullable: true),
                    IsCompleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayersSession", x => new { x.IdPlayer, x.IdSession });
                    table.ForeignKey(
                        name: "FK_PlayersSession_AspNetUsers_IdPlayer",
                        column: x => x.IdPlayer,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayersSession_Sessions_IdSession",
                        column: x => x.IdSession,
                        principalTable: "Sessions",
                        principalColumn: "IdSession",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_IdPlayer1_IdPlayer2",
                table: "Chats",
                columns: new[] { "IdPlayer1", "IdPlayer2" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Chats_IdPlayer2",
                table: "Chats",
                column: "IdPlayer2");

            migrationBuilder.CreateIndex(
                name: "IX_Friends_IdPlayer2",
                table: "Friends",
                column: "IdPlayer2");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_IdChat",
                table: "Messages",
                column: "IdChat");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_IdSender",
                table: "Messages",
                column: "IdSender");

            migrationBuilder.CreateIndex(
                name: "IX_PlayersSession_IdSession",
                table: "PlayersSession",
                column: "IdSession");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerTaskPlays_PlayerId",
                table: "PlayerTaskPlays",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerTaskPlays_TaskPlayId",
                table: "PlayerTaskPlays",
                column: "TaskPlayId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_LangProgrammingId",
                table: "Sessions",
                column: "LangProgrammingId");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_TaskId",
                table: "Sessions",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskInputData_IdInputDataTask",
                table: "TaskInputData",
                column: "IdInputDataTask");

            migrationBuilder.CreateIndex(
                name: "IX_TaskPlayParams_TaskPlayId",
                table: "TaskPlayParams",
                column: "TaskPlayId",
                unique: true,
                filter: "[TaskPlayId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_TasksPlay_TaskPlayParamId",
                table: "TasksPlay",
                column: "TaskPlayParamId",
                unique: true,
                filter: "[TaskPlayParamId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_TasksProgramming_LangProgrammingId",
                table: "TasksProgramming",
                column: "LangProgrammingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Friends");

            migrationBuilder.DropTable(
                name: "Leagues");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "PlayersSession");

            migrationBuilder.DropTable(
                name: "PlayerTaskPlays");

            migrationBuilder.DropTable(
                name: "TaskInputData");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Chats");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "TasksPlay");

            migrationBuilder.DropTable(
                name: "InputData");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "TasksProgramming");

            migrationBuilder.DropTable(
                name: "TaskPlayParams");

            migrationBuilder.DropTable(
                name: "LangProgrammings");
        }
    }
}
