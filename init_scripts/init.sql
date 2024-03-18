CREATE USER duplo_admin WITH PASSWORD 'Password$';
CREATE DATABASE duplo;
GRANT ALL PRIVILEGES ON DATABASE duplo TO duplo_admin;
GRANT ALL PRIVILEGES ON SCHEMA public TO duplo_admin;
ALTER USER duplo_admin WITH SUPERUSER;

/**
Incase user doesn't get appropriate privileges, use command below. Remove if it does

ALTER USER duplo_admin WITH SUPERUSER;

**/
