# WayStay - Firebase Authentication with shadcn/ui

A Next.js application with Firebase Authentication using shadcn/ui components.

## Features

- 🔐 Firebase Authentication (Email/Password, Google & Phone)
- 🎨 shadcn/ui components
- 📱 Responsive design
- 🔒 Protected routes
- 👤 User dashboard
- ⚡ TypeScript support

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Authentication and add Email/Password, Google, and Phone providers
   - For Google: Add your domain to authorized domains
   - For Phone: Ensure you have set up reCAPTCHA properly
4. Get your Firebase configuration from Project Settings > General > Your apps

### 3. Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Replace the placeholder values with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with AuthProvider
│   └── page.tsx            # Main page with protected route
├── components/
│   ├── auth/
│   │   ├── AuthComponent.tsx    # Main auth component
│   │   ├── LoginForm.tsx        # Login form
│   │   ├── SignupForm.tsx       # Signup form
│   │   ├── PhoneAuthForm.tsx    # Phone authentication form
│   │   └── ProtectedRoute.tsx   # Route protection
│   ├── ui/
│   │   ├── button.tsx      # Button component
│   │   ├── card.tsx        # Card component
│   │   ├── input.tsx       # Input component
│   │   └── label.tsx       # Label component
│   └── Dashboard.tsx       # User dashboard
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── lib/
│   └── firebase.ts         # Firebase configuration
└── styles/
    └── globals.css         # Global styles
```

## Components Used

All components are built using shadcn/ui patterns:

- **Button**: Multiple variants (default, outline, destructive, etc.)
- **Card**: Container component for forms and content
- **Input**: Form input with proper styling and focus states
- **Label**: Accessible form labels

## Authentication Features

- ✅ Email/Password signup and login
- ✅ Google OAuth authentication
- ✅ Phone number authentication with SMS verification
- ✅ Protected routes
- ✅ User session management
- ✅ Logout functionality
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation
- ✅ reCAPTCHA integration for phone auth

## Usage

1. **New users**: Choose from multiple signup options:
   - Email/Password registration
   - Google sign-in
   - Phone number verification
2. **Existing users**: Use any authentication method to sign in
3. **Phone verification**: Enter phone number → receive SMS → enter verification code
4. **Dashboard**: After authentication, users see their profile information
5. **Logout**: Use the "Sign Out" button in the dashboard

## Customization

- Modify `components/ui/*` to customize component styles
- Update `components/auth/*` to add new authentication features
- Extend `Dashboard.tsx` to add more user functionality
- Customize Firebase providers in `lib/firebase.ts`

## Security Notes

- Environment variables are prefixed with `NEXT_PUBLIC_` for client-side access
- Firebase security rules should be configured in the Firebase Console
- Phone authentication uses reCAPTCHA for bot protection
- Consider implementing rate limiting for authentication attempts
- Consider implementing additional validation on the server side