import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedEntities1692695676318 implements MigrationInterface {
    name = 'UpdatedEntities1692695676318'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_a12ec5edcee2d94eb1ccdedeb37"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_4d093caee4d33b2745c7d05a41d" PRIMARY KEY ("post_id")`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "postOrderNumber" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "post_postOrderNumber_seq"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "createdAt" SET NOT NULL`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "post_postOrderNumber_seq" OWNED BY "post"."postOrderNumber"`);
        await queryRunner.query(`ALTER TABLE "post" ALTER COLUMN "postOrderNumber" SET DEFAULT nextval('"post_postOrderNumber_seq"')`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "PK_4d093caee4d33b2745c7d05a41d"`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "PK_a12ec5edcee2d94eb1ccdedeb37" PRIMARY KEY ("post_id", "postOrderNumber")`);
    }

}
