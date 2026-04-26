# Welcome to your OnSpace project

## How can I edit this code?

There are several ways of editing your application.

**Use OnSpace**

Simply visit the [OnSpace Project]() and start prompting.

Changes made via OnSpace will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in OnSpace.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [OnSpace]() and click on Share -> Publish.

## Monetization setup (Trial + Pro)

This project now includes:
- 7-day free trial (1 website)
- Pro plan at ₹199/month (2 websites)
- Auto-unpublish on expiry
- Upgrade flow via Razorpay checkout
- Plan status sync via Firestore (with localStorage fallback)

### Required env variables

Create `.env` with:

```bash
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=your_secret_here
PORT=5000
VITE_API_BASE_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_DATABASE_URL=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

> Keep `RAZORPAY_KEY_SECRET` only on backend. Do not expose it in frontend env vars.

### Run frontend + payment backend

```bash
# terminal 1
npm run server

# terminal 2
npm run dev
```

> Keep `RAZORPAY_KEY_SECRET` only on backend. Do not expose it in frontend env vars.

### Run frontend + payment backend

```bash
# terminal 1
npm run server

# terminal 2
npm run dev
```

If Firebase env vars are not provided, subscription state still works locally via localStorage.

## TezWeb foundation (Phase 1)

Project scaffolding now includes a clear split between mobile-first frontend experiences and backend API modules:

- `src/components/features/PublicDashboard.tsx` for the unauthenticated dashboard showcasing 30-second generation UX.
- `src/lib/api.ts` for typed frontend API helpers.
- `server/routes/*` modular API endpoints for health, OTP auth flow, AI generation, publishing, and payments.
- `server/config/env.js` for centralized environment configuration.

### API endpoints scaffolded

- `POST /api/auth/request-otp`
- `POST /api/auth/verify-otp`
- `POST /api/generate`
- `POST /api/publish`
- `POST /api/payments/create-order`
- `GET /api/health`
