import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryColumn('uuid', { default: () => 'gen_random_uuid()' })
  id: string;

  @Column({ length: 64, nullable: false })
  name: string;

  @Column({ length: 64, nullable: false })
  title: string;

  @Column({ default: false, nullable: false })
  isDefault: boolean;

  @Column('timestamp with time zone', { nullable: false, default: () => 'NOW()' })
  createdAt: Date;

  @Column('timestamp with time zone', { nullable: false, default: () => 'NOW()' })
  updatedAt: Date;
}
