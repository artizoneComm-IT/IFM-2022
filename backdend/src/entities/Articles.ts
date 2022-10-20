import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Associations } from "./Associations";
import { Categories } from "./Categories";
import { TypeArticles } from "./TypeArticles";
import { Users } from "./Users";

@Index("fk_articles_user_id", ["userId"], {})
@Index("fk_articles_association_id", ["associationId"], {})
@Index("fk_articles_categorie_id", ["categorieId"], {})
@Index("fk_articles_type_article_id", ["typeArticleId"], {})
@Entity("articles", { schema: "ZARAO" })
export class Articles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom_article", length: 255 })
  nomArticle: string;

  @Column("int", { name: "nombres" })
  nombres: number;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "user_id", nullable: true })
  userId: number | null;

  @Column("int", { name: "association_id", nullable: true })
  associationId: number | null;

  @Column("int", { name: "categorie_id" })
  categorieId: number;

  @Column("int", { name: "type_article_id" })
  typeArticleId: number;

  @ManyToOne(() => Associations, (associations) => associations.articles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "association_id", referencedColumnName: "id" }])
  association: Associations;

  @ManyToOne(() => Categories, (categories) => categories.articles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "categorie_id", referencedColumnName: "id" }])
  categorie: Categories;

  @ManyToOne(() => TypeArticles, (typeArticles) => typeArticles.articles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "type_article_id", referencedColumnName: "id" }])
  typeArticle: TypeArticles;

  @ManyToOne(() => Users, (users) => users.articles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
