FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8888
ENV WEB_CONCURRENCY=3

WORKDIR /code

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --no-cache-dir --upgrade pip

# Install Python dependencies
COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt gunicorn

# Copy project
COPY . /code/

# Make start script executable
RUN chmod +x /code/start.sh

# Make port available to the world outside this container
EXPOSE 8888

# Set the default command to run the startup script
ENTRYPOINT ["/code/start.sh"]