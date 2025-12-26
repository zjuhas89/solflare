import { BaseApi } from "./baseApi";

export class PortfolioApi extends BaseApi {
  async getTokens(address: string, network?: string) {
    return this.get(
      `/v3/portfolio/tokens/${address}`,
      network ? { network } : undefined
    );
  }
}
