import { Entity, PrimaryColumn, Column, } from 'typeorm';


@Entity('erp_tool_credentials')
export class ErpToolCredsEntity {


  @PrimaryColumn('text', { name: 'qb_company_id' })
    qbCompanyId?: string;

  @PrimaryColumn('uuid', { name: 'yard_id' })
    yardId?: string;

  @Column('text', { name: 'qb_access_token' })
    qbAccessToken?: string;

  @Column('text', { name: 'qb_refresh_token' })
    qbRefreshToken?: string;

  @Column('integer', { name: 'qb_expires_in' })
    qbExpiresIn?: Date;

  @Column('integer', { name: 'qb_refresh_token_expires_in' })
    qbRefreshTokenEpiresIn?: number;

  @Column('timestamp', { name: 'qb_created_at' })
    qbCreatedAt?: Date;

}
