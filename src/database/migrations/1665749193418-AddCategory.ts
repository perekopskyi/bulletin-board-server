import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategory1665749193418 implements MigrationInterface {
    name = 'AddCategory1665749193418'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "categoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_168bf21b341e2ae340748e2541d" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_168bf21b341e2ae340748e2541d"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "categoryId"`);
    }

}
