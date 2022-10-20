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

@Index("fk_type_articles_user_id", ["userId"], {})
@Entity("type_articles", { schema: "ZARAO" })
export class TypeArticles {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "type", length: 255 })
  type: string;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("int", { name: "user_id" })
  userId: number;

  @ManyToOne(() => Users, (users) => users.typeArticles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Articles, (articles) => articles.typeArticle)
  articles: Articles[];
}
