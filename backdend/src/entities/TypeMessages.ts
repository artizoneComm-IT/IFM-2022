import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Messages } from "./Messages";

@Entity("type_messages", { schema: "ZARAO" })
export class TypeMessages {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "type", length: 255 })
  type: string;

  @OneToMany(() => Messages, (messages) => messages.typeMessage)
  messages: Messages[];
}
