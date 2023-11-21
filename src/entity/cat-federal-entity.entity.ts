
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { CatCaseEntity } from './cat-case.entity';


@Entity({ name: 'cat_federal_entity', schema: 'public' })
export class CatFederalEntityEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_cat_federal_entity?: number;

  @Column({ nullable: false })
  federal_entity!: string;
  
  @Column({ nullable: false })
  abbreviation!: string;

  @Column({ nullable: false })
  id_key_geojson!: string;

  @Column({ nullable: false })
  federal_key!: number;

  @OneToMany(() => CatCaseEntity, catCaseEntity => catCaseEntity.federalEntities)
  cases?: CatCaseEntity;
}

