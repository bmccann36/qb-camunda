

CREATE TYPE sync_status  AS ENUM ('complete', 'failed');

alter table inbound_ticket
    add created_at timestamp;

alter table inbound_ticket
    add sync_status sync_status;
