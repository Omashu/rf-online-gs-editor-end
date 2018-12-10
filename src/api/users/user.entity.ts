import { Entity, Column, PrimaryColumn, OneToOne } from 'typeorm';
import { Role } from '../roles/role.entity';

@Entity()
export class User {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id: string;

  @Column({ length: 24, nullable: false, unique: true })
  login: string;

  @Column({ length: 64, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @OneToOne(type => Role, {
    eager: true,
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @Column('uuid')
  roleId: string;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'NOW()',
  })
  createdAt: Date;

  @Column('timestamp with time zone', {
    nullable: false,
    default: () => 'NOW()',
  })
  updatedAt: Date;
}
