# Share Gizz - Share files effortlessly, anywhere, anytime

A modern web application for secure file sharing and management.

## Overview

This application provides a platform for users to upload, share, and manage files securely. Built with a React frontend and Node.js backend, it offers a responsive and intuitive interface for file operations.

## Features

- Secure file upload and storage
- File sharing with permission controls
- User authentication and authorization
- Responsive design for desktop and mobile devices
- Real-time updates and notifications

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express
- MongoDB (with Mongoose)
- AWS SDK for storage integration

## Architecture

### AWS Infrastructure

- **S3**: Used for secure file storage and retrieval
- **IAM**: For managing access permissions to AWS resources
- **CloudFront** (optional): For content delivery and caching

### Database

- MongoDB for storing user data, file metadata, and permissions

### Authentication

- JWT (JSON Web Tokens) for secure authentication
- bcrypt for password hashing

### File Management

- Multer for handling file uploads
- AWS S3 for permanent storage
- Support for file archiving with Archiver

### Security

- HTTPS for secure data transmission
- Environment variables for sensitive configuration
- Cross-Origin Resource Sharing (CORS) protection

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud-based)
- AWS account with S3 bucket configured

### Environment Setup

Create a `.env` file in the server directory with the following variables:

```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name
```

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/file-sharing-app.git
cd file-sharing-app
```

2. Install dependencies for both client and server

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### Running the Application

#### Development Mode

1. Start the server

```bash
cd server
npm run dev
```

2. Start the client in a new terminal

```bash
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

#### Production Mode

1. Build the client

```bash
cd client
npm run build
```

2. Start the server in production mode

```bash
cd server
npm start
```

## Project Structure

```
file-sharing-app/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/                # Source files
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Data models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile

### Files

- `POST /api/files/upload` - Upload a file
- `GET /api/files` - Get all files for the user
- `GET /api/files/:id` - Get a specific file
- `DELETE /api/files/:id` - Delete a file
- `POST /api/files/:id/share` - Share a file with other users

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [AWS SDK](https://aws.amazon.com/sdk-for-javascript/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

File Sharing Application

