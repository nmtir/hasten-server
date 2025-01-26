import { Map } from '../../../map/entities/map.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  VirtualColumn,
  JoinColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  coordenadas: string;

  @ManyToOne(() => Map, (map) => map.areas)
  // @JoinColumn({ name: 'mapId' })
  map: Map;

  @RelationId((area: Area) => area.map)
  mapId: number;
}
