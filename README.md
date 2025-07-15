# Project Setup Instructions

This guide provides step-by-step instructions to set up and run the project.

## Prerequisites

Make sure the following tools are installed on your system:

- **Node.js** and **npm**: [Download and install Node.js](https://nodejs.org/).
- **PostgreSQL**: [Download and install PostgreSQL](https://www.postgresql.org/download/).

## Installation Steps

### 1. Install Node.js and npm

If Node.js and npm are not installed on your system, download and install them from the [Node.js official website](https://nodejs.org/).

Verify installation:
```bash
node -v
npm -v
```

### 2. Install Required Packages

Navigate to the project directory and install the necessary dependencies:
```bash
npm install
```

### 3. Run the Server

Start the server by running the following command:
```bash
node server.js
```

### 4. Install PostgreSQL

1. Download and install PostgreSQL from the [official PostgreSQL website](https://www.postgresql.org/download/).
2. Create a new database with the following credentials:
   - **Database Name**: `Digikala`
   - **Password**: `123456`
   - **Port**: `5432`

### 5. API Documentation

Access the Swagger API documentation at:
```
http://localhost:3000/api-docs/#/
```

## Notes

- Ensure that PostgreSQL is running and properly configured before starting the server.
- Modify the database connection settings in the project configuration files if necessary.

## Troubleshooting

If you encounter issues, ensure all prerequisites are installed and running correctly. Consult the respective official documentation for detailed troubleshooting steps.
