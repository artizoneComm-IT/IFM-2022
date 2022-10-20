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

@Index("fk_associations_user_id", ["userId"], {})
@Entity("associations", { schema: "ZARAO" })
export class Associations {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "nom_association", length: 255 })
  nomAssociation: string;

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

  @Column("int", { name: "user_id" })
  userId: number;

  @ManyToOne(() => Users, (users) => users.associations, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;

  @OneToMany(() => Articles, (articles) => articles.association)
  articles: Articles[];
}
