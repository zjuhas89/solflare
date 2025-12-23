import recoveryPhrase from '../pageobjects/recoveryPhrase.page';
import createPasswordPage from '../pageobjects/createPassword.page';
import walletManagementPage from '../pageobjects/walletManagement.page';
import { expect } from 'chai';

describe('Solflare Onboarding E2E', () => {
    it('should onboard and manage wallets', async () => {
        // 1. Go to onboarding page
        await browser.url('https://solflare.com/onboard');

        // 2. Click on button I need a new wallet
        await recoveryPhrase.btnNewWallet.click();

        // 3. Read the given recovery phrase
        const recoveryPhraseString: string[] = await recoveryPhrase.getRecoveryPhrases();
        // Assertions 
        expect(recoveryPhraseString).to.have.length(12);
        recoveryPhraseString.forEach(word => expect(word).to.not.be.empty);

        // 4. Click on button I saved my recovery phrase
        await recoveryPhrase.btnSavedRecoveryPhrase.click();

        // 5. Enter the recovery phrase (do not paste)
        await recoveryPhrase.enterRecoveryPhrase(recoveryPhraseString);

        // 6. Click on button Continue
        await recoveryPhrase.btnContinue.click();

        // 7. Enter password
        await createPasswordPage.passwordInput.setValue('TestPassword123!');

        // 8. Enter the same password to the second input field
        await createPasswordPage.passwordConfirmInput.setValue('TestPassword123!');

        // 9. Click on button Continue
        await recoveryPhrase.btnContinue.click();

        // 10. Click on button I agree, let’s go
        await createPasswordPage.btnAgreeLetsGo.click();

        // 11. Click on button Wallet management (Avatar)
        await walletManagementPage.avatarButton.click();

        // 12. Verify that the Main wallet is displayed
        expect(await walletManagementPage.mainWalletLabel.isDisplayed()).to.be.true;

        // 13. Open side menu - wallet picker
        await walletManagementPage.btnOpenWalletPicker.click();

        // 14. Click on button + Add wallet
        await walletManagementPage.btnAddWallet.click();

        // 15. Click on button Manage recovery phrase
        await walletManagementPage.btnManageRecoveryPhrase.click();

        // 16. Verify that the first toggle is disabled
        expect(await walletManagementPage.firstToggle.isEnabled()).to.be.false;

        // 17. Verify that the first toggle is on
        expect(await walletManagementPage.firstToggle.getAttribute('aria-checked')).to.equal('true');

        // 18. Select the 3rd and 4th list item
        await walletManagementPage.thirdListItem.click();
        await walletManagementPage.fourthListItem.click();

        // 19. Click on button Save
        await walletManagementPage.btnSave.click();

        // 20. Verify recovery phrase list contains original and new wallets
        expect(await walletManagementPage.mainWallet.getText()).to.equal('Main Wallet');
        expect(await walletManagementPage.wallet2Title.getText()).to.equal('Wallet 2');
        expect(await walletManagementPage.wallet3Title.getText()).to.equal('Wallet 3');

      });

});
