import {MigrationInterface, QueryRunner , Table} from "typeorm";

export default class CreateAppointments1587821943800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: 'uuid',
                        isPrimary : true,
                        generationStrategy : "uuid",
                        default: 'uuid_generate_v4()'

                    },
                    {
                        name: "provider",
                        type: 'varchar',

                    },
                    {
                        name: "date",
                        type: "timestamp with time zone", //adiciona fuso horário na data do horário

                    },
                    {
                        name: "created_at",
                        type: "timestamp", //adiciona fuso horário na data do horário
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp", //adiciona fuso horário na data do horário
                        default: "now()",
                    },

                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments')
    }

}
