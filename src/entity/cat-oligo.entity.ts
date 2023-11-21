import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CatCaseEntity } from './cat-case.entity';
import { CatDiseaseEntity } from './cat-disease.entity';


@Entity({ name: 'cat_oligo', schema: 'public' })
export class CatOligoEntity extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id_cat_oligo?: number;

  // Tipo
  @Column({ nullable: false })
  type!: string;

  // Fwd
  @Column({ nullable: false })
  fwd!: boolean;
  
  // Rev
  @Column({ nullable: false })
  rev!: boolean;

  // Inicio
  @Column({ type: 'integer', nullable: false })
  start!: number;
  
  // Final
  @Column({ type: 'integer', nullable: false })
  end!: number;

  // Longitud
  @Column({ type: 'integer', nullable: false })
  length!: number;

  // Secuencia
  @Column({ nullable: false })
  sequence!: string;

  // Degeneraciones
  @Column({ type: 'integer', nullable: false })
  degenerations!: number;

  // tm
  @Column('decimal', { precision: 14, scale: 10, nullable: false })
  tm!: number;

  // GC
  @Column('decimal', { precision: 14, scale: 10, nullable: false })
  gc!: number;

  // DeltaG
  @Column('decimal', { precision: 14, scale: 10, nullable: false })
  deltaG!: number;
  
  @ManyToOne(() => CatDiseaseEntity, catDiseaseEntity => catDiseaseEntity.oligos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name: "fk_cat_disease"})
  diseases!: CatDiseaseEntity;
}
