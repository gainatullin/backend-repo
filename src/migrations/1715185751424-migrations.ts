import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1715185751424 implements MigrationInterface {
  name = 'migrations1715185751424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "credentials" ("userId" uuid NOT NULL, "credential" character varying NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT false, "isBanned" boolean NOT NULL DEFAULT false, "confirmationCode" character varying NOT NULL DEFAULT 'ABC123', CONSTRAINT "PK_8d3a07b8e994962efe57ebd0f20" PRIMARY KEY ("userId"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user-role_role_enum" AS ENUM('ADMIN', 'USER', 'AUTHOR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user-role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."user-role_role_enum" NOT NULL DEFAULT 'USER', "userId" uuid, CONSTRAINT "PK_48235f8b9c75b20b5cddd2eae91" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "passwordHash" character varying NOT NULL, "username" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "credentials" ADD CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-role" ADD CONSTRAINT "FK_c7c1bb73f89bbdd47b4afb1bab9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_0e33434a2d18c89a149c8ad6d86" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_0e33434a2d18c89a149c8ad6d86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-role" DROP CONSTRAINT "FK_c7c1bb73f89bbdd47b4afb1bab9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "credentials" DROP CONSTRAINT "FK_8d3a07b8e994962efe57ebd0f20"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "posts"`);
    await queryRunner.query(`DROP TABLE "user-role"`);
    await queryRunner.query(`DROP TYPE "public"."user-role_role_enum"`);
    await queryRunner.query(`DROP TABLE "credentials"`);
  }
}
