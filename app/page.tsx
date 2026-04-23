"use client";

import {useState} from "react"

export default function Home() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const services = ["service1", "service2"];

  const callService = async (service: string) => {
    try {
      setLoading(true);
      setResponse(null);

      const res = await fetch(
        `http://YOUR_API_GATEWAY_URL/${service}`
      );

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setResponse({ error: "Failed to fetch" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Microservices Demo 🚀</h1>

      <div style={{ marginTop: "20px" }}>
        {services.map((s) => (
          <button
            key={s}
            onClick={() => callService(s)}
            style={{
              marginRight: "10px",
              padding: "10px 15px",
              cursor: "pointer",
            }}
          >
            Call {s}
          </button>
        ))}
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Response:</h3>

        {loading && <p>Loading...</p>}

        {response && (
          <pre
            style={{
              background: "#111",
              color: "#0f0",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}