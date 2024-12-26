import { v4 as uuidv4 } from 'uuid';
import Trend from '../models/Trend.js';
import { getLocalIPAddress } from '../utils/ipUtils.js';
import { Builder, By, Key, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome.js';
import APIException from '../classes/APIException.js';

const twitterUsername = process.env.TWITTER_USERNAME;
const twitterPassword = process.env.TWITTER_PASSWORD;
const twitterEmail = process.env.TWITTER_EMAIL;

const HEADLESS_MODE = '--headless'; // Run browser in headless mode
const DISABLE_GPU = '--disable-gpu'; // Disable GPU acceleration
const NO_SANDBOX = '--no-sandbox'; // Disable sandboxing
const DISABLE_DEV_SHM_USAGE = '--disable-dev-shm-usage'; // Prevent memory issues
const MAX_TRENDS = 5;

const USERNAME_FIELD_SELECTOR = 'input[autocomplete="username"]';
const EMAIL_FIELD_SELECTOR = 'input[data-testid="ocfEnterTextTextInput"]';
const PASSWORD_FIELD_SELECTOR = 'input[autocomplete="current-password"]';

export async function scrapeTwitterTrends() {
    const ipAddress = getLocalIPAddress();

    // Configure Chrome options for headless mode
    const options = new Options();
    options.addArguments(HEADLESS_MODE);
    options.addArguments(DISABLE_GPU);
    options.addArguments(NO_SANDBOX);
    options.addArguments(DISABLE_DEV_SHM_USAGE);

    // Initialize the WebDriver with Chrome options
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Step 1: Login to Twitter
        await driver.get('https://x.com/i/flow/login');
        await driver.wait(until.elementLocated(By.css(USERNAME_FIELD_SELECTOR)), 10000);

        const usernameField = await driver.findElement(By.css(USERNAME_FIELD_SELECTOR));
        await usernameField.sendKeys(twitterUsername, Key.RETURN);
        console.log('Username entered');

        // Step 2: Handle email verification (if required)
        try {
            await driver.wait(until.elementLocated(By.css(EMAIL_FIELD_SELECTOR)), 5000);
            const emailField = await driver.findElement(By.css(EMAIL_FIELD_SELECTOR));
            await emailField.sendKeys(twitterEmail, Key.RETURN);
            console.log('Email verification completed');
        } catch (e) {
            console.log('Email verification not required');
        }

        // Step 3: Enter password and login
        await driver.wait(until.elementLocated(By.css(PASSWORD_FIELD_SELECTOR)), 10000);
        const passwordField = await driver.findElement(By.css(PASSWORD_FIELD_SELECTOR));
        await passwordField.sendKeys(twitterPassword, Key.RETURN);
        console.log('Logged in successfully');

        // Step 4: Navigate to the Explore page to view trends
        await driver.wait(until.elementLocated(By.css('a[href="/explore"]')), 10000);
        const exploreLink = await driver.findElement(By.css('a[href="/explore"]'));
        await exploreLink.click();

        console.log('Navigated to Explore page');

        // Step 5: Wait for trends to load
        await driver.wait(until.elementLocated(By.css('div[data-testid="trend"] span')), 15000);

        const trendElements = await driver.findElements(By.css('div[data-testid="trend"] span'));
        const trends = new Set();

        // Step 6: Extract trends starting with #
        for (let i = 0; i < trendElements.length && trends.size < MAX_TRENDS; i++) {
            const element = trendElements[i];
            const text = await element.getText();
            if (text.startsWith('#')) {
                trends.add(text); // Add to Set to avoid duplicates
            }
        }

        if (trends.size === 0) {
            throw new APIException('No trends starting with # found');
        }

        console.log('Captured Trends:', Array.from(trends));

        // Step 7: Save trends to MongoDB under one document
        const requestId = uuidv4(); // Generate a unique request ID
        const trendData = {
            topics: Array.from(trends),
            requestId,
            ipAddress,
            timestamp: new Date(),
        };

        // Save the trends as a single document in MongoDB
        await Trend.create(trendData);
        console.log('Trends saved to MongoDB:', trendData);

        return trendData;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        await driver.quit();
    }
}
