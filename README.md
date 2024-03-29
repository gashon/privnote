# PrivNote v.2

## Overview

PrivNote v.2 is a free service that lets you send secret messages.

## Key Directories and Files

- `src/app/`: Application pages.
- `src/features/`: Stores different features used in the app.
- `src/server/`: Holds the server-side code.
- `src/server/db/`: Contains database related files, including migrations.
- `src/utils/`: Utilities used in the application.
- `src/components/`: Stores reusable React components.
- `src/lib/`: Contains library functions.
- `public/`: Stores static files like images.
- `.env`: Environment variables file.

## Prerequisites

- Node.js (v16 or later)
- Docker

## Installation

1. Clone the repository: `git clone https://github.com/gashon/privnote`
2. Move into the directory: `cd privnote`
3. Install dependencies: `pnpm install` (or `npm install` if you prefer)

## Running the Application Locally

1. Create a `.env` file and fill it with the necessary environment variables based on the `.env.example` file.
2. Start docker
3. Run the app in the development mode: `pnpm run dev`
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Building for Production

1. Build the app for production: `pnpm run build`
2. Start the server: `pnpm run start`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

<!-- Analytics  -->

![](https://analytics-fawn-nine.vercel.app/api/analytics/github/beacon?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JfaWQiOiJlOWJhM2U0ZC0yOTI4LTQxZTYtOTQ2ZS1lNTAwZWUyNzRkYTciLCJwcm9qZWN0X2lkIjoiNDE3OGYwOWMtMTFmZi00YTZjLWI0ZDQtMDBiMjhhNmM2OGI4IiwiY3JlYXRlZF9hdCI6IjIwMjQtMDEtMTBUMDM6NTY6NDEuMzIzWiIsImlhdCI6MTcwNDg1OTAwMX0.ZvZAyQlvvh5SGyZVo4BgomOPmjR6gpa6dSZmsQfkZZg)
