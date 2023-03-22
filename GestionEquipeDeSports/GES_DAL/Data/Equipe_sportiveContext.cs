using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using GES_DAL.Models;

namespace GES_DAL.Data
{
    public partial class Equipe_sportiveContext : DbContext
    {
        public Equipe_sportiveContext()
        {
        }

        public Equipe_sportiveContext(DbContextOptions<Equipe_sportiveContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Equipe> Equipes { get; set; } = null!;
        public virtual DbSet<EquipeEvenement> EquipeEvenements { get; set; } = null!;
        public virtual DbSet<EquipeJoueur> EquipeJoueurs { get; set; } = null!;
        public virtual DbSet<Etat> Etats { get; set; } = null!;
        public virtual DbSet<Evenement> Evenements { get; set; } = null!;
        public virtual DbSet<EvenementJoueur> EvenementJoueurs { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<TypeEvenement> TypeEvenements { get; set; } = null!;
        public virtual DbSet<Utilisateur> Utilisateurs { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost;Database=Equipe_sportive;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Equipe>(entity =>
            {
                entity.HasKey(e => e.IdEquipe)
                    .HasName("PK__Equipe__D8052412FD08D329");

                entity.ToTable("Equipe");

                entity.Property(e => e.IdEquipe).HasDefaultValueSql("(newid())");

                entity.Property(e => e.AssociationSportive)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nom)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Region)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Sport)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.EtatNavigation)
                    .WithMany(p => p.Equipes)
                    .HasForeignKey(d => d.Etat)
                    .HasConstraintName("FK__Equipe__Etat__4222D4EF");
            });

            modelBuilder.Entity<EquipeEvenement>(entity =>
            {
                entity.HasKey(e => e.IdEquipeEvenement)
                    .HasName("PK__EquipeEv__4E61511C4EA917AD");

                entity.ToTable("EquipeEvenement");

                entity.Property(e => e.IdEquipeEvenement).HasDefaultValueSql("(newid())");

                entity.Property(e => e.FkIdEquipe).HasColumnName("FK_Id_Equipe");

                entity.Property(e => e.FkIdEvenement).HasColumnName("FK_Id_Evenement");

                entity.HasOne(d => d.FkIdEquipeNavigation)
                    .WithMany(p => p.EquipeEvenements)
                    .HasForeignKey(d => d.FkIdEquipe)
                    .HasConstraintName("FK__EquipeEve__FK_Id__5070F446");

                entity.HasOne(d => d.FkIdEvenementNavigation)
                    .WithMany(p => p.EquipeEvenements)
                    .HasForeignKey(d => d.FkIdEvenement)
                    .HasConstraintName("FK__EquipeEve__FK_Id__5165187F");
            });

            modelBuilder.Entity<EquipeJoueur>(entity =>
            {
                entity.HasKey(e => e.IdJoueurEquipe)
                    .HasName("PK__EquipeJo__EA8300EBB81067C8");

                entity.ToTable("EquipeJoueur");

                entity.Property(e => e.IdJoueurEquipe).HasDefaultValueSql("(newid())");

                entity.Property(e => e.FkIdEquipe).HasColumnName("FK_Id_Equipe");

                entity.Property(e => e.FkIdRoles).HasColumnName("FK_Id_Roles");

                entity.HasOne(d => d.FkIdEquipeNavigation)
                    .WithMany(p => p.EquipeJoueurs)
                    .HasForeignKey(d => d.FkIdEquipe)
                    .HasConstraintName("FK__EquipeJou__FK_Id__4BAC3F29");

                entity.HasOne(d => d.FkIdRolesNavigation)
                    .WithMany(p => p.EquipeJoueurs)
                    .HasForeignKey(d => d.FkIdRoles)
                    .HasConstraintName("FK__EquipeJou__FK_Id__4CA06362");

                entity.HasOne(d => d.IdNavigation)
                    .WithMany(p => p.EquipeJoueurs)
                    .HasForeignKey(d => d.Id)
                    .HasConstraintName("FK__EquipeJoueur__Id__4AB81AF0");
            });

            modelBuilder.Entity<Etat>(entity =>
            {
                entity.HasKey(e => e.IdEtat)
                    .HasName("PK__Etats__0FBDEBDD41D7DAAE");

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Evenement>(entity =>
            {
                entity.HasKey(e => e.IdEvenement)
                    .HasName("PK__Evenemen__300AD07E26F9A29B");

                entity.ToTable("Evenement");

                entity.Property(e => e.IdEvenement).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Description)
                    .HasMaxLength(350)
                    .IsUnicode(false);

                entity.Property(e => e.Emplacement)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.HasOne(d => d.EtatNavigation)
                    .WithMany(p => p.Evenements)
                    .HasForeignKey(d => d.Etat)
                    .HasConstraintName("FK__Evenement__Etat__46E78A0C");

                entity.HasOne(d => d.IdTypeEvenementNavigation)
                    .WithMany(p => p.Evenements)
                    .HasForeignKey(d => d.IdTypeEvenement)
                    .HasConstraintName("FK__Evenement__IdTyp__45F365D3");
            });

            modelBuilder.Entity<EvenementJoueur>(entity =>
            {
                entity.HasKey(e => e.IdEvenementJoueur)
                    .HasName("PK__Evenemen__3CD1DF5CD75733C5");

                entity.ToTable("EvenementJoueur");

                entity.Property(e => e.IdEvenementJoueur).HasDefaultValueSql("(newid())");

                entity.Property(e => e.FkIdEvenement).HasColumnName("FK_Id_Evenement");

                entity.Property(e => e.FkIdUtilisateur).HasColumnName("FK_Id_Utilisateur");

                entity.HasOne(d => d.FkIdEvenementNavigation)
                    .WithMany(p => p.EvenementJoueurs)
                    .HasForeignKey(d => d.FkIdEvenement)
                    .HasConstraintName("FK__Evenement__FK_Id__5535A963");

                entity.HasOne(d => d.FkIdUtilisateurNavigation)
                    .WithMany(p => p.EvenementJoueurs)
                    .HasForeignKey(d => d.FkIdUtilisateur)
                    .HasConstraintName("FK__Evenement__FK_Id__5629CD9C");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.IdRole)
                    .HasName("PK__Roles__B4369054DC01C136");

                entity.Property(e => e.IdRole).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TypeEvenement>(entity =>
            {
                entity.HasKey(e => e.IdTypeEvenement)
                    .HasName("PK__TypeEven__518A5915F707976D");

                entity.Property(e => e.IdTypeEvenement).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Utilisateur>(entity =>
            {
                entity.HasKey(e => e.IdUtilisateur)
                    .HasName("PK__Utilisat__45A4C1573270B3AE");

                entity.ToTable("Utilisateur");

                entity.Property(e => e.IdUtilisateur).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Adresse)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FkIdEtat).HasColumnName("FK_Id_Etat");

                entity.Property(e => e.Nom)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NumTelephone)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Prenom)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkIdEtatNavigation)
                    .WithMany(p => p.Utilisateurs)
                    .HasForeignKey(d => d.FkIdEtat)
                    .HasConstraintName("FK__Utilisate__FK_Id__3E52440B");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
