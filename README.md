# URL Shortener

A modern URL shortener application built with **React** (Vite), **Supabase** for backend services, and **Shadcn/UI** with **Tailwind CSS** for a responsive user interface. This app allows users to shorten URLs, create custom URLs, generate QR codes, and track clicks across devices.

## Features

- **Shorten URLs**: Convert long URLs into short, easy-to-share links.
- **Custom URLs**: Users can create custom short URLs for easy recall.
- **Track Clicks**: Monitor the number of clicks for each shortened URL across both desktop and mobile platforms.
- **Responsive Design**: A fully responsive interface that works across desktop and mobile devices.
- **Generate QR Code**: Create a QR code for each shortened URL for easy sharing.
- **Download URL**: Download the generated QR code for offline use.
- **Copy to Clipboard**: One-click to copy the shortened URL or custom URL to the clipboard.
- **Database Integration**: URLs and their metadata are stored using Supabase for easy retrieval and management.

## Demo

[Live Demo](https://trrimm.vercel.app/) – Explore the app in action.

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [Vite](https://vitejs.dev/) for a fast and efficient development workflow
- Supabase account to set up your database backend

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Inderpal004/Url-Shortener.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Url-Shortener
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up Supabase:

    - Create a new project on [Supabase](https://supabase.com/).
    - Get your Supabase credentials (URL and API key) and create a `.env` file:

      ```env
      VITE_SUPABASE_URL=your_supabase_url
      VITE_SUPABASE_KEY=your_supabase_api_key
      ```

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Open `http://localhost:5173` in your browser to view the application.

## Project Structure

```bash
url-shortener/
├── src/
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components (e.g., Home, Create URL)
│   ├── styles/             # Tailwind CSS styles and custom styles
│   ├── utils/              # Utility functions (e.g., Supabase client, QR code generator)
│   └── App.jsx             # Main React component
├── public/                 # Static assets (favicon, etc.)
├── .env                    # Environment variables for Supabase
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Features Breakdown

- **Custom URL Creation**: Enter a custom slug for your shortened URL to make it more memorable.
- **Click Tracking**: Track the number of times the shortened URL is clicked, including the device type (desktop or mobile).
- **QR Code Generation**: Automatically generate a QR code for the shortened URL, with an option to download it.
- **Copy to Clipboard**: Easily copy the shortened or custom URL with a single click.
- **Responsive**: The design is responsive, ensuring a seamless experience on both mobile and desktop devices.
- **Database Integration**: URLs and click stats are stored in Supabase for easy management and tracking.

## Technologies Used

- **Frontend**: React (Vite), Tailwind CSS, Shadcn/UI
- **Backend**: Supabase (for URL storage, custom URL creation, and tracking)
- **Additional Libraries**: 
  - QR code generator for creating QR codes.
  - Clipboard API for copy functionality.

## Supabase Setup

- **Supabase Database**: Manage URLs, clicks, and custom URL records.
- **Supabase API**: Handle requests for creating, reading, and tracking URLs.

## Contributing

Contributions are always welcome! Please fork the repository and submit a pull request for any new features or bug fixes.

## License

This project is licensed under the MIT License.

---
