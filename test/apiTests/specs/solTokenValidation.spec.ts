import { expect } from "chai";
import { PortfolioApi } from "../api/portofolioApi";
import { ADDRESS } from "../data/constants";
import { validateToken } from "../utils/validators";

//Test when the network parameter is not provided, the API returns only the SOL token.
describe("SOL Token Validation", () => {
  it("returns only the SOL token when network param is not provided", async () => {
    const api = new PortfolioApi();
    // 1. Send a GET request without a network parameter
    const response = await api.getTokens(ADDRESS);
    expect(response.status).to.equal(200);

    // 2. Validate that the response contains only solana
    expect(response.data.tokens).to.be.an("array");
    const solTokens = response.data.tokens.filter((token: any) => token.symbol === "SOL");
    expect(solTokens.length).to.equal(1);
    const solToken = solTokens[0];

    // 3. Verify the essential properties of the SOL token
    expect(solToken.name).to.equal("Solana");
    expect(solToken.symbol).to.equal("SOL");
    expect(solToken.mint).to.equal("11111111111111111111111111111111");
    expect(solToken.totalUiAmount).to.be.a("number");
    validateToken(solToken);

    // 4. Ensure the price object contains key values
    expect(solToken.price).to.exist;
    expect(solToken.price).to.have.property("price");
    expect(solToken.price).to.have.property("currency");
    expect(solToken.price.currency).to.equal("usd");
  });
});
