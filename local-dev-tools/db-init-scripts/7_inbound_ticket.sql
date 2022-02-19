INSERT INTO public.inbound_ticket (id, yard_id, external_id, effective_date, truck_gross, truck_tare, truck_net,
                                   load_gross, load_tare, load_deduction, load_net, net_weight, average_cost_per_unit,
                                   net_cost, archive)
VALUES ('00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', 1, null, 0, 0, 0, 0, 0, 0, 0, 0,
        null, 0.0000, false),
       ('10000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', 1, null, 0, 0, 0, 0, 0, 0, 0, 0,
        null, 0.0000, false),

       --? rows for yard 2
       ('20000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000000', 2, null, 9720, 8540, 1180, 1755,
        592, 0, 1163, 1163, null, 0.4245, false),

       ('30000000-0000-0000-0000-000000000000', '10000000-0000-0000-0000-000000000000', 2, null, 9720, 8540, 1180, 1755,
        592, 0, 1163, 1163, null, 0.4245, false);
