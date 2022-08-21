import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1661075883120 implements MigrationInterface {
    name = 'initial1661075883120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "updated" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "title" text NOT NULL, "text" text NOT NULL, "views" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
