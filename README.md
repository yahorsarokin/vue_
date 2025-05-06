# Vue Todo List App

A modern Todo List application built with Vue 3, TypeScript, and Vite.

## Features

- Create, edit, and delete todos
- Mark todos as complete
- Filter todos by status
- Modern and responsive UI
- Type-safe development with TypeScript
- Fast development experience with Vite
- Firebase Firestore integration for data persistence
- Anonymous authentication

## Tech Stack

- Vue 3 - Progressive JavaScript framework
- TypeScript - Type-safe JavaScript
- Vite - Next Generation Frontend Tooling
- Vue Router - Official router for Vue.js
- Pinia - State management library for Vue
- Firebase - Authentication and Firestore database

## Project Setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

Create a `.env` file in the root of your project with the following Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

You can get these values from your Firebase project settings.

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Anonymous Authentication
4. Set up Firestore security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /todos/{todoId} {
      // Allow read and delete if the auth user ID matches the document's user ID
      allow read, delete: if request.auth != null && request.auth.uid == resource.data.uid;

      // Allow create if the auth user ID matches the incoming document's user ID
      allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;

      // Allow update if the auth user ID matches the document's user ID
      // and the update is not attempting to change the uid field
      allow update: if request.auth != null &&
                     request.auth.uid == resource.data.uid &&
                     request.resource.data.uid == resource.data.uid;
    }
  }
}
```

## Project Structure

```
src/
├── assets/         # Static assets
├── components/     # Reusable Vue components
├── views/          # Page components
├── stores/         # Pinia stores
├── router/         # Vue Router configuration
├── types/          # TypeScript type definitions
├── firebase.ts     # Firebase configuration and services
└── App.vue         # Root component
```

## Development Guidelines

- Use TypeScript for type safety
- Follow Vue 3 Composition API
- Use Pinia for state management
- Keep components small and focused
- Write meaningful commit messages
- Don't commit Firebase credentials to version control

## License

MIT
