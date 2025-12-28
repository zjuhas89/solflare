import Page from './page';
import { $ } from '@wdio/globals';

class RecoveryPhrase extends Page {
    // Button to start onboarding and create a new wallet.
    public get btnNewWallet() { return $('[data-testid="btn-need-new-wallet"]'); }

    // Separate locators for each of the 12 recovery phrase words using data-testid
    public get recoveryWord1() { return $('[data-testid="input-recovery-phrase-1"]'); }
    public get recoveryWord2() { return $('[data-testid="input-recovery-phrase-2"]'); }
    public get recoveryWord3() { return $('[data-testid="input-recovery-phrase-3"]'); }
    public get recoveryWord4() { return $('[data-testid="input-recovery-phrase-4"]'); }
    public get recoveryWord5() { return $('[data-testid="input-recovery-phrase-5"]'); }
    public get recoveryWord6() { return $('[data-testid="input-recovery-phrase-6"]'); }
    public get recoveryWord7() { return $('[data-testid="input-recovery-phrase-7"]'); }
    public get recoveryWord8() { return $('[data-testid="input-recovery-phrase-8"]'); }
    public get recoveryWord9() { return $('[data-testid="input-recovery-phrase-9"]'); }
    public get recoveryWord10() { return $('[data-testid="input-recovery-phrase-10"]'); }
    public get recoveryWord11() { return $('[data-testid="input-recovery-phrase-11"]'); }
    public get recoveryWord12() { return $('[data-testid="input-recovery-phrase-12"]'); }

    // Button to confirm recovery phrase has been saved.
    public get btnSavedRecoveryPhrase() { return $('button=I saved my recovery phrase'); }

    // Button to continue to the next onboarding step.
    public get btnContinue() { return $('button=Continue'); }

    async getRecoveryPhrases(): Promise<string[]> {
        const words: string[] = [];

        for (let i = 1; i <= 12; i++) {
            const input = await $(`[data-testid="input-recovery-phrase-${i}"]`);
            await input.waitForDisplayed();
            words.push(await input.getValue());
        }
        return words;
    }

    async enterRecoveryPhrase(words: string[]): Promise<void> {
        for (let i = 0; i < words.length; i++) {
            const input = await $(`[data-testid="input-recovery-phrase-${i + 1}"]`);
            await input.waitForDisplayed();
            await input.setValue(words[i]);
        }
    }

}

export default new RecoveryPhrase();
