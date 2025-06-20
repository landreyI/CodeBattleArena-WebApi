﻿// <auto-generated />
using System;
using CodeBattleArena.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace CodeBattleArena.Server.Migrations
{
    [DbContext(typeof(AppDBContext))]
    [Migration("20250602191226_AddPlayerItemCascade")]
    partial class AddPlayerItemCascade
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("CodeBattleArena.Server.Models.Chat", b =>
                {
                    b.Property<int>("IdChat")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdChat"));

                    b.Property<string>("IdPlayer1")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("IdPlayer2")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("IdChat");

                    b.HasIndex("IdPlayer2");

                    b.HasIndex("IdPlayer1", "IdPlayer2")
                        .IsUnique();

                    b.ToTable("Chats");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Friend", b =>
                {
                    b.Property<string>("IdPlayer1")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("IdPlayer2")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("FriendshipDate")
                        .HasColumnType("datetime2");

                    b.HasKey("IdPlayer1", "IdPlayer2");

                    b.HasIndex("IdPlayer2");

                    b.ToTable("Friends");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.InputData", b =>
                {
                    b.Property<int>("IdInputData")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdInputData"));

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdInputData");

                    b.ToTable("InputData");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Item", b =>
                {
                    b.Property<int>("IdItem")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdItem"));

                    b.Property<string>("CssClass")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("IdItem");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.LangProgramming", b =>
                {
                    b.Property<int>("IdLang")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdLang"));

                    b.Property<string>("CodeNameLang")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("IdCheckApi")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NameLang")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("IdLang");

                    b.ToTable("LangProgrammings");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.League", b =>
                {
                    b.Property<int>("IdLeague")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdLeague"));

                    b.Property<int?>("MaxWins")
                        .HasColumnType("int");

                    b.Property<int>("MinWins")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("IdLeague");

                    b.ToTable("Leagues");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Message", b =>
                {
                    b.Property<int>("IdMessage")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdMessage"));

                    b.Property<int>("IdChat")
                        .HasColumnType("int");

                    b.Property<string>("IdSender")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("MessageText")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("SentDateTime")
                        .HasColumnType("datetime2");

                    b.HasKey("IdMessage");

                    b.HasIndex("IdChat");

                    b.HasIndex("IdSender");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Player", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<int?>("ActiveAvatarId")
                        .HasColumnType("int");

                    b.Property<int?>("ActiveBackgroundId")
                        .HasColumnType("int");

                    b.Property<int?>("ActiveBadgeId")
                        .HasColumnType("int");

                    b.Property<int?>("ActiveBorderId")
                        .HasColumnType("int");

                    b.Property<int?>("ActiveTitleId")
                        .HasColumnType("int");

                    b.Property<string>("AdditionalInformation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("PhotoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<int>("Victories")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ActiveAvatarId");

                    b.HasIndex("ActiveBackgroundId");

                    b.HasIndex("ActiveBadgeId");

                    b.HasIndex("ActiveBorderId");

                    b.HasIndex("ActiveTitleId");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.PlayerItem", b =>
                {
                    b.Property<string>("IdPlayer")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("IdItem")
                        .HasColumnType("int");

                    b.HasKey("IdPlayer", "IdItem");

                    b.HasIndex("IdItem");

                    b.ToTable("PlayerItems");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.PlayerSession", b =>
                {
                    b.Property<string>("IdPlayer")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("IdSession")
                        .HasColumnType("int");

                    b.Property<string>("CodeText")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("FinishTask")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("bit");

                    b.Property<int?>("Memory")
                        .HasColumnType("int");

                    b.Property<string>("Time")
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("IdPlayer", "IdSession");

                    b.HasIndex("IdSession");

                    b.ToTable("PlayersSession");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.PlayerTaskPlay", b =>
                {
                    b.Property<int>("IdPlayerTaskPlay")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdPlayerTaskPlay"));

                    b.Property<bool>("IsCompleted")
                        .HasColumnType("bit");

                    b.Property<string>("PlayerId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProgressValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TaskPlayId")
                        .HasColumnType("int");

                    b.HasKey("IdPlayerTaskPlay");

                    b.HasIndex("PlayerId");

                    b.HasIndex("TaskPlayId");

                    b.ToTable("PlayerTaskPlays");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Reward", b =>
                {
                    b.Property<int>("IdReward")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdReward"));

                    b.Property<int?>("Amount")
                        .HasColumnType("int");

                    b.Property<int?>("ItemId")
                        .HasColumnType("int");

                    b.Property<string>("RewardType")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("IdReward");

                    b.HasIndex("ItemId");

                    b.ToTable("Rewards");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Session", b =>
                {
                    b.Property<int>("IdSession")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdSession"));

                    b.Property<string>("CreatorId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DateCreating")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("DateStartGame")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsFinish")
                        .HasColumnType("bit");

                    b.Property<bool>("IsStart")
                        .HasColumnType("bit");

                    b.Property<int>("LangProgrammingId")
                        .HasColumnType("int");

                    b.Property<int>("MaxPeople")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int?>("TaskId")
                        .HasColumnType("int");

                    b.Property<int?>("TimePlay")
                        .HasColumnType("int");

                    b.Property<string>("WinnerId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdSession");

                    b.HasIndex("LangProgrammingId");

                    b.HasIndex("TaskId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskInputData", b =>
                {
                    b.Property<int>("IdTaskProgramming")
                        .HasColumnType("int");

                    b.Property<int>("IdInputDataTask")
                        .HasColumnType("int");

                    b.Property<string>("Answer")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("IdTaskProgramming", "IdInputDataTask");

                    b.HasIndex("IdInputDataTask");

                    b.ToTable("TaskInputData");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskPlay", b =>
                {
                    b.Property<int>("IdTask")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdTask"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("Experience")
                        .HasColumnType("int");

                    b.Property<bool>("IsRepeatable")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<int?>("RewardCoin")
                        .HasColumnType("int");

                    b.Property<int?>("TaskPlayParamId")
                        .HasColumnType("int");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.HasKey("IdTask");

                    b.HasIndex("TaskPlayParamId")
                        .IsUnique()
                        .HasFilter("[TaskPlayParamId] IS NOT NULL");

                    b.ToTable("TasksPlay");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskPlayParam", b =>
                {
                    b.Property<int>("IdParam")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdParam"));

                    b.Property<string>("ParamKey")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("ParamValue")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<int?>("TaskPlayId")
                        .HasColumnType("int");

                    b.HasKey("IdParam");

                    b.HasIndex("TaskPlayId")
                        .IsUnique()
                        .HasFilter("[TaskPlayId] IS NOT NULL");

                    b.ToTable("TaskPlayParams");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskPlayReward", b =>
                {
                    b.Property<int>("TaskPlayId")
                        .HasColumnType("int");

                    b.Property<int>("RewardId")
                        .HasColumnType("int");

                    b.HasKey("TaskPlayId", "RewardId");

                    b.HasIndex("RewardId");

                    b.ToTable("TaskPlayRewards");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskProgramming", b =>
                {
                    b.Property<int>("IdTaskProgramming")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdTaskProgramming"));

                    b.Property<string>("Difficulty")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LangProgrammingId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("Preparation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TextTask")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VerificationCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdTaskProgramming");

                    b.HasIndex("LangProgrammingId");

                    b.ToTable("TasksProgramming");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Chat", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Player", "Player1")
                        .WithMany("ChatsAsUser1")
                        .HasForeignKey("IdPlayer1")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("CodeBattleArena.Server.Models.Player", "Player2")
                        .WithMany("ChatsAsUser2")
                        .HasForeignKey("IdPlayer2")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Player1");

                    b.Navigation("Player2");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Friend", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Player", "Player1")
                        .WithMany("Friends1")
                        .HasForeignKey("IdPlayer1")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("CodeBattleArena.Server.Models.Player", "Player2")
                        .WithMany("Friends2")
                        .HasForeignKey("IdPlayer2")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Player1");

                    b.Navigation("Player2");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Message", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Chat", "Chat")
                        .WithMany("Messages")
                        .HasForeignKey("IdChat")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CodeBattleArena.Server.Models.Player", "Sender")
                        .WithMany("Messages")
                        .HasForeignKey("IdSender")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Player", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Item", "ActiveAvatar")
                        .WithMany()
                        .HasForeignKey("ActiveAvatarId");

                    b.HasOne("CodeBattleArena.Server.Models.Item", "ActiveBackground")
                        .WithMany()
                        .HasForeignKey("ActiveBackgroundId");

                    b.HasOne("CodeBattleArena.Server.Models.Item", "ActiveBadge")
                        .WithMany()
                        .HasForeignKey("ActiveBadgeId");

                    b.HasOne("CodeBattleArena.Server.Models.Item", "ActiveBorder")
                        .WithMany()
                        .HasForeignKey("ActiveBorderId");

                    b.HasOne("CodeBattleArena.Server.Models.Item", "ActiveTitle")
                        .WithMany()
                        .HasForeignKey("ActiveTitleId");

                    b.Navigation("ActiveAvatar");

                    b.Navigation("ActiveBackground");

                    b.Navigation("ActiveBadge");

                    b.Navigation("ActiveBorder");

                    b.Navigation("ActiveTitle");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.PlayerItem", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Item", "Item")
                        .WithMany("PlayerItems")
                        .HasForeignKey("IdItem")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CodeBattleArena.Server.Models.Player", "Player")
                        .WithMany("PlayerItems")
                        .HasForeignKey("IdPlayer")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("Player");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.PlayerSession", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Player", "Player")
                        .WithMany("PlayerSessions")
                        .HasForeignKey("IdPlayer")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CodeBattleArena.Server.Models.Session", "Session")
                        .WithMany("PlayerSessions")
                        .HasForeignKey("IdSession")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Player");

                    b.Navigation("Session");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.PlayerTaskPlay", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Player", "Player")
                        .WithMany("PlayerTaskPlays")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CodeBattleArena.Server.Models.TaskPlay", "TaskPlay")
                        .WithMany("PlayerTaskPlays")
                        .HasForeignKey("TaskPlayId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Player");

                    b.Navigation("TaskPlay");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Reward", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Item", "Item")
                        .WithMany()
                        .HasForeignKey("ItemId");

                    b.Navigation("Item");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Session", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.LangProgramming", "LangProgramming")
                        .WithMany("Sessions")
                        .HasForeignKey("LangProgrammingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CodeBattleArena.Server.Models.TaskProgramming", "TaskProgramming")
                        .WithMany("Sessions")
                        .HasForeignKey("TaskId");

                    b.Navigation("LangProgramming");

                    b.Navigation("TaskProgramming");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskInputData", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.InputData", "InputData")
                        .WithMany("TaskInputData")
                        .HasForeignKey("IdInputDataTask")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CodeBattleArena.Server.Models.TaskProgramming", "TaskProgramming")
                        .WithMany("TaskInputData")
                        .HasForeignKey("IdTaskProgramming")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("InputData");

                    b.Navigation("TaskProgramming");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskPlay", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.TaskPlayParam", "TaskPlayParam")
                        .WithOne("TaskPlay")
                        .HasForeignKey("CodeBattleArena.Server.Models.TaskPlay", "TaskPlayParamId");

                    b.Navigation("TaskPlayParam");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskPlayReward", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Reward", "Reward")
                        .WithMany()
                        .HasForeignKey("RewardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CodeBattleArena.Server.Models.TaskPlay", "TaskPlay")
                        .WithMany("TaskPlayRewards")
                        .HasForeignKey("TaskPlayId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Reward");

                    b.Navigation("TaskPlay");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskProgramming", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.LangProgramming", "LangProgramming")
                        .WithMany("TasksProgramming")
                        .HasForeignKey("LangProgrammingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("LangProgramming");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Player", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Player", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("CodeBattleArena.Server.Models.Player", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("CodeBattleArena.Server.Models.Player", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Chat", b =>
                {
                    b.Navigation("Messages");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.InputData", b =>
                {
                    b.Navigation("TaskInputData");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Item", b =>
                {
                    b.Navigation("PlayerItems");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.LangProgramming", b =>
                {
                    b.Navigation("Sessions");

                    b.Navigation("TasksProgramming");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Player", b =>
                {
                    b.Navigation("ChatsAsUser1");

                    b.Navigation("ChatsAsUser2");

                    b.Navigation("Friends1");

                    b.Navigation("Friends2");

                    b.Navigation("Messages");

                    b.Navigation("PlayerItems");

                    b.Navigation("PlayerSessions");

                    b.Navigation("PlayerTaskPlays");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.Session", b =>
                {
                    b.Navigation("PlayerSessions");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskPlay", b =>
                {
                    b.Navigation("PlayerTaskPlays");

                    b.Navigation("TaskPlayRewards");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskPlayParam", b =>
                {
                    b.Navigation("TaskPlay");
                });

            modelBuilder.Entity("CodeBattleArena.Server.Models.TaskProgramming", b =>
                {
                    b.Navigation("Sessions");

                    b.Navigation("TaskInputData");
                });
#pragma warning restore 612, 618
        }
    }
}
