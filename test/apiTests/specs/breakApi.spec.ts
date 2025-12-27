import { expect } from "chai";
import axios from "axios";
import { getAuthHeader } from "../utils/auth";

//Test for : intentionally break the API by sending unexpected data
describe("Break API", () => {
  it("should return an error for unexpected data", async () => {
    // Send a GET request to an invalid endpoint to intentionally break the API
    try {
      await axios.get("https://wallet-api.solflare.com/v3/portfolio/tokens/INVALID_ADDRESS", {
        headers: getAuthHeader(),
        params: { network: "devnet" },
      });
      // If no error is thrown, fail the test
      expect.fail("Expected API to return an error, but it succeeded");
    } catch (error: any) {
      // Expect status 400 or 404
      expect(error.response).to.exist;
      expect([400, 404]).to.include(error.response.status);
      // Expect error message to be present
      expect(error.response.data).to.exist;
      expect(error.response.data).to.be.an("object");
      // Optionally check for a message property
      if (error.response.data.message) {
        expect(error.response.data.message).to.be.a("string").and.not.empty;
      }
    }
  });
});
