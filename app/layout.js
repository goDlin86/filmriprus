import { Analytics } from '@vercel/analytics/react'

import '../styles/globals.css'

export default function Layout({ children }) {
    return (
        <html lang="en">
            <head>
                <title>FILMrip</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#0d1117" />
                <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
                <link rel="icon" href="/movie.svg" />
                <link rel="mask-icon" href="/movie.svg" color="white" />
            </head>

            <body>
                <Analytics />
                {children}
            </body>
        </html>
    )
}