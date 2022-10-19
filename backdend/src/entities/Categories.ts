import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Articles } from "./Articles";

@Index("fk_categories_user_id", ["userId"], {})
@Entity("categories", { schema: "ZARAO" })
export class Categories {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom_categorie", length: 255 })
  nomCategorie: string;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("int", { name: "user_id" })
  userId: number;

  @ManyToOne(() => Users, (users) => users.categories, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Articles, (articles) => articles.categorie)
  articles: Articles[];
}
