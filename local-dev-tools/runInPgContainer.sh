


# run DDL and seed
docker exec local-dev-tools-db-1  psql -U postgres -d postgres -a -f docker-entrypoint-initdb.d/1schema.sql
docker exec local-dev-tools-db-1  psql -U postgres -d postgres -a -f docker-entrypoint-initdb.d/2seed.sql
