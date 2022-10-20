import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Associations } from "./Associations";
import { TypeArticles } from "./TypeArticles";
import { Categories } from "./Categories";
import { Articles } from "./Articles";
import { Messages } from "./Messages";

@Entity("users", { schema: "ZARAO" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom", length: 255 })
  nom: string;

  @Column("varchar", { name: "prenoms", length: 255 })
  prenoms: string;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "tel", length: 19 })
  tel: string;

  @Column("text", { name: "facebook", nullable: true })
  facebook: string | null;

  @Column("text", { name: "password", nullable: true })
  password: string | null;

  @Column("varchar", { name: "photo_path", nullable: true, length: 255 })
  photoPath: string | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(() => Associations, (associations) => associations.user)
  associations: Associations[];

  @OneToMany(() => TypeArticles, (typeArticles) => typeArticles.user)
  typeArticles: TypeArticles[];

  @OneToMany(() => Categories, (categories) => categories.user)
  categories: Categories[];

  @OneToMany(() => Articles, (articles) => articles.user)
  articles: Articles[];

  @OneToMany(() => Messages, (messages) => messages.user)
  messages: Messages[];

  @OneToMany(() => Messages, (messages) => messages.user_2)
  messages2: Messages[];
}
