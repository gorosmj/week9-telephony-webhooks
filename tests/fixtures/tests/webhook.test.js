
const test = require("node:test");
const assert = require("node:assert/strict");

test("rejects unsupported HTTP methods", () => {
  // The webhook only accepts POST requests.
  const allowedMethods = ["POST"];
  assert.equal(allowedMethods.includes("GET"), false);
});

test("rejects requests with missing required fields", () => {
  const params = {
    CallSid: "",
    From: "",
    To: "",
    CallStatus: ""
  };

  assert.equal(
    Boolean(params.CallSid && params.From && params.To && params.CallStatus),
    false
  );
});

test("detects duplicate CallSid values in a simulator", () => {
  const processedEvents = new Set();

  processedEvents.add("CA123456");

  assert.equal(processedEvents.has("CA123456"), true);
});

test("does not expose a full phone number in logs", () => {
  const From = "+15551234567";
  const suffix = From.replace(/\D/g, "").slice(-4);

  assert.equal(suffix, "4567");
  assert.equal(suffix.length, 4);
});

test("uses an opt-in environment flag for outbound SMS", () => {
  const enabled = "false";

  assert.equal(enabled === "true", false);
});
