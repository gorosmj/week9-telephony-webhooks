
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

      <h2>Project Features</h2>
      <ul>
        <li>Twilio webhook signature validation</li>
        <li>Request field validation</li>
        <li>Duplicate event detection</li>
        <li>Privacy-conscious event logging</li>
        <li>TwiML fallback response</li>
        <li>SMS simulator with messaging disabled by default</li>
      </ul>

      <p>
        This project uses fictional test data and does not send real messages.
      </p>
    </main>
  );
}
