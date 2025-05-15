#!/bin/bash

# Export data from Docker PostgreSQL
echo "Dumping data from Docker PostgreSQL..."
docker exec -t your-postgres-container pg_dump -U postgres postgres > docker_db_backup.sql

# Clean up the SQL file to make it compatible with Render PostgreSQL
echo "Cleaning up the SQL file..."
sed -i 's/Owner: postgres/Owner: your_render_db_user/g' docker_db_backup.sql

# Import data to Render PostgreSQL
echo "Importing data to Render PostgreSQL..."
PGPASSWORD=your_render_password psql -h your-render-host -U your_render_user -d your_render_db < docker_db_backup.sql

echo "Migration completed!" 