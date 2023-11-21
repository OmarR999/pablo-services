
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CatDiseaseEntity } from './cat-disease.entity';
import { CatFederalEntityEntity } from './cat-federal-entity.entity';
import { CatOligoEntity } from './cat-oligo.entity';


@Entity({ name: 'cat_case', schema: 'public' })
export class CatCaseEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_cat_case?: number;

  @Column({ nullable: false })
  cases!: number;
  
  @Column({ nullable: false })
  month!: number;

  @Column({ nullable: false })
  year!: number;

  @ManyToOne(() => CatDiseaseEntity, catDiseaseEntity => catDiseaseEntity.cases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: "fk_cat_disease"})
  diseases!: CatDiseaseEntity;
  
  @ManyToOne(() => CatFederalEntityEntity, catFederalEntityEntity => catFederalEntityEntity.cases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: "fk_cat_federal_entity"})
  federalEntities!: CatFederalEntityEntity;
  
}

