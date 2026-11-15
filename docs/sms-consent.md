
# SMS Confirmation and Consent

## Message Template

Week 9 Webhook Simulator: Your call request has been received.

Reply STOP to opt out of future messages where supported.

## Consent Requirements

- Outbound SMS is disabled by default.
- A message may only be sent after explicit recipient consent.
- Only verified test recipients may be used.
- No unsolicited messages are permitted.
- The simulator does not send real SMS messages.

## Environment Flag

ENABLE_SMS=false

Real messaging requires explicit approval and additional implementation and testing.
