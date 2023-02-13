USE GadgetHub;

-- -- -- Drop all tables, run twice to drop all dependencies i.e. foreign keys

DECLARE @SQL NVARCHAR(MAX) = '';

SELECT @SQL = @SQL + 'DROP TABLE ' + QUOTENAME(TABLE_SCHEMA) + '.' + QUOTENAME(TABLE_NAME) + ';'
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_CATALOG = 'GadgetHub';

EXEC sp_executesql @SQL, N'@SQL NVARCHAR(MAX)', @SQL = @SQL;

-- -- -- Drop all stored procedures
-- DECLARE @SQL NVARCHAR(MAX) = '';

-- SELECT @SQL = @SQL + 'DROP PROCEDURE ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + ';'
-- FROM sys.procedures;

-- EXEC sp_executesql @SQL, N'@SQL NVARCHAR(MAX)', @SQL = @SQL;

-- -- -- Drop all views

-- DECLARE @SQL NVARCHAR(MAX) = '';

-- SELECT @SQL = @SQL + 'DROP VIEW ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + ';'
-- FROM sys.views;

-- EXEC sp_executesql @SQL, N'@SQL NVARCHAR(MAX)', @SQL = @SQL;

-- -- -- Drop all functions

-- DECLARE @SQL NVARCHAR(MAX) = '';

-- SELECT @SQL = @SQL + 'DROP FUNCTION ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + ';'
-- FROM sys.objects
-- WHERE type = 'FN';

-- EXEC sp_executesql @SQL, N'@SQL NVARCHAR(MAX)', @SQL = @SQL;

-- -- -- Drop all triggers

-- DECLARE @SQL NVARCHAR(MAX) = '';

-- SELECT @SQL = @SQL + 'DROP TRIGGER ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + ';'
-- FROM sys.triggers;

-- EXEC sp_executesql @SQL, N'@SQL NVARCHAR(MAX)', @SQL = @SQL;

-- -- -- Drop all user defined data types

-- DECLARE @SQL NVARCHAR(MAX) = '';

-- SELECT @SQL = @SQL + 'DROP TYPE ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + ';'
-- FROM sys.types
-- WHERE is_user_defined = 1;

-- EXEC sp_executesql @SQL, N'@SQL NVARCHAR(MAX)', @SQL = @SQL;

-- -- -- Drop all user defined table types

-- DECLARE @SQL NVARCHAR(MAX) = '';

-- SELECT @SQL = @SQL + 'DROP TYPE ' + QUOTENAME(SCHEMA_NAME(schema_id)) + '.' + QUOTENAME(name) + ';'
-- FROM sys.table_types
-- WHERE is_user_defined = 1;

-- EXEC sp_executesql @SQL, N'@SQL NVARCHAR(MAX)', @SQL = @SQL;

-- -- -- Drop all user defined aggregates

-- DECLARE @SQL NVARCHAR(MAX) = '';

-- SELECT @SQL = @SQL + 'DROP AGGREGATE ' + QUOT

