
import twilio from "twilio";

const processedEvents = new Set();

function twiml(message) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response><Say>${message}</Say></Response>`;
}

function xmlResponse(message) {
  return new Response(twiml(message), {
    status: 200,
    headers: { "Content-Type": "text/xml; charset=utf-8" }
  });
}

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("application/x-www-form-urlencoded")) {
      return new Response("Unsupported content type", { status: 415 });
    }

    const body = await request.text();

    if (body.length > 16_384) {
      return new Response("Request too large", { status: 413 });
    }

    const params = Object.fromEntries(new URLSearchParams(body));
    const signature = request.headers.get("x-twilio-signature");
    const token = process.env.TWILIO_AUTH_TOKEN;
    const callbackUrl = process.env.TWILIO_CALLBACK_URL;

    if (!token || !callbackUrl || !signature) {
      return new Response("Webhook configuration error", { status: 500 });
    }

    const valid = twilio.validateRequest(
      token,
      signature,
      callbackUrl,
      params
    );

    if (!valid) {
      return new Response("Invalid signature", { status: 403 });
    }

    const { CallSid, From, To, CallStatus } = params;

    if (!CallSid || !From || !To || !CallStatus) {
      return new Response("Missing required fields", { status: 400 });
    }

    if (processedEvents.has(CallSid)) {
      return xmlResponse("Your request has already been received.");
    }

    processedEvents.add(CallSid);

    const callerSuffix = From.replace(/\D/g, "").slice(-4);

    console.log({
      eventId: CallSid,
      status: CallStatus,
      callerSuffix: `****${callerSuffix}`
    });

    return xmlResponse("Thank you for calling. Your request has been received.");

  } catch (error) {
    console.error("Webhook processing failed");
    return xmlResponse("We are sorry. Please try again later.");
  }
}
