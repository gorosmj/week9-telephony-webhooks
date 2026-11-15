
# Week 9 Webhook Verification Checklist

## Required Tests

- [ ] Valid Twilio signature accepted
- [ ] Invalid Twilio signature rejected
- [ ] Missing required fields rejected
- [ ] Duplicate event does not create duplicate action
- [ ] Provider retry does not create duplicate action
- [ ] Oversized request rejected
- [ ] Unsupported HTTP method rejected
- [ ] Logs contain no full phone numbers or transcripts
- [ ] SMS remains disabled by default
- [ ] Safe TwiML returned after internal errors

## Current Limitations

- Persistent idempotency storage is not implemented.
- Cryptographic signature testing is not yet implemented.
- Real Twilio sandbox testing has not been performed.
- Automated tests have not yet been executed.

## Simulator

The simulator uses fictional test data and does not require paid Twilio access.
