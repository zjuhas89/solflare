import { expect } from "chai";
import { PortfolioApi } from "../api/portofolioApi";
import { ADDRESS } from "../data/constants";

describe("Network Switch: Mainnet to Devnet", () => {
  it("restores original mainnet response after switching to devnet and back", async () => {
    const api = new PortfolioApi();

    // 1. First Request (Mainnet)
    const mainnetResponse1 = await api.getTokens(ADDRESS, "mainnet");
    expect(mainnetResponse1.status).to.equal(200);
    const mainnetTokens1 = mainnetResponse1.data.tokens;
    expect(mainnetTokens1).to.be.an("array").and.not.empty;

    // 2. Second Request (Devnet)
    const devnetResponse = await api.getTokens(ADDRESS, "devnet");
    expect(devnetResponse.status).to.equal(200);
    const devnetTokens = devnetResponse.data.tokens;
    
   // mainnetTokens1.forEach((t: any, i: number) => console.log(`Mainnet token ${i} keys:`, Object.keys(t)));
   // devnetTokens.forEach((t: any, i: number) => console.log(`Devnet token ${i} keys:`, Object.keys(t)));

    expect(devnetTokens.length).to.be.greaterThan(mainnetTokens1.length);

    // 3. Third Request (Back to Mainnet)
    const mainnetResponse2 = await api.getTokens(ADDRESS, "mainnet");
    expect(mainnetResponse2.status).to.equal(200);
    const mainnetTokens2 = mainnetResponse2.data.tokens;
    expect(mainnetTokens2).to.be.an("array").and.not.empty;

    // Compare first and third mainnet responses (except price)
    mainnetTokens1.forEach((token1: any, idx: number) => {
      const token2 = mainnetTokens2[idx];
      expect(token2).to.exist;
      expect(token1.mint).to.equal(token2.mint);
      expect(token1.totalUiAmount).to.equal(token2.totalUiAmount);
      expect(token1.symbol).to.equal(token2.symbol);
      expect(token1.name).to.equal(token2.name);
      // Price may differ, so skip
    });

    // Ensure no API errors occurred
    expect(mainnetResponse1.status).to.equal(200);
    expect(devnetResponse.status).to.equal(200);
    expect(mainnetResponse2.status).to.equal(200);
  });
});
