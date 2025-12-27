import * as fs from 'fs';
import * as path from 'path';
import logger from './logger';

/**
 * Screenshot helper for WebdriverIO tests
 */
export default class ScreenshotTp {
    private folder: string;
    private browser: WebdriverIO.Browser;

    constructor(browser: WebdriverIO.Browser, folder: string = 'errorShots') {
        this.browser = browser;
        this.folder = folder;
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder, { recursive: true });
        }
    }

    /**
     * Take a screenshot and save with timestamp and test name
     */
    async take(testName: string): Promise<string> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${testName.replace(/\s+/g, '_')}_${timestamp}.png`;
        const filePath = path.join(this.folder, fileName);
        try {
            await this.browser.saveScreenshot(filePath);
            logger.info(`Screenshot saved: ${filePath}`);
            return filePath;
        } catch (err) {
            logger.error(`Failed to take screenshot: ${err}`);
            throw err;
        }
    }
}
