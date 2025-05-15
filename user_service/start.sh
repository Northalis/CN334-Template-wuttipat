#!/bin/bash

# Parse DATABASE_URL to get PostgreSQL connection details
if [ -n "$DATABASE_URL" ]; then
    # Extract host and port from DATABASE_URL
    POSTGRES_HOST=$(echo $DATABASE_URL | awk -F[@/:] '{print $4}')
    POSTGRES_PORT=$(echo $DATABASE_URL | awk -F[@/:] '{print $5}')
fi

# Set default port if not set
export PORT="${PORT:-8888}"

echo "Starting with PORT=$PORT"
echo "Database host: $POSTGRES_HOST"
echo "Database port: $POSTGRES_PORT"

# Wait for database to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! nc -z $POSTGRES_HOST $POSTGRES_PORT; do
  sleep 0.1
done
echo "PostgreSQL is ready!"

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Create superuser
echo "Ensuring superuser exists..."
python manage.py ensure_superuser

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn
echo "Starting Gunicorn on port $PORT..."
exec gunicorn user_service.wsgi:application --bind 0.0.0.0:$PORT --workers 3 --timeout 120