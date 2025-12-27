import recoveryPhrase from '../pageobjects/recoveryPhrase.page';
import createPasswordPage from '../pageobjects/createPassword.page';
import walletManagementPage from '../pageobjects/walletManagement.page';
import { expect } from 'chai';
import logger from '../../utils/logger';

describe('Solflare Onboarding E2E', () => {
    it('should onboard and manage wallets', async () => {

        logger.info('Starting Solflare Onboarding E2E Test');
        // 1. Go to onboarding page
        await browser.url('https://solflare.com/onboard');
        logger.info('Navigated to onboarding page');

        // 2. Click on button I need a new wallet
        await recoveryPhrase.btnNewWallet.click();
        logger.info('Clicked "I need a new wallet"');

        // 3. Read the given recovery phrase
        const recoveryPhraseString: string[] = await recoveryPhrase.getRecoveryPhrases();
        logger.info(`Recovery phrase received: ${recoveryPhraseString.length} words`);
        // Assertions 
        expect(recoveryPhraseString).to.have.length(122);
        recoveryPhraseString.forEach(word => expect(word).to.not.be.empty);

        // 4. Click on button I saved my recovery phrase
        await recoveryPhrase.btnSavedRecoveryPhrase.click();
        logger.info('Clicked "I saved my recovery phrase"');

        // 5. Enter the recovery phrase (do not paste)
        await recoveryPhrase.enterRecoveryPhrase(recoveryPhraseString);
        logger.info('Entered recovery phrase');

        // 6. Click on button Continue
        await recoveryPhrase.btnContinue.click();
        logger.info('Clicked Continue after entering recovery phrase');

        // 7. Enter password
        await createPasswordPage.passwordInput.setValue('TestPassword123!');
        logger.info('Entered password');

        // 8. Enter the same password to the second input field
        await createPasswordPage.passwordConfirmInput.setValue('TestPassword123!');
        logger.info('Confirmed password');

        // 9. Click on button Continue
        await recoveryPhrase.btnContinue.click();
        logger.info('Clicked Continue after confirming password');

        // 10. Click on button I agree, let’s go
        await createPasswordPage.btnAgreeLetsGo.click();
        logger.info('Clicked "I agree, let’s go"');

        // 11. Click on button Wallet management (Avatar)
        await walletManagementPage.avatarButton.click();
        logger.info('Opened wallet management (avatar)');

        // 12. Verify that the Main wallet is displayed
        expect(await walletManagementPage.mainWalletLabel.isDisplayed()).to.be.true;
        logger.info('Verified Main wallet is displayed');

        // 13. Open side menu - wallet picker
        await walletManagementPage.btnOpenWalletPicker.click();
        logger.info('Opened wallet picker');

        // 14. Click on button + Add wallet
        await walletManagementPage.btnAddWallet.click();
        logger.info('Clicked "+ Add wallet"');

        // 15. Click on button Manage recovery phrase
        await walletManagementPage.btnManageRecoveryPhrase.click();
        logger.info('Clicked "Manage recovery phrase"');

        // 16. Verify that the first toggle is disabled
        expect(await walletManagementPage.firstToggle.isEnabled()).to.be.false;
        logger.info('Verified first toggle is disabled');

        // 17. Verify that the first toggle is on
        expect(await walletManagementPage.firstToggle.getAttribute('aria-checked')).to.equal('true');
        logger.info('Verified first toggle is on');

        // 18. Select the 3rd and 4th list item
        await walletManagementPage.thirdListItem.click();
        await walletManagementPage.fourthListItem.click();
        logger.info('Selected 3rd and 4th wallet list items');

        // 19. Click on button Save
        await walletManagementPage.btnSave.click();
        logger.info('Clicked Save');

        // 20. Verify recovery phrase list contains original and new wallets
        expect(await walletManagementPage.mainWallet.getText()).to.equal('Main Wallet');
        expect(await walletManagementPage.wallet2Title.getText()).to.equal('Wallet 2');
        expect(await walletManagementPage.wallet3Title.getText()).to.equal('Wallet 3');
        logger.info('Verified wallet list contains Main Wallet, Wallet 2, and Wallet 3');

      });

});
