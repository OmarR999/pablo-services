
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { CatCaseEntity } from './cat-case.entity';
import { CatOligoEntity } from './cat-oligo.entity';


@Entity({ name: 'cat_disease', schema: 'public' })
export class CatDiseaseEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_cat_disease?: number;

  @Column({ nullable: false })
  disease!: string;
  
  @Column({ nullable: true })
  directory?: string;
  
  @Column({ default: null })
  path_image?: string;
  
  @Column({ nullable: false })
  has_analytics!: boolean;
  
  @Column({ nullable: false })
  has_surveillance!: boolean;
  
  @OneToMany(() => CatCaseEntity, catCaseEntity => catCaseEntity.diseases)
  cases!: CatCaseEntity;

  @OneToMany(() => CatOligoEntity, catOligoEntity => catOligoEntity.diseases)
  oligos!: CatOligoEntity;
}

