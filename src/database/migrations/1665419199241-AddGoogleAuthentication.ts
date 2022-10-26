import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGoogleAuthentication1665419199241 implements MigrationInterface {
    name = 'AddGoogleAuthentication1665419199241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "authorFirstName"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "authorLastName"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isRegisteredWithGoogle" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "currentHashedRefreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "currentHashedRefreshToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isRegisteredWithGoogle"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "authorLastName" character varying`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "authorFirstName" character varying`);
    }

}
