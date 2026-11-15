
export default function Home() {
  return (
    <main style={{
      fontFamily: "Arial, sans-serif",
      padding: "40px",
      maxWidth: "800px",
      margin: "auto"
    }}>
      <h1>Week 9: Webhook Simulator</h1>

      <p>
        Secure asynchronous webhook workflow demonstration.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Twilio signature validation</li>
        <li>Webhook request validation</li>
        <li>Duplicate event detection</li>
        <li>Privacy-conscious logging</li>
        <li>TwiML fallback responses</li>
        <li>SMS consent controls</li>
      </ul>

      <p>
        Simulator mode uses fictional data and does not send real messages.
      </p>
    </main>
  );
}
