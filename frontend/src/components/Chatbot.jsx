import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const getBotReply = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("hello") || text.includes("hi")) {
      return "Hello 👋 How can I help you?";
    }

    if (text.includes("donate")) {
      return "Go to Donor Profile → Add Donor to donate blood.";
    }

    if (text.includes("hospital")) {
      return "Check Hospital Data section.";
    }

    if (text.includes("request")) {
      return "Hospital requests are in Requests tab.";
    }

    if (text.includes("help")) {
      return "Ask me about donation, hospitals, or requests.";
    }

    return "Sorry, I didn't understand that.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const botMsg = { role: "bot", text: getBotReply(input) };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* 🔘 FLOATING BUTTON (WHEN CLOSED) */}
      {!open && (
        <button style={styles.fab} onClick={() => setOpen(true)}>
          💬
        </button>
      )}

      {/* 💬 CHAT WINDOW (WHEN OPEN) */}
      {open && (
        <div style={styles.container}>
          {/* HEADER */}
          <div style={styles.header}>
            <span>Help Bot</span>

            {/* ❌ CLOSE BUTTON */}
            <button
              style={styles.closeBtn}
              onClick={() => setOpen(false)}
            >
              ✖
            </button>
          </div>

          {/* CHAT BODY */}
          <div style={styles.chatBox}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.msg,
                  alignSelf:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.role === "user" ? "#ef4444" : "#1f2937",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div style={styles.inputBox}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendBtn}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ================= STYLES ================= */
const styles = {
  fab: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    zIndex: 9999,
  },

  container: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "300px",
    height: "400px",
    background: "#111827",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    overflow: "hidden",
    zIndex: 9999,
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },

  header: {
    background: "#ef4444",
    color: "#fff",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },

  chatBox: {
    flex: 1,
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    overflowY: "auto",
    color: "#fff",
  },

  msg: {
    padding: "8px 10px",
    borderRadius: "8px",
    maxWidth: "80%",
    color: "#fff",
  },

  inputBox: {
    display: "flex",
    borderTop: "1px solid #333",
  },

  input: {
    flex: 1,
    padding: "10px",
    border: "none",
    outline: "none",
  },

  sendBtn: {
    padding: "10px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};