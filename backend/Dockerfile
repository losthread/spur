# specify base image for python
FROM python:3.13-slim

# select working directory
WORKDIR /app

# copy the requirements txt to app for dependencies
COPY requirements.txt .

# install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# copy the code
COPY . .

# Expose the port on which the app will run
EXPOSE 8000

# Run fastapi uvicorn server (0.0.0.0 accepts request from every host) 
CMD ["uvicorn", "src.app.core.main:app", "--host", "0.0.0.0", "--port", "8000"]