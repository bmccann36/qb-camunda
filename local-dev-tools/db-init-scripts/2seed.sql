INSERT INTO organization (id,name)
VALUES
  (cast('00000000-0000-0000-0000-000000000000' as uuid),'lopez'),
  (cast('10000000-0000-0000-0000-000000000000' as uuid),'frontier');


-- ! YARD

INSERT INTO yard (id,organization_id,name)
VALUES
  --              id                                                  organization_id
  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),'houston'),
  (cast('10000000-0000-0000-0000-000000000000' as uuid),cast('10000000-0000-0000-0000-000000000000' as uuid),'middlesex');


INSERT INTO commodity (id,type,name,code,yard_id)
VALUES
  (cast('bac86541-57e0-45aa-a071-184fde32142f' as uuid),'Other','Plastic','PL',cast('00000000-0000-0000-0000-000000000000' as uuid)),
  (cast('e0dd5eeb-1e48-41c1-8e49-876bbef9bad3' as uuid),'NF','Copper','CU',cast('00000000-0000-0000-0000-000000000000' as uuid)),
  (cast('5b6e0287-67b1-4f11-b903-0d2b6e17f785' as uuid),'NF','Aluminum','AL',cast('00000000-0000-0000-0000-000000000000' as uuid)),
  (cast('21236277-1178-40e6-98ba-94a108d109c0' as uuid),'NF','Brass','BR',cast('00000000-0000-0000-0000-000000000000' as uuid)),
  (cast('d585e498-bf1d-46b6-9d0d-de2a5a19cfff' as uuid),'Other','Other','OT',cast('00000000-0000-0000-0000-000000000000' as uuid)),
  (cast('364ee05f-b8ab-4b9c-a2d0-bad04c6c3b64' as uuid),'NF','Insulated Cu Wire','ICW',cast('00000000-0000-0000-0000-000000000000' as uuid)),
  (cast('a00e82ee-0941-4aec-96da-d4b0a0089902' as uuid),'NF','Lead','LD',cast('00000000-0000-0000-0000-000000000000' as uuid)),

--   waste
  (cast('00000000-0000-0000-0000-000000000000' as uuid),'WASTE','WASTE','WA',cast('00000000-0000-0000-0000-000000000000' as uuid)),

  (cast('facc6a87-7372-4f95-b551-dba567b110b0' as uuid),'F','Steel','ST',cast('00000000-0000-0000-0000-000000000000' as uuid)),
  (cast('63ac0905-91a5-4b7d-89ea-d5a8e9d9e604' as uuid),'NF','Stainless Steel','SS',cast('00000000-0000-0000-0000-000000000000' as uuid));

INSERT INTO price_sheet (id,yard_id,type,date)
VALUES
  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),'generic',TIMESTAMP '2022-01-20 20:53:34.206483');

INSERT INTO customer (id,price_sheet_id,yard_id,is_supplier,is_consumer,display_name,company_name,buys_forbidden)
VALUES
  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),false,false,'name','name',false);

INSERT INTO inbound_ticket (id,customer_id,yard_id,effective_date,truck_gross,truck_tare,truck_net,load_gross,load_tare,load_deduction,load_net,net_weight,average_cost_per_unit,net_cost,carrier_name,carrier_number,container_number,is_pickup,purchase_order,bill_of_lading,driver_name,trailer_number,number_of_passengers)
VALUES
  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),TIMESTAMP '2022-01-20 21:07:16.685694',1,1,1,1,1,1,1,1,1.0000,1.0000,'A','B','C',false,'D','E','F','G','2'),
  --      id                                                        customer_id                                       yard_id
  (cast('10000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),cast('10000000-0000-0000-0000-000000000000' as uuid),TIMESTAMP '2022-01-20 21:07:16.685694',1,1,1,1,1,1,1,1,1.0000,1.0000,'A','B','C',false,'D','E','F','G','3');

-- ! MATERIAL TYPE

INSERT INTO material_type (id,commodity_id,code,common_name,yard_id)
VALUES

-- waste

  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),'WASTE','WASTE',cast('00000000-0000-0000-0000-000000000000' as uuid)),

  (cast('10000000-0000-0000-0000-000000000000' as uuid),cast('bac86541-57e0-45aa-a071-184fde32142f' as uuid),'PL','PLASTIC',cast('00000000-0000-0000-0000-000000000000' as uuid)),

  (cast('20000000-0000-0000-0000-000000000000' as uuid),cast('5b6e0287-67b1-4f11-b903-0d2b6e17f785' as uuid),'AL','ALUMINUM',cast('00000000-0000-0000-0000-000000000000' as uuid)),
  (cast('30000000-0000-0000-0000-000000000000' as uuid),cast('a00e82ee-0941-4aec-96da-d4b0a0089902' as uuid),'PB','LEAD',cast('00000000-0000-0000-0000-000000000000' as uuid)),
  -- stainless steel
  (cast('40000000-0000-0000-0000-000000000000' as uuid),cast('63ac0905-91a5-4b7d-89ea-d5a8e9d9e604' as uuid),'stainlessSteel','stainless steel',cast('00000000-0000-0000-0000-000000000000' as uuid));

-- ! MATERIAL

INSERT INTO material (id,material_type_id,inbound_ticket_id,outbound_ticket_id,finished_good_id,yard_id,gross,tare,archive,derived_from_material_id)
VALUES
--         id,                                              material_type_id,                                          inbound_ticket_id,                           outbound_ticket_id,finished_good_id,yard_id,gross,tare,archive,derived_from_material_id
  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),cast(NULL as uuid),cast(NULL as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),NULL,NULL,false,cast(NULL as uuid)),
  (cast('10000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),cast(NULL as uuid),cast(NULL as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),NULL,NULL,false,cast(NULL as uuid)),
  (cast('20000000-0000-0000-0000-000000000000' as uuid),cast('40000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),cast(NULL as uuid),cast(NULL as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),NULL,NULL,false,cast(NULL as uuid));


-- ! MATERIAL_STATUS

INSERT INTO material_status (id,material_id,status,user_id,date,inbound_ticket_id,gross,tare,net_weight,net_cost,net_revenue)
VALUES
  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),'WIP',cast('00000000-0000-0000-0000-000000000000' as uuid),TIMESTAMP '2022-01-20 20:53:34.206483',cast(NULL as uuid),102,2,10,1.0000,100.0000),
  (cast('10000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),'WIP',cast('00000000-0000-0000-0000-000000000000' as uuid),TIMESTAMP '2022-01-19 20:53:34.206483',cast(NULL as uuid),102,2,10,1.0000,100.0000),
  (cast('20000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),'WIP',cast('00000000-0000-0000-0000-000000000000' as uuid),TIMESTAMP '2022-01-21 20:53:34.206483',cast(NULL as uuid),102,2,10,1.0000,100.0000),
  (cast('30000000-0000-0000-0000-000000000000' as uuid),cast('10000000-0000-0000-0000-000000000000' as uuid),'WIP',cast('00000000-0000-0000-0000-000000000000' as uuid),TIMESTAMP '2021-12-21 20:53:34.206483',cast(NULL as uuid),102,2,100000,1.0000,100.0000),
  (cast('40000000-0000-0000-0000-000000000000' as uuid),cast('20000000-0000-0000-0000-000000000000' as uuid),'WIP',cast('00000000-0000-0000-0000-000000000000' as uuid),TIMESTAMP '2021-12-21 20:53:34.206483',cast(NULL as uuid),102,2,100000,1.0000,100.0000);


-- ! IBT_STATUS

INSERT INTO inbound_ticket_status (id,inbound_ticket_id,status,user_id,date)
VALUES
(cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),'PRICE_COMPLETE',cast('00000000-0000-0000-0000-000000000000' as uuid),TIMESTAMP '2022-01-20 20:53:34.206483');

-- ! REGRADE

INSERT INTO regrade (id,yard_id,user_id,created_date,from_weight,to_weight,archive)
VALUES
  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),TIMESTAMP '2022-01-28 15:15:07.698811',10,4,false);


-- ! FROM / TO MATERIALS

INSERT INTO regrade_from (regrade_id,material_id)
VALUES
  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid));

INSERT INTO regrade_to (regrade_id,material_id)
VALUES
  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid));


-- ! CUSTOMER_STATUS

INSERT INTO customer_status (id,customer_id,status,user_id)
VALUES
  (cast('00000000-0000-0000-0000-000000000000' as uuid),cast('00000000-0000-0000-0000-000000000000' as uuid),'boring',cast(NULL as uuid));