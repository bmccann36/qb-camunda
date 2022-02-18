

DROP TYPE IF EXISTS customer_type CASCADE;

CREATE TYPE customer_type AS ENUM ('retail','industrial');


DROP TYPE IF EXISTS vendor_type CASCADE;

CREATE TYPE vendor_type AS ENUM ('demolition','construction','manufacturing','retail-preferred');


create table organization
(
    id      uuid                  not null
        constraint organization_pkey
            primary key,
    name    text                  not null,
    archive boolean default false not null
);

alter table organization
    owner to postgres;

create table yard
(
    id              uuid                  not null
        constraint yard_pkey
            primary key,
    organization_id uuid
        constraint "FK_yard.organization_id"
            references organization,
    name            text,
    archive         boolean default false not null
);

alter table yard
    owner to postgres;

create table commodity
(
    id      uuid                  not null
        constraint commodity_pkey
            primary key,
    type    text                  not null,
    name    text                  not null,
    code    text                  not null,
    yard_id uuid                  not null
        constraint "FK_commodity.yard_id"
            references yard,
    archive boolean default false not null
);

alter table commodity
    owner to postgres;

create table commodity_status
(
    id           uuid                                           not null
        constraint commodity_status_pkey
            primary key,
    commodity_id uuid                                           not null
        constraint "FK_commodity_status.commodity_id"
            references commodity,
    status       text                                           not null,
    user_id      uuid                                           not null,
    date         timestamp default timezone('utc'::text, now()) not null
);

alter table commodity_status
    owner to postgres;

create table material_type
(
    id           uuid                  not null
        constraint material_type_pkey
            primary key,
    commodity_id uuid                  not null
        constraint "FK_material_type.commodity_id"
            references commodity,
    code         text                  not null,
    common_name  text                  not null,
    yard_id      uuid                  not null
        constraint "FK_material_type.yard_id"
            references yard,
    archive      boolean default false not null
);

alter table material_type
    owner to postgres;

create table material_type_status
(
    id               uuid                                           not null
        constraint material_type_status_pkey
            primary key,
    material_type_id uuid                                           not null
        constraint "FK_material_type_status.material_type_id"
            references material_type,
    status           text                                           not null,
    user_id          uuid                                           not null,
    date             timestamp default timezone('utc'::text, now()) not null
);

alter table material_type_status
    owner to postgres;

create table benchmark
(
    id      uuid                  not null
        constraint benchmark_pkey
            primary key,
    type    text,
    yard_id uuid                  not null
        constraint "FK_benchmark.yard_id"
            references yard,
    archive boolean default false not null
);

alter table benchmark
    owner to postgres;

create table price_sheet
(
    id      uuid                                           not null
        constraint price_sheet_pkey
            primary key,
    yard_id uuid                                           not null
        constraint "FK_price_sheet.yard_id"
            references yard,
    type    text,
    date    timestamp default timezone('utc'::text, now()) not null,
    archive boolean   default false                        not null
);

alter table price_sheet
    owner to postgres;

create table price_entry
(
    id                      uuid                                           not null
        constraint price_entry_pkey
            primary key,
    material_type_id        uuid
        constraint "FK_price_entry.material_type_id"
            references material_type,
    price_sheet_id          uuid
        constraint "FK_price_entry.price_sheet_id"
            references price_sheet,
    reference_bench_mark_id uuid
        constraint "FK_price_entry.reference_bench_mark_id"
            references benchmark,
    yard_id                 uuid                                           not null
        constraint "FK_price_entry.yard_id"
            references yard,
    organization_id         uuid
        constraint "FK_price_entry.organization_id"
            references organization,
    is_formula              boolean,
    is_buy_price            boolean,
    price                   numeric(15, 4),
    differential            numeric(15, 4),
    recovery                smallint,
    other_costs             numeric(15, 4),
    min_max_range           numeric(15, 4),
    date                    timestamp default timezone('utc'::text, now()) not null,
    archive                 boolean   default false                        not null
);

alter table price_entry
    owner to postgres;

create table benchmark_history
(
    id           uuid                                           not null
        constraint benchmark_history_pkey
            primary key,
    benchmark_id uuid
        constraint "FK_benchmark_history.benchmark_id"
            references benchmark,
    date         timestamp default timezone('utc'::text, now()) not null,
    price        numeric(15, 4)
);

alter table benchmark_history
    owner to postgres;

CREATE TABLE "customer"
(
    "id"             uuid,
    "price_sheet_id" uuid,
    "yard_id"        uuid                  not null,
    "is_supplier"    boolean,
    "is_consumer"    boolean,
    "display_name"   text,
    "company_name"   text,
    "type"           customer_type,
    "vendor_class"   vendor_type,
    archive          boolean default false not null,
    "buys_forbidden" boolean,
    "external_id"    serial,
    PRIMARY KEY ("id"),
    CONSTRAINT "FK_customer.price_sheet_id"
        FOREIGN KEY ("price_sheet_id")
            REFERENCES "price_sheet" ("id"),
    CONSTRAINT "FK_customer.yard_id"
        FOREIGN KEY ("yard_id")
            REFERENCES "yard" ("id")
);

alter table customer
    owner to postgres;

create table outbound_ticket
(
    id                  uuid not null
        constraint outbound_ticket_pkey
            primary key,
    customer_id         uuid
        constraint "FK_outbound_ticket.customer_id"
            references customer,
    effective_date      timestamp,
    ticket_id           serial,
    transportation_info json,
    shipping_info       json,
    contract_info       json,
    yard_id             uuid not null
        constraint "FK_outbound_ticket.yard_id"
            references yard
);

alter table outbound_ticket
    owner to postgres;

create table packing_list
(
    id                 uuid                  not null
        constraint packing_list_pkey
            primary key,
    outbound_ticket_id uuid
        constraint "FK_packing_list.outbound_ticket_id"
            references outbound_ticket,
    yard_id            uuid                  not null
        constraint "FK_packing_list.yard_id"
            references yard,
    tag                serial,
    name               text,
    net_weight         integer,
    net_revenue        numeric(15, 4),
    archive            boolean default false not null
);

alter table packing_list
    owner to postgres;

create table finished_good
(
    id                 uuid                  not null
        constraint finished_good_pkey
            primary key,
    material_type_id   uuid                  not null
        constraint "FK_finished_good.material_type_id"
            references material_type,
    packing_list_id    uuid
        constraint "FK_finished_good.packing_list_id"
            references packing_list,
    outbound_ticket_id uuid
        constraint "FK_finished_good.outbound_ticket_id"
            references outbound_ticket,
    yard_id            uuid                  not null
        constraint "FK_finished_good.yard_id"
            references yard,
    gross              integer               not null,
    tare               integer               not null,
    net                integer               not null,
    tag                serial,
    type               text,
    archive            boolean default false not null
);

alter table finished_good
    owner to postgres;

create unique index finished_good_tag_uindex
    on finished_good (tag);

CREATE TABLE "inbound_ticket"
(
    "id"                    uuid,
    "customer_id"           uuid,
    "yard_id"               uuid                  not null,
    "external_id"           serial,
    "effective_date"        timestamp,
    "truck_gross"           integer,
    "truck_tare"            integer,
    "truck_net"             integer,
    "load_gross"            integer,
    "load_tare"             integer,
    "load_deduction"        integer,
    "load_net"              integer,
    "net_weight"            integer,
    "average_cost_per_unit" NUMERIC(15, 4),
    "net_cost"              NUMERIC(15, 4),
    "archive"               boolean default false not null,
    "carrier_name"          text,
    "carrier_number"        text,
    "trailer_number"        text,
    "is_pickup"             boolean,
    "purchase_order"        text,
    "bill_of_lading"        text,
    "driver_name"           text,
    "container_number"      text,
    "number_of_passengers"  text,
    PRIMARY KEY ("id"),
    CONSTRAINT "FK_inbound_ticket.yard_id"
        FOREIGN KEY ("yard_id")
            REFERENCES "yard" ("id"),
    CONSTRAINT "FK_inbound_ticket.customer_id"
        FOREIGN KEY ("customer_id")
            REFERENCES "customer" ("id")
);


alter table inbound_ticket
    owner to postgres;

CREATE TABLE "material"
(
    "id"                       uuid,
    "material_type_id"         uuid,
    "inbound_ticket_id"        uuid,
    "outbound_ticket_id"       uuid,
    "finished_good_id"         uuid,
    "yard_id"                  uuid                  not null,
    "gross"                    integer,
    "tare"                     integer,
    "archive"                  boolean default false not null,
    "derived_from_material_id" uuid,
    PRIMARY KEY ("id"),
    CONSTRAINT "FK_material.material_type_id"
        FOREIGN KEY ("material_type_id")
            REFERENCES "material_type" ("id"),
    CONSTRAINT "FK_material.derived_from_material_id"
        FOREIGN KEY ("derived_from_material_id")
            REFERENCES "material" ("id"),
    CONSTRAINT "FK_material.outbound_ticket_id"
        FOREIGN KEY ("outbound_ticket_id")
            REFERENCES "outbound_ticket" ("id"),
    CONSTRAINT "FK_material.finished_good_id"
        FOREIGN KEY ("finished_good_id")
            REFERENCES "finished_good" ("id"),
    CONSTRAINT "FK_material.inbound_ticket_id"
        FOREIGN KEY ("inbound_ticket_id")
            REFERENCES "inbound_ticket" ("id"),
    CONSTRAINT "FK_material.yard_id"
        FOREIGN KEY ("yard_id")
            REFERENCES "yard" ("id")
);

alter table material
    owner to postgres;

create table material_status
(
    id                uuid                                           not null
        constraint material_status_pkey
            primary key,
    material_id       uuid                                           not null
        constraint "FK_material_status.material_id"
            references material,
    status            text                                           not null,
    user_id           uuid                                           not null,
    date              timestamp default timezone('utc'::text, now()) not null,
    inbound_ticket_id uuid
        constraint material_status_inbound_ticket_id_fk
            references inbound_ticket,
    gross             integer                                        not null,
    tare              integer                                        not null,
    net_weight        integer                                        not null,
    net_cost          numeric(15, 4)                                 not null,
    net_revenue       numeric(15, 4)
);

alter table material_status
    owner to postgres;

create table deduction
(
    id          uuid not null
        constraint deduction_pkey
            primary key,
    material_id uuid
        constraint "FK_deduction.material_id"
            references material,
    type        text,
    description text,
    amount      numeric(15, 4),
    um          text,
    note        text
);

alter table deduction
    owner to postgres;

create table finished_good_status
(
    id               uuid                                           not null
        constraint finished_good_status_pkey
            primary key,
    finished_good_id uuid                                           not null
        constraint "FK_finished_good_status.finished_good_id"
            references finished_good,
    status           text                                           not null,
    user_id          uuid                                           not null,
    date             timestamp default timezone('utc'::text, now()) not null
);

alter table finished_good_status
    owner to postgres;

create table packing_list_status
(
    id              uuid                                           not null
        constraint packing_list_status_pkey
            primary key,
    packing_list_id uuid                                           not null
        constraint "FK_packing_list_status.packing_list_id"
            references packing_list,
    status          text                                           not null,
    user_id         uuid                                           not null,
    date            timestamp default timezone('utc'::text, now()) not null

);

alter table packing_list_status
    owner to postgres;

create table inbound_ticket_status
(
    id                uuid                                           not null
        constraint inbound_ticket_status_pkey
            primary key,
    inbound_ticket_id uuid
        constraint "FK_inbound_ticket_status.inbound_ticket_id"
            references inbound_ticket,
    status            text,
    user_id           uuid,
    date              timestamp default timezone('utc'::text, now()) not null

);

alter table inbound_ticket_status
    owner to postgres;

create table customer_status
(
    id          uuid                                           not null
        constraint customer_status_pkey
            primary key,
    customer_id uuid
        constraint "FK_customer_status.customer_id"
            references customer,
    status      text,
    user_id     uuid,
    date        timestamp default timezone('utc'::text, now()) not null
);

alter table customer_status
    owner to postgres;

create table outbound_ticket_status
(
    id                 uuid                                           not null
        constraint outbound_ticket_status_pkey
            primary key,
    outbound_ticket_id uuid
        constraint "FK_outbound_ticket_status.outbound_ticket_id"
            references outbound_ticket,
    status             text,
    user_id            uuid,
    date               timestamp default timezone('utc'::text, now()) not null
);

alter table outbound_ticket_status
    owner to postgres;

create table vehicle
(
    id                      uuid                  not null
        constraint vehicle_pkey
            primary key,
    customer_id             uuid
        constraint "FK_vehicle.customer_id"
            references customer,
    plate_number            text,
    plate_state             text,
    make                    text,
    model                   text,
    body                    text,
    color                   text,
    title_number            text,
    title_state             text,
    registration_expiration timestamp,
    archive                 boolean default false not null
);

alter table vehicle
    owner to postgres;

create table location
(
    id           uuid                  not null
        constraint location_pkey
            primary key,
    customer_id  uuid
        constraint "FK_location.customer_id"
            references customer,
    yard_id      uuid                  not null
        constraint "FK_location.yard_id"
            references yard,
    name         text,
    address_1    text,
    address_2    text,
    city         text,
    state        text,
    zip          text,
    is_corporate boolean,
    is_shipping  boolean,
    notes        text,
    archive      boolean default false not null
);

alter table location
    owner to postgres;

create table contact
(
    id                 uuid                  not null
        constraint contact_pkey
            primary key,
    customer_id        uuid
        constraint "FK_contact.customer_id"
            references customer,
    location_id        uuid
        constraint "FK_contact.location_id"
            references location,
    yard_id            uuid                  not null
        constraint "FK_contact.yard_id"
            references yard,
    first_name         text,
    last_name          text,
    phone_1            integer,
    phone_2            integer,
    email              text,
    role               text,
    notes              text,
    first_name_legal   text,
    last_name_legal    text,
    address_1          text,
    address_2          text,
    city               text,
    state              text,
    zip                text,
    id_type            text,
    license_number     text,
    license_expiration timestamp,
    height             text,
    eyes               text,
    gender             text,
    hair               text,
    is_primary_contact boolean,
    archive            boolean default false not null
);

alter table contact
    owner to postgres;

create table finished_good_note
(
    id               uuid                                           not null
        constraint finished_good_note_pkey
            primary key,
    finished_good_id uuid
        constraint "FK_finished_good_note.finished_good_id"
            references finished_good,
    name             text,
    value            text,
    date             timestamp default timezone('utc'::text, now()) not null,

    user_id          uuid,
    is_internal      boolean
);

alter table finished_good_note
    owner to postgres;

create table inbound_ticket_note
(
    id                uuid                                           not null
        constraint inbound_ticket_note_pkey
            primary key,
    inbound_ticket_id uuid
        constraint "FK_inbound_ticket_note.inbound_ticket_id"
            references inbound_ticket,
    name              text,
    value             text,
    date              timestamp default timezone('utc'::text, now()) not null,

    user_id           uuid,
    is_internal       boolean
);

alter table inbound_ticket_note
    owner to postgres;

create table regrade
(
    id           uuid                                           not null
        constraint regrade_pkey
            primary key,
    yard_id      uuid                                           not null
        constraint "FK_regrade.yard_id"
            references yard,
    user_id      uuid                                           not null,
    created_date timestamp default timezone('utc'::text, now()) not null,
    from_weight  integer                                        not null,
    to_weight    integer                                        not null,
    archive      boolean   default false                        not null
);

alter table regrade
    owner to postgres;

create table regrade_to
(
    regrade_id  uuid
        constraint "FK_regrade_to.regrade_id"
            references regrade,
    material_id uuid
        constraint "FK_regrade_to.material_id"
            references material
);

alter table regrade_to
    owner to postgres;

create table regrade_from
(
    regrade_id  uuid
        constraint "FK_regrade_from.regrade_id"
            references regrade,
    material_id uuid
        constraint "FK_regrade_from.material_id"
            references material
);

create table outbound_ticket_note
(
    id                 uuid                                           not null
        constraint outbound_ticket_note_pkey
            primary key,
    outbound_ticket_id uuid
        constraint "FK_outbound_ticket_note.outbound_ticket_id"
            references outbound_ticket,
    name               text,
    value              text,
    date               timestamp default timezone('utc'::text, now()) not null,

    user_id            uuid,
    is_internal        boolean
);



alter table regrade_from
    owner to postgres;

