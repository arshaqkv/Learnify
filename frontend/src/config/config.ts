export const config = {
    app: {
        PORT: 'http://localhost:4000/api',
        BASE_URL: 'http://localhost:4000'
    },
    google: {
        CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID
    }
}