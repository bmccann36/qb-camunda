

CREATE TYPE sync_status  AS ENUM ('completed_by_system', 'failed', 'completed_by_user');

alter table inbound_ticket
    add created_at timestamp;

alter table inbound_ticket
    add sync_status sync_status;



CREATE TABLE erp_tool_credentials
(
    id                         uuid      not null
        constraint erp_pkey primary key,
    qb_company_id              char(40),
    token_type                 text,
    access_token               text,
    refresh_token              text,
    expires_in                 integer,
    x_refresh_token_expires_in integer,
    createdAt                  timestamp not null
);
