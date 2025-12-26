import Page from './page';
import { $ } from '@wdio/globals';

class WalletManagement extends Page {
   
    // Button to agree to terms and finish onboarding
    public get btnAgreeLetsGo() { return $('[data-testid="btn-explore"]'); }

    // Avatar button to open wallet management menu.
    public get avatarButton() { return $('[data-testid="section-wallet-picker"]'); }

    // Label indicating the main wallet is displayed.
    public get mainWalletLabel() { return $('span=Main Wallet'); }

    // Button open side menu - wallet picker
    public get btnOpenWalletPicker() { return $('[data-testid="icon-section-wallet-picker-arrow-right"]'); }

    // Button to add a new wallet.
    public get btnAddWallet() { return $('[data-testid="icon-btn-add"]'); }

    // Button to manage recovery phrase settings.
    public get btnManageRecoveryPhrase() { return $('[data-testid="li-add-wallet-mnemonic-manage"]'); }

    // First toggle switch in recovery phrase management.   
    public get firstToggle() { return $$('._1qwtpic0')[0]; }

    // Third item in the recovery phrase list.
    public get thirdListItem() { return $$('._1qwtpic0')[2]; }

    // Fourth item in the recovery phrase list.
    public get fourthListItem() { return $$('._1qwtpic0')[3]; }

    // Button to save changes in recovery phrase management.
    public get btnSave() { return $('button=Save'); }

    public get mainWallet() {
    return $('//div[@data-testid="list-item-m-title" and normalize-space()="Main Wallet"]');}

    public get wallet2Title() {
    return $('//div[@data-testid="list-item-m-title" and normalize-space()="Wallet 2"]');}

    public get wallet3Title() {
    return $('//div[@data-testid="list-item-m-title" and normalize-space()="Wallet 3"]');}

}

export default new WalletManagement();
