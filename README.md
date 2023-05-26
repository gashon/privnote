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

1. Clone the repository: `git clone https://github.com/gashon/secret-send`
2. Move into the directory: `cd secret-send`
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
