import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPurchases1603776148692 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'purchases',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'purchaseNumber',
          type: 'varchar',
        },
        {
          name: 'state',
          type: 'varchar'
        },
        {
          name: 'purchaseList',
          type: 'text',
        },
        {
          name: 'userId',
          type: 'integer',
        },
      ],
      foreignKeys: [
        {
          name: "PurchaseUserFk",
          columnNames: ['userId'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      ]
    }))
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('purchases');
  }

}
