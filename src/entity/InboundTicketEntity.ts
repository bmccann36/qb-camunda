import {
    Column,
    Entity, Generated,
    Index,
} from 'typeorm';


@Index('inbound_ticket_pkey', ['id'], {unique: true})
@Entity('inbound_ticket', {schema: 'public'})
export class InboundTicketEntity {
    @Column('uuid', {primary: true, name: 'id'})
    id: string | undefined;

    @Column({type: 'integer', name: 'external_id'})
    @Generated('increment')
    externalId: number | undefined;

    @Column('timestamp without time zone', {
        name: 'effective_date',
        nullable: true,
    })
    effectiveDate: Date | undefined;

    @Column('integer', {name: 'truck_gross', nullable: true})
    truckGross: number | undefined;

    @Column('integer', {name: 'truck_tare', nullable: true})
    truckTare: number | undefined;

    @Column('integer', {name: 'truck_net', nullable: true})
    truckNet: number | undefined;

    @Column('integer', {name: 'load_gross', nullable: true})
    loadGross: number | undefined;

    @Column('integer', {name: 'load_tare', nullable: true})
    loadTare: number | undefined;

    @Column('integer', {name: 'load_deduction', nullable: true})
    loadDeduction: number | undefined;

    @Column('integer', {name: 'load_net', nullable: true})
    loadNet: number | undefined;

    @Column('integer', {name: 'net_weight', nullable: true})
    netWeight: number | undefined;

    @Column('numeric', {
        name: 'average_cost_per_unit',
        nullable: true,
        precision: 15,
        scale: 4,
    })
    averageCostPerUnit: string | undefined;

    @Column('numeric', {
        name: 'net_cost',
        nullable: true,
        precision: 15,
        scale: 4,
    })
    netCost: string | undefined;

    @Column('boolean', {name: 'archive', nullable: true})
    archive: boolean | undefined;

    @Column('text', {name: 'carrier_name', nullable: true})
    carrierName: string | undefined;

    @Column('text', {name: 'carrier_number', nullable: true})
    carrierNumber: string | undefined;

    @Column('text', {name: 'trailer_number', nullable: true})
    trailerNumber: string | undefined;

    @Column('boolean', {name: 'is_pickup', nullable: true})
    isPickup: boolean | undefined;

    @Column('text', {name: 'purchase_order', nullable: true})
    purchaseOrder: string | undefined;

    @Column('text', {name: 'bill_of_lading', nullable: true})
    billOfLading: string | undefined;

    @Column('text', {name: 'driver_name', nullable: true})
    driverName: string | undefined;

    @Column('text', {name: 'container_number', nullable: true})
    containerNumber: string | undefined;

    @Column('text', {name: 'number_of_passengers', nullable: true})
    numberOfPassengers: string | undefined;

    @Column('uuid', {name: 'customer_id'})
    customerId: string | undefined

    @Column('uuid', {name: 'yard_id'})
    yardId: string | undefined

}
