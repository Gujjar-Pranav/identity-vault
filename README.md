# Identity Vault

**Identity Vault** is a full-stack identity management application built with **FastAPI**, **Next.js**, **Google OAuth**, and **PostgreSQL**.

It allows users to sign in securely with their Google account, stores only the required profile details in a database, generates a unique identity ID for each user, and provides a clean dashboard to search and retrieve user information using that generated ID.

## Application Purpose

Identity Vault works as a Google OAuth-based identity registry. It converts a verified Google profile into a database-backed internal identity record with a unique generated ID for secure lookup.

----

## Live Demo

**Frontend**

```text
https://identity-vault-tau.vercel.app
```

**Backend**

```text
https://identity-vault-api.onrender.com
```

**Health Check**

```text
https://identity-vault-api.onrender.com/health
```

---

## Features

- Google OAuth login
- Stores authenticated user profile details:
  - Name
  - Email
  - Google ID
  - Profile photo URL
  - Unique generated ID
- Dashboard with generated ID display
- Copy generated ID
- Lookup user details by generated ID
- Shows `Try Again` when an ID does not exist
- FastAPI backend APIs
- SQLite support for local development
- PostgreSQL support for production
- Environment-based secret configuration
- Deployed frontend on Vercel
- Deployed backend on Render
- Neon PostgreSQL production database
- GitHub Actions CI for backend and frontend checks

---

## Tech Stack

### Backend

- FastAPI
- SQLAlchemy
- Authlib
- PostgreSQL / SQLite
- Pydantic Settings
- Uvicorn
- Pytest
- Ruff

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Lucide React

### Deployment

- Render
- Vercel
- Neon PostgreSQL
- GitHub Actions

---

## Project Structure

```text
identity-vault/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── health.py
│   │   │   └── users.py
│   │   ├── services/
│   │   │   └── oauth.py
│   │   ├── utils/
│   │   │   └── id_generator.py
│   │   ├── config.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── tests/
│   │   └── test_main.py
│   ├── .env.example
│   ├── render.yaml
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   └── GoogleSignInButton.tsx
│   │   └── lib/
│   │       ├── api.ts
│   │       └── types.ts
│   ├── .env.example
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
└── README.md
```

---

## Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate

pip install -r requirements.txt
```

Create a backend `.env` file:

```env
ENVIRONMENT=development

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

SECRET_KEY=your_secret_key

DATABASE_URL=sqlite:///./identity_vault.db

FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:8000
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

Backend will run at:

```text
http://localhost:8000
```

API docs:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Create a frontend `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:3000
```

---

## Google OAuth Configuration

Create a Google OAuth client in Google Cloud Console.

For local development, add:

### Authorized JavaScript origins

```text
http://localhost:3000
http://localhost:8000
```

### Authorized redirect URIs

```text
http://localhost:8000/auth/google/callback
```

For production, add:

### Authorized JavaScript origins

```text
https://identity-vault-tau.vercel.app
https://identity-vault-api.onrender.com
```

### Authorized redirect URIs

```text
https://identity-vault-api.onrender.com/auth/google/callback
```

---

## API Endpoints

### Health Check

```http
GET /health
```

### Start Google Login

```http
GET /auth/google
```

### Google OAuth Callback

```http
GET /auth/google/callback
```

### Logout

```http
GET /auth/logout
```

### Current Logged-In User

```http
GET /api/me
```

### Lookup User by Generated ID

```http
GET /api/users/lookup/{generated_id}
```

If the ID exists, the API returns the stored user details.

If the ID does not exist, the API returns:

```json
{
  "success": false,
  "message": "Try Again",
  "data": null
}
```

---

## Environment Variables

### Backend

| Variable | Description |
|---|---|
| `ENVIRONMENT` | `development` or `production` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `SECRET_KEY` | Session secret key |
| `DATABASE_URL` | SQLite or PostgreSQL database URL |
| `FRONTEND_URL` | Frontend application URL |
| `BACKEND_URL` | Backend application URL |

### Frontend

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BACKEND_URL` | Backend API base URL |

---

## Database

Local development uses SQLite:

```env
DATABASE_URL=sqlite:///./identity_vault.db
```

Production uses Neon PostgreSQL:

```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

The backend normalizes PostgreSQL URLs for SQLAlchemy compatibility.

---

## Deployment

### Backend

Backend is deployed on Render.

Render start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Required Render environment variables:

```env
ENVIRONMENT=production
DATABASE_URL=your_neon_postgresql_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SECRET_KEY=your_secret_key
FRONTEND_URL=https://identity-vault-tau.vercel.app
BACKEND_URL=https://identity-vault-api.onrender.com
```

### Frontend

Frontend is deployed on Vercel.

Vercel settings:

```text
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Install Command: npm install
Output Directory: leave empty
```

Required Vercel environment variable:

```env
NEXT_PUBLIC_BACKEND_URL=https://identity-vault-api.onrender.com
```

---

## CI/CD

GitHub Actions runs automatically on push and pull requests to `main`.

CI checks include:

- Backend dependency installation
- Ruff lint check
- Ruff format check
- Pytest backend tests
- FastAPI app import check
- Frontend dependency installation
- Next.js production build

Workflow file:

```text
.github/workflows/ci.yml
```

---

## Security & Privacy

- Secrets are managed through environment variables.
- `.env` and `.env.local` files are excluded from Git.
- Google OAuth uses only basic profile scopes.
- The app stores only the required profile details:
  - Name
  - Email
  - Google ID
  - Profile photo URL
  - Generated identity ID
- The app does not store Google passwords.
- The app does not store Google access tokens or refresh tokens.
- The app does not access contacts, calendar, Drive, or location data.
- CORS is restricted using configured frontend/backend URLs.
- SQLAlchemy ORM is used for database operations.

---

## Product Scope

Identity Vault includes the complete authentication and identity lookup flow:

- Google Sign In through OAuth
- Authenticated dashboard experience
- Generated identity ID display
- ID lookup textbox and submit button
- Database-backed user profile storage
- Stores name, email, Google ID, profile photo URL, and generated identity ID
- Dedicated FastAPI endpoint for generated ID lookup
- Returns user details when a valid generated ID exists
- Returns `Try Again` when the generated ID does not exist
- Modular FastAPI backend
- Professional project structure
- `requirements.txt` for backend dependencies
- Environment variables for secrets and API keys
- Live deployment with Vercel, Render, and Neon PostgreSQLbonus

---

## Author

Pranav Gujjar
