import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TypeMessages } from "./TypeMessages";
import { Users } from "./Users";

@Index("fk_messages_dest_id", ["userId"], {})
@Index("fk_messages_type_message_id", ["typeMessageId"], {})
@Entity("messages", { schema: "ZARAO" })
export class Messages {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("text", { name: "message" })
  message: string;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("int", { name: "type_message_id" })
  typeMessageId: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "dest_id" })
  destId: number;

  @Column("varchar", { name: "path_file", nullable: true, length: 255 })
  pathFile: string | null;

  @ManyToOne(() => TypeMessages, (typeMessages) => typeMessages.messages, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "type_message_id", referencedColumnName: "id" }])
  typeMessage: TypeMessages;

  @ManyToOne(() => Users, (users) => users.messages, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
