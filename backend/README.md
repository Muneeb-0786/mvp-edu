# Backend

This directory contains a small Express server that connects to Postgres.

## Running the server

1. Install dependencies (Express, pg, dotenv, @google/generative-ai): `npm install`
2. Create a `.env` file with `DATABASE_URL` pointing to your Postgres database and `GEMINI_API_KEY` for the AI service.
3. Start the server:
   ```bash
   npm start
   ```

The server exposes a single `/api/recommendations` endpoint used by the front end.
