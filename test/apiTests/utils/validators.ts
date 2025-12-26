import { expect } from "chai";

// Validates that a token object has required properties
export function validateToken(token: any) {
  // Check that the token has a 'mint' property (should exist)
  expect(token.mint).to.exist;
  // Check that the token 'totalUiAmount' property is not null - should have a value
  expect(token.totalUiAmount).to.not.be.null;
}

// Validates the 'price' property of a token, if it exists
export function validatePrice(token: any) {
  // If the token has a 'price' property, check that it has a 'price' field inside
  if (token.price) {
    expect(token.price).to.have.property("price");
  }
}
