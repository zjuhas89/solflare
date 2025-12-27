import { expect } from "chai";
import { PortfolioApi } from "../api/portofolioApi";
import { ADDRESS } from "../data/constants";
import { validateToken, validatePrice } from "../utils/validators";

// Test for Verify that the API correctly returns devnet-specific tokens when the network=devnetparameter is used.
// Ensures the API returns multiple tokens, and each token has valid structure and price info
describe("Devnet Token Validation", () => {
  it("returns devnet tokens", async () => {
    // Create an instance of the PortfolioApi helper
    const api = new PortfolioApi();

    // Call the API to get tokens for the given address on the devnet network
    const response = await api.getTokens(ADDRESS, "devnet");
    // Assert that the HTTP response status is 200 (OK)
    expect(response.status).to.equal(200);

    // Assert that the response contains more than one token (not just SOL)
    expect(response.data.tokens.length).to.be.greaterThan(1);

    // For each token, validate its structure (required token and valid price) and price fields
    response.data.tokens.forEach((token: any) => {
      validateToken(token);      
      validatePrice(token);      
    });
  });
});
