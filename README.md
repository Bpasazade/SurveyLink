# SurveyLink 🚀

SurveyLink is a web application that allows businesses and individual users to easily create, send, and analyze surveys. Users can upload their survey templates, create campaigns, and send them via SMS to a targeted audience. Afterward, users can view statistical results and visualizations of their survey responses.

## Features 🌟

- **Create and Upload Surveys**: Users can upload their survey templates through the portal.
- **Campaign Management**: Businesses or individuals can link their surveys with campaigns.
- **SMS Integration**: Users can send surveys to a wider audience by using SMS data they already have or can access through the platform.
- **Survey Results and Analysis**: Users can view survey results, including detailed statistics and visualizations.
- **Template Design (Future Feature)**: Users will be able to design their own templates through the portal.

## Installation 🛠️

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Bpasazade/SurveyLink.git
    ```

2. Navigate to the backend directory:
    ```bash
    cd surveylink/sl-backend
    ```

3. Install required dependencies:
    ```bash
    npm install
    ```

4. Configure your MongoDB connection and set up necessary environment variables.

5. Start the backend server:
    ```bash
    npm run dev
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd surveylink/sl-frontend
    ```

2. Install required dependencies:
    ```bash
    npm install
    ```

3. Start the frontend application:
    ```bash
    npm run dev
    ```

## Libraries Used 📚

### Backend:
- `axios` (v0.21.1): For making HTTP requests.
- `bcryptjs` (v2.4.3): For password hashing.
- `mongoose` (v5.12.3): For interacting with MongoDB.
- `jsonwebtoken` (v8.5.1): For JSON Web Token authentication.
- `express` (v4.17.1): For creating the server.
- `multer` (v1.4.2): For handling file uploads.
- `moment` (v2.29.1): For date and time management.

### Frontend:
- `svelte` (v3.38.2): A modern, fast, and reactive UI framework.
- `axios` (v0.21.1): For making API requests.
- `chart.js` (v3.2.1) and `echarts` (v5.1.1): For visualizing data and analytics.
- `grapesjs` (v0.17.26): For creating web page templates.

## Future Features 🚧

- Users will be able to design their own templates through the portal.
