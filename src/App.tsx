import { useState } from "react";
import "./App.css";

function App() {
  const [payload, setPayload] = useState<string>("");
  const getData = () => {
    chrome.runtime.sendMessage({ action: "GET_DATA" });
  };
  const onClick = () => {
    chrome.runtime.sendMessage({ action: "FETCH_DATA" });
  };

  chrome.runtime.onMessage.addListener(
    async (message: { action: string; data?: string }) => {
      if (message.action === "RENDER_DATA") {
        console.log(message.data);
        message.data && setPayload(message.data);
      }
    }
  );
  return (
    <div className="App">
      <textarea
        onChange={(e) => {
          setPayload(e.target.value);
        }}
        value={payload}
        name="bla"
        id="blabla"
        cols={30}
        rows={10}
      ></textarea>
      <button onClick={onClick}>Fetch Data 2</button>

      <button onClick={getData}>Get content</button>
    </div>
  );
}

export default App;
