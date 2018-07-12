import {MigrationInterface, QueryRunner} from "typeorm";

export class listingUser1531437838812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "listings" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "listings" ADD CONSTRAINT "FK_45d5c4642c4cad0229da0ec22e7" FOREIGN KEY ("userId") REFERENCES "users"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "listings" DROP CONSTRAINT "FK_45d5c4642c4cad0229da0ec22e7"`);
        await queryRunner.query(`ALTER TABLE "listings" DROP COLUMN "userId"`);
    }

}
