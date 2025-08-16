import { useState, useRef, useEffect } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [instruction, setInstruction] = useState("");
  const [summary, setSummary] = useState("");
  const [originalSummary, setOriginalSummary] = useState(""); // Track original AI-generated summary
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showSendConfirmation, setShowSendConfirmation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const fileInputRef = useRef(null);

  // Check if summary has been edited
  const isSummaryEdited = summary !== originalSummary;

  // Animation on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTranscript(e.target.result);
        setMessage("✨ File uploaded successfully!");
        setTimeout(() => setMessage(""), 4000);
      };
      reader.readAsText(file);
    } else {
      setMessage("⚠️ Please upload a .txt file");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  async function generateSummary() {
    if (!transcript.trim() || !instruction.trim()) {
      setMessage("⚠️ Please provide both transcript and instruction");
      setTimeout(() => setMessage(""), 4000);
      return;
    }

    setLoading(true);
    setMessage("");
    
    try {
      const response = await fetch(`${API_URL}/api/summarize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, instruction })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSummary(data.summary);
        setOriginalSummary(data.summary); // Store the original AI-generated summary
        setMessage("🚀 Summary generated successfully! You can now edit it before sending.");
        setTimeout(() => setMessage(""), 5000);
      } else {
        setMessage(`❌ ${data.error || "Failed to generate summary"}`);
        setTimeout(() => setMessage(""), 4000);
      }
    } catch (error) {
      setMessage("🌐 Error connecting to server");
      setTimeout(() => setMessage(""), 4000);
    } finally {
      setLoading(false);
    }
  }

  // Reset summary to original AI-generated version
  const resetToOriginal = () => {
    setSummary(originalSummary);
    setMessage("🔄 Summary reset to original AI-generated version");
    setTimeout(() => setMessage(""), 4000);
  };

  // Handle send email with confirmation
  const handleSendEmail = () => {
    if (!summary.trim() || !to.trim()) {
      setMessage("⚠️ Please provide both summary and email addresses");
      setTimeout(() => setMessage(""), 4000);
      return;
    }
    setShowSendConfirmation(true);
  };

  async function sendEmail() {
    setShowSendConfirmation(false);
    setEmailLoading(true);
    setMessage("");
    
    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary, to })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage("📧 Email sent successfully!");
        setTimeout(() => setMessage(""), 4000);
      } else {
        setMessage(`❌ ${data.error || "Failed to send email"}`);
        setTimeout(() => setMessage(""), 4000);
      }
    } catch (error) {
      setMessage("🌐 Error connecting to server");
      setTimeout(() => setMessage(""), 4000);
    } finally {
      setEmailLoading(false);
    }
  }

  return (
    <div className={`app ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <h1>AI Meeting Summarizer</h1>
        
        {message && (
          <div className={`message ${message.includes('successfully') || message.includes('uploaded') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="section">
          <h3>📄 Upload Transcript</h3>
          <div className="file-upload">
            <input
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button 
              className="upload-btn"
              onClick={() => fileInputRef.current.click()}
            >
              📁 Choose Text File
            </button>
            <span className="file-hint">or paste text below</span>
          </div>
          
          <textarea
            className="transcript-input"
            rows={8}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your meeting transcript here or upload a .txt file..."
          />
        </div>

        <div className="section">
          <h3>🎯 Custom Instruction</h3>
          <input
            className="instruction-input"
            type="text"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder='e.g., "Summarize in bullet points for managers" or "Only list action items"'
          />
          
          <button 
            className="generate-btn"
            disabled={loading || !transcript.trim() || !instruction.trim()}
            onClick={generateSummary}
          >
            {loading ? "⚡ Generating..." : "🚀 Generate Summary"}
          </button>
        </div>

        <div className={`section ${summary ? 'summary-section' : ''}`}>
          <h3>✏️ Edit Summary</h3>
          {summary && (
            <div className="summary-controls">
              <div className="summary-info">
                <span className={`edit-indicator ${isSummaryEdited ? 'edited' : ''}`}>
                  {isSummaryEdited ? '✏️ Edited' : '🤖 AI Generated'}
                </span>
                <span className="character-count">
                  📊 {summary.length} characters
                </span>
              </div>
              {isSummaryEdited && (
                <button 
                  className="reset-btn"
                  onClick={resetToOriginal}
                  title="Reset to original AI-generated summary"
                >
                  🔄 Reset to Original
                </button>
              )}
            </div>
          )}
          <textarea
            className={`summary-input ${isSummaryEdited ? 'edited' : ''}`}
            rows={10}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Your AI-generated summary will appear here. You can edit it before sending..."
          />
          {summary && (
            <div className="summary-hint">
              💡 <strong>Tip:</strong> Feel free to edit the summary to better match your needs before sending.
            </div>
          )}
        </div>

        <div className="section">
          <h3>📧 Send by Email</h3>
          <input
            className="email-input"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter email addresses separated by commas (e.g., john@company.com, jane@company.com)"
          />
          
          <button 
            className="send-btn"
            disabled={emailLoading || !summary.trim() || !to.trim()}
            onClick={handleSendEmail}
          >
            {emailLoading ? "📤 Sending..." : "📤 Send Email"}
          </button>
        </div>

        {/* Send Confirmation Modal */}
        {showSendConfirmation && (
          <div className="modal-overlay" onClick={() => setShowSendConfirmation(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>📧 Confirm Email Send</h3>
              <p>Are you sure you want to send this summary?</p>
              {isSummaryEdited && (
                <div className="edit-warning">
                  ⚠️ <strong>Note:</strong> You've edited the AI-generated summary. The edited version will be sent.
                </div>
              )}
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowSendConfirmation(false)}
                >
                  ❌ Cancel
                </button>
                <button 
                  className="confirm-btn"
                  onClick={sendEmail}
                >
                  📤 Send Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
