// src/lib/authHelpers.js

// Registration needs a unique userName, but the checkout auth flow only
// collects phone + password. Phone is already unique on the User model, so
// deriving the userName from it guarantees no collision.
export function generateUsernameFromPhone(phone) {
  const digits = String(phone).replace(/\D/g, "");
  return `cust${digits}`;
}
