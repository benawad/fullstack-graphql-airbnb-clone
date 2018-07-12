import {MigrationInterface, QueryRunner} from "typeorm";

export class listingTable1531437372575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "listings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "pictureUrl" text NOT NULL, "description" character varying(255) NOT NULL, "price" integer NOT NULL, "beds" integer NOT NULL, "guests" integer NOT NULL, "latitude" double precision NOT NULL, "longitude" double precision NOT NULL, "amenities" text array NOT NULL, CONSTRAINT "PK_520ecac6c99ec90bcf5a603cdcb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "listings"`);
    }

}
