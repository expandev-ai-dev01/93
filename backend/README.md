# Sweetify Backend API

Backend REST API for Sweetify - Sweet products catalog and sales platform.

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Architecture**: REST API
- **Data Storage**: In-memory (development phase)

## Project Structure

```
src/
├── api/                    # API Controllers
│   └── v1/                 # API Version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   ├── v1/                 # Version 1 routes
│   └── index.ts            # Main router
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your configuration
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## API Documentation

### Base URL

- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check

```
GET /health
```

Returns server health status.

### API Versioning

The API uses URL path versioning:
- `/api/v1/external/*` - Public endpoints
- `/api/v1/internal/*` - Authenticated endpoints

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 3000 |
| API_VERSION | API version | v1 |
| CORS_ORIGINS | Allowed CORS origins | localhost:3000,localhost:3001,localhost:5173 |
| CACHE_TTL | Cache time-to-live (seconds) | 3600 |
| CACHE_CHECK_PERIOD | Cache check period (seconds) | 600 |

## Development Guidelines

### Code Style

- Use TypeScript strict mode
- Follow ESLint configuration
- Use 2 spaces for indentation
- Maximum line length: 120 characters
- Use single quotes for strings

### Testing

- Write unit tests for all business logic
- Colocate test files with source files (`.test.ts`)
- Use global `tests/` directory only for shared utilities
- Maintain minimum 80% code coverage

### Commit Guidelines

- Use conventional commit messages
- Format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore

## License

MIT