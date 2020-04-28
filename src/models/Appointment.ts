import {uuid} from 'uuidv4'
import {Entity, PrimaryGeneratedColumn, Column , CreateDateColumn ,
    UpdateDateColumn, ManyToOne , JoinColumn} from 'typeorm'
import User from './Users'

@Entity ('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid') // Esta linha já executa this.id = uuid()
    id: string;

    @Column()
    provider_id: string;

    // Cria o relacionamento entre 2 colunas
    @ManyToOne(() => User)
    @JoinColumn({name : 'provider_id'})
    provider: User

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

}

export default Appointment
