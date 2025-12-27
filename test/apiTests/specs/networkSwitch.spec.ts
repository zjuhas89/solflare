import { expect } from "chai";
import { PortfolioApi } from "../api/portofolioApi";
import { ADDRESS } from "../data/constants";

// Test - switching from mainnet to devnet and back to mainnet restores the original response
describe("Network Switch: Mainnet to Devnet", () => {
  it("Compare original mainnet response after switching to devnet and back", async () => {
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

    // Validate arrays contain different tokens (by mint)
    const mainnetMints = mainnetTokens1.map((t: any) => t.mint);
    const devnetMints = devnetTokens.map((t: any) => t.mint);
    const hasDifference = mainnetMints.some((mint: string) => !devnetMints.includes(mint)) || devnetMints.some((mint: string) => !mainnetMints.includes(mint));
    expect(hasDifference).to.be.true;

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
    });
  });
});
