# Use a lightweight Python 3.12 image as the base
FROM python:3.12-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the dependencies file to the container
COPY requirements.txt .

# Update package lists to ensure latest versions are available
RUN apt update

# Install necessary system dependencies for Python and compiling packages
RUN apt install python3 python3-pip python3-dev libffi-dev gcc -y

# Install Python dependencies from the requirements file without using cache
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files into the container
COPY . .

# Expose port 5000 for the application to listen on
EXPOSE 5000

# Define the command to run the application
CMD [ "python", "app.py" ]
