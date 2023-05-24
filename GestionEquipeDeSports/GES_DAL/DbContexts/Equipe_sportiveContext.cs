using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using GES_DAL.BackendProject;

namespace GES_DAL.DbContexts
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
        public virtual DbSet<UtilisateurEquipeRole> UtilisateurEquipeRoles { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Name=ConnectionStrings:DefaultConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Equipe>(entity =>
            {
                entity.HasKey(e => e.IdEquipe)
                    .HasName("PK__Equipe__D805241278BBBE99");

                entity.ToTable("Equipe");

                entity.Property(e => e.IdEquipe).HasDefaultValueSql("(newid())");

                entity.Property(e => e.AssociationSportive)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FkIdEtat).HasColumnName("Fk_Id_Etat");

                entity.Property(e => e.Nom)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Region)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Sport)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.FkIdEtatNavigation)
                    .WithMany(p => p.Equipes)
                    .HasForeignKey(d => d.FkIdEtat)
                    .HasConstraintName("FK__Equipe__Fk_Id_Et__4316F928");
            });

            modelBuilder.Entity<EquipeEvenement>(entity =>
            {
                entity.HasKey(e => e.IdEquipeEvenement)
                    .HasName("PK__EquipeEv__4E61511CD29BCBFD");

                entity.ToTable("EquipeEvenement");

                entity.Property(e => e.IdEquipeEvenement).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Fk_Id_Equipe).HasColumnName("FK_Id_Equipe");

                entity.Property(e => e.Fk_Id_Evenement).HasColumnName("FK_Id_Evenement");

                entity.HasOne(d => d.FkIdEquipeNavigation)
                    .WithMany(p => p.EquipeEvenements)
                    .HasForeignKey(d => d.Fk_Id_Equipe)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__EquipeEve__FK_Id__4F7CD00D");

                entity.HasOne(d => d.FkIdEvenementNavigation)
                    .WithMany(p => p.EquipeEvenements)
                    .HasForeignKey(d => d.Fk_Id_Evenement)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__EquipeEve__FK_Id__5070F446");
            });

            modelBuilder.Entity<EquipeJoueur>(entity =>
            {
                entity.HasKey(e => e.IdJoueurEquipe)
                    .HasName("PK__EquipeJo__EA8300EB46120A78");

                entity.ToTable("EquipeJoueur");

                entity.Property(e => e.IdJoueurEquipe).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Fk_Id_Equipe).HasColumnName("FK_Id_Equipe");

                entity.Property(e => e.Fk_Id_Utilisateur).HasColumnName("Fk_Id_Utilisateur");

                entity.HasOne(d => d.FkIdEquipeNavigation)
                    .WithMany(p => p.EquipeJoueurs)
                    .HasForeignKey(d => d.Fk_Id_Equipe)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__EquipeJou__FK_Id__4BAC3F29");

                entity.HasOne(d => d.FkIdUtilisateurNavigation)
                    .WithMany(p => p.EquipeJoueurs)
                    .HasForeignKey(d => d.Fk_Id_Utilisateur)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__EquipeJou__Fk_Id__4AB81AF0");
            });

            modelBuilder.Entity<Etat>(entity =>
            {
                entity.HasKey(e => e.IdEtat)
                    .HasName("PK__Etats__0FBDEBDD8A7554C8");

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Evenement>(entity =>
            {
                entity.HasKey(e => e.IdEvenement)
                    .HasName("PK__Evenemen__300AD07E8A8CBD4D");

                entity.ToTable("Evenement");

                entity.Property(e => e.IdEvenement).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Description)
                    .HasMaxLength(350)
                    .IsUnicode(false);

                entity.Property(e => e.Emplacement)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.FkIdTypeEvenement).HasColumnName("Fk_Id_TypeEvenement");

                entity.HasOne(d => d.FkIdTypeEvenementNavigation)
                    .WithMany(p => p.Evenements)
                    .HasForeignKey(d => d.FkIdTypeEvenement)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Evenement__Fk_Id__46E78A0C");
            });

            modelBuilder.Entity<EvenementJoueur>(entity =>
            {
                entity.HasKey(e => e.IdEvenementJoueur)
                    .HasName("PK__Evenemen__3CD1DF5C4F142533");

                entity.ToTable("EvenementJoueur");

                entity.Property(e => e.IdEvenementJoueur).HasDefaultValueSql("(newid())");

                entity.Property(e => e.EstPresentAevenement).HasColumnName("EstPresentAEvenement");

                entity.Property(e => e.Fk_Id_Evenement).HasColumnName("FK_Id_Evenement");

                entity.Property(e => e.Fk_Id_Utilisateur).HasColumnName("FK_Id_Utilisateur");

                entity.HasOne(d => d.FkIdEvenementNavigation)
                    .WithMany(p => p.EvenementJoueurs)
                    .HasForeignKey(d => d.Fk_Id_Evenement)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Evenement__FK_Id__5441852A");

                entity.HasOne(d => d.FkIdUtilisateurNavigation)
                    .WithMany(p => p.EvenementJoueurs)
                    .HasForeignKey(d => d.Fk_Id_Utilisateur)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Evenement__FK_Id__5535A963");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.IdRole)
                    .HasName("PK__Roles__B4369054A77D1CBA");

                entity.Property(e => e.IdRole).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TypeEvenement>(entity =>
            {
                entity.HasKey(e => e.IdTypeEvenement)
                    .HasName("PK__TypeEven__518A59159378B201");

                entity.Property(e => e.IdTypeEvenement).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Utilisateur>(entity =>
            {
                entity.HasKey(e => e.IdUtilisateur)
                    .HasName("PK__Utilisat__45A4C15715959DC3");

                entity.ToTable("Utilisateur");

                entity.Property(e => e.IdUtilisateur).HasDefaultValueSql("(newid())");

                entity.Property(e => e.Adresse)
                    .HasMaxLength(120)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FkIdEtat).HasColumnName("Fk_Id_Etat");

                entity.Property(e => e.FkIdRoles).HasColumnName("Fk_Id_Roles");

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
                    .HasConstraintName("FK__Utilisate__Fk_Id__3E52440B");

                entity.HasOne(d => d.FkIdRolesNavigation)
                    .WithMany(p => p.Utilisateurs)
                    .HasForeignKey(d => d.FkIdRoles)
                    .HasConstraintName("FK__Utilisate__Fk_Id__3F466844");
            });

            modelBuilder.Entity<UtilisateurEquipeRole>(entity =>
            {
                entity.HasKey(e => e.IdUtilisateurEquipeRole)
                    .HasName("PK__Utilisat__576C20F0C9FC9304");

                entity.ToTable("UtilisateurEquipeRole");

                entity.Property(e => e.IdUtilisateurEquipeRole).HasDefaultValueSql("(newid())");

                entity.Property(e => e.FkIdEquipe).HasColumnName("FK_Id_Equipe");

                entity.Property(e => e.FkIdRole).HasColumnName("FK_Id_Role");

                entity.Property(e => e.FkIdUtilisateur).HasColumnName("FK_Id_Utilisateur");

                //entity.HasOne(d => d.FkIdEquipeNavigation)
                //    .WithMany(p => p.)
                //    .HasForeignKey(d => d.FkIdEquipe)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("FK__Utilisate__FK_Id__59FA5E80");

                //entity.HasOne(d => d.FkIdRoleNavigation)
                //    .WithMany(p => p.UtilisateurEquipeRoles)
                //    .HasForeignKey(d => d.FkIdRole)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("FK__Utilisate__FK_Id__5AEE82B9");

                //entity.HasOne(d => d.FkIdUtilisateurNavigation)
                //    .WithMany(p => p.UtilisateurEquipeRoles)
                //    .HasForeignKey(d => d.FkIdUtilisateur)
                //    .OnDelete(DeleteBehavior.ClientSetNull)
                //    .HasConstraintName("FK__Utilisate__FK_Id__59063A47");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
