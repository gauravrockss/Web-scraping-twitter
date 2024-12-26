Here’s an example of a README file with instructions on how to run the project using `npm start` and access the app at `http://localhost:8001`.

````markdown
# Selenium Script Runner

This project is a simple web application that allows you to run a Selenium script and view the scraped trends from an API.

## Requirements

-   Node.js (LTS version recommended)
-   npm (comes with Node.js)

## Installation

1. Clone this repository to your local machine.

    ```bash
    git clone https://github.com/your-username/selenium-script-runner.git
    cd selenium-script-runner
    ```
````

2. Install dependencies using npm:

    ```bash
    npm install
    ```

## Running the Application

1. Start the development server:

    ```bash
    npm start
    ```

    This will start the application on `http://localhost:8001`.

2. Open your browser and navigate to `http://localhost:8001`. You should see the application running.

## How It Works

-   The page loads with a button labeled **Click here to run the script**. Clicking the button triggers the scraping process.
-   After the script runs, the trends are fetched from the backend and displayed on the page.
-   If there are no trends, it will prompt a message indicating that no trends are available.
-   If trends are available, they are shown along with their timestamp and IP address.
-   You can click a button to **Run Query Again** to refresh the trends.

## API Endpoints

-   **`GET http://localhost:8001/api/trends`**: Fetches all trends stored in the database.
-   **`POST http://localhost:8001/api/scrape-trends`**: Triggers the scraping of new trends and stores them in the database.

## Notes

-   Make sure your backend API (running on `localhost:8001`) is working correctly.
-   You can modify the server configurations and port if necessary by updating the respective files in the project.

```

### Key Points Covered:
- **Installation Instructions**: Steps to clone the repository, install dependencies, and run the project.
- **How to Start the App**: Using `npm start` to launch the app on `localhost:8001`.
- **Link to Localhost**: The app is available at `http://localhost:8001`.
- **API Endpoints**: Provides the available API endpoints for trends.

Make sure to replace `"https://github.com/your-username/selenium-script-runner.git"` with the actual URL of your repository.
```
