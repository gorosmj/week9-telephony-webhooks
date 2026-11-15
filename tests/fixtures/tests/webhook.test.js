
const test = require("node:test");
const assert = require("node:assert/strict");

test("actual Twilio route rejects unsupported content types", async () => {
  const { POST } = await import("../../../app/api/webhooks/twilio/route.js");

  const request = new Request("https://example.com/api/webhooks/twilio", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({})
  });

  const response = await POST(request);

  assert.equal(response.status, 415);
});

test("actual Twilio route rejects oversized requests", async () => {
  const { POST } = await import("../../../app/api/webhooks/twilio/route.js");

  const request = new Request("https://example.com/api/webhooks/twilio", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: "x".repeat(16385)
  });

  const response = await POST(request);

  assert.equal(response.status, 413);
});

test("actual Twilio route rejects missing webhook configuration", async () => {
  const { POST } = await import("../../../app/api/webhooks/twilio/route.js");

  delete process.env.TWILIO_AUTH_TOKEN;
  delete process.env.TWILIO_CALLBACK_URL;

  const request = new Request("https://example.com/api/webhooks/twilio", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: "CallSid=CA123&From=%2B15551234567&To=%2B15557654321&CallStatus=ringing"
  });

  const response = await POST(request);

  assert.equal(response.status, 500);
});

test("actual Twilio route rejects an invalid signature", async () => {
  const { POST } = await import("../../../app/api/webhooks/twilio/route.js");

  process.env.TWILIO_AUTH_TOKEN = "test-auth-token";
  process.env.TWILIO_CALLBACK_URL =
    "https://example.com/api/webhooks/twilio";

  const request = new Request("https://example.com/api/webhooks/twilio", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "x-twilio-signature": "invalid-signature"
    },
    body: "CallSid=CA123&From=%2B15551234567&To=%2B15557654321&CallStatus=ringing"
  });

  const response = await POST(request);

  assert.equal(response.status, 403);
});
