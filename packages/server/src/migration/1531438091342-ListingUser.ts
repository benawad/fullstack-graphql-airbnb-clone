import { MigrationInterface, QueryRunner } from "typeorm";

export class listingUser1531438091342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "listings" DROP CONSTRAINT "FK_45d5c4642c4cad0229da0ec22e7"`
    );
    await queryRunner.query(
      `ALTER TABLE "listings" RENAME COLUMN "userId" TO "ownerId"`
    );
    await queryRunner.query(
      `ALTER TABLE "listings" ALTER COLUMN "ownerId" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "listings" ADD CONSTRAINT "FK_c3dc0ba6b57c545899ab3187ea9" FOREIGN KEY ("ownerId") REFERENCES "users"("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "listings" DROP CONSTRAINT "FK_c3dc0ba6b57c545899ab3187ea9"`
    );
    await queryRunner.query(
      `ALTER TABLE "listings" ALTER COLUMN "ownerId" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "listings" RENAME COLUMN "ownerId" TO "userId"`
    );
    await queryRunner.query(
      `ALTER TABLE "listings" ADD CONSTRAINT "FK_45d5c4642c4cad0229da0ec22e7" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
