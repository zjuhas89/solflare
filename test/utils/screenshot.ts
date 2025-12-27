import * as fs from 'fs';
import * as path from 'path';

/**
 * Minimal browser interface
 * (only what we actually use)
 */
interface BrowserLike {
    saveScreenshot(filePath: string): Promise<Buffer>;
}

/**
 * Screenshot helper without @wdio/types
 */
export default class Screenshot {
    private folder: string;
    private browser: BrowserLike;

    constructor(browser: BrowserLike, folder: string = 'screenshots') {
        this.browser = browser;
        this.folder = folder;

        // Ensure folder exists
        if (!fs.existsSync(this.folder)) {
            fs.mkdirSync(this.folder, { recursive: true });
        }
    }

    /**
     * Clear all existing screenshots in the folder
     */
    clearAll(): void {
        if (!fs.existsSync(this.folder)) return;

        for (const file of fs.readdirSync(this.folder)) {
            const filePath = path.join(this.folder, file);
            if (fs.lstatSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        }

        console.log(`All screenshots cleared from ${this.folder}`);
    }

    /**
     * Take a screenshot and save with timestamp and test name
     */
    async take(testName: string): Promise<string> {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileName = `${testName.replace(/\s+/g, '_')}_${timestamp}.png`;
        const filePath = path.join(this.folder, fileName);

        try {
            if (typeof this.browser.saveScreenshot !== 'function') {
                throw new Error('browser.saveScreenshot is not a function');
            }
            // const result = await this.browser.saveScreenshot(filePath);
            if (!fs.existsSync(filePath)) {
                throw new Error(`Screenshot was not saved: ${filePath}`);
            }
            console.log(`Screenshot saved: ${filePath}`);
            return filePath;
        } catch (err) {
            console.error('Failed to take screenshot:', err);
            throw err;
        }
    }
}
