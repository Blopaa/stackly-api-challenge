import {MigrationInterface, QueryRunner} from "typeorm";

export class first1606119004832 implements MigrationInterface {
    name = 'first1606119004832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_0f49a593960360f6f85b692aca8" UNIQUE ("name"), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "full_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "country" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_skills" ("user_id" integer NOT NULL, "skill_id" integer NOT NULL, CONSTRAINT "PK_816eba68a0ca1b837ec15daefc7" PRIMARY KEY ("user_id", "skill_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6926002c360291df66bb2c5fde" ON "user_skills" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_eb69710b0a00f42fb95fc2ac2f" ON "user_skills" ("skill_id") `);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD CONSTRAINT "FK_6926002c360291df66bb2c5fdeb" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD CONSTRAINT "FK_eb69710b0a00f42fb95fc2ac2f5" FOREIGN KEY ("skill_id") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skills" DROP CONSTRAINT "FK_eb69710b0a00f42fb95fc2ac2f5"`);
        await queryRunner.query(`ALTER TABLE "user_skills" DROP CONSTRAINT "FK_6926002c360291df66bb2c5fdeb"`);
        await queryRunner.query(`DROP INDEX "IDX_eb69710b0a00f42fb95fc2ac2f"`);
        await queryRunner.query(`DROP INDEX "IDX_6926002c360291df66bb2c5fde"`);
        await queryRunner.query(`DROP TABLE "user_skills"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "skill"`);
    }

}
