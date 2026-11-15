
# Week 9 Webhook Simulator

## Purpose
This project demonstrates a secure asynchronous webhook workflow using a simulator instead of live Twilio messaging.

## Event Sequence
1. Caller Phone initiates a call.
2. Twilio Gateway sends a webhook request.
3. The Next.js API route validates the request signature.
4. The route checks required fields and duplicate event IDs.
5. The route records a sanitized event log.
6. The route returns a TwiML XML response.
7. An optional SMS confirmation can be simulated after consent.

## Security
- Validate provider signatures.
- Reject missing or invalid fields.
- Prevent duplicate event processing.
- Do not log full phone numbers or transcripts.
- Keep outbound SMS disabled by default.

## Simulator Instructions
1. Use the saved fixture in tests/fixtures/twilio-call.txt.
2. Run the automated tests with npm test after installing dependencies.
3. Do not send real SMS messages.
4. Use fictional test data only.

## Limitations
The initial duplicate-event store is in memory and resets when the server restarts. Persistent storage and full route integration tests remain future work.

sequenceDiagram
    participant Caller as Caller Phone
    participant Twilio as Twilio Gateway
    participant API as Next.js API Route
    participant Engine as TwiML Engine

    Caller->>Twilio: Initiates phone call
    Twilio->>API: POST webhook with call details
    API->>API: Validate signature and required fields
    API->>API: Check duplicate CallSid
    API->>API: Log redacted event details
    API-->>Twilio: Return TwiML XML
    Twilio->>Engine: Process TwiML instructions
    Engine-->>Caller: Play confirmation message
