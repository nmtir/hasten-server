import { Area } from '../../area/entities/area/area.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Map {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  imagemSvg: string;

  @OneToMany(() => Area, area => area.map)
  areas: Area[];
  
}