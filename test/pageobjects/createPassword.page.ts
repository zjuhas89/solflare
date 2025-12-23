import Page from './page';
import { $ } from '@wdio/globals';

class CreatePassword extends Page {
   
    // Input field for entering the wallet password.
    public get passwordInput() { return $('input[type="password"]'); }

    // Input field for confirming the wallet password.
    public get passwordConfirmInput() { return $('input[placeholder="Repeat Password..."]'); }

    // Button to agree to terms and finish onboarding
    public get btnAgreeLetsGo() { return $('[data-testid="btn-explore"]'); }

    }

export default new CreatePassword();
