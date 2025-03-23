export const config = {
    app: {
        PORT: `${import.meta.env.VITE_APP_API_BASE_URL}/api`,
        BASE_URL: import.meta.env.VITE_APP_API_BASE_URL
    },
    google: {
        CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID
    },
    recaptcha: {
        RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY
    }
}