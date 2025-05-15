FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8888
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432

WORKDIR /code

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    libpq-dev \
    netcat-traditional \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip

# Install Python dependencies
COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . /code/

# Make start script executable
RUN chmod +x /code/start.sh

# Make port 8000 available to the world outside this container
EXPOSE 8888

# Run the startup script
CMD ["/code/start.sh"]