import { Channel } from "@slack/web-api/dist/response/ConversationsListResponse";
import { createSignal } from "solid-js";
import { useApi } from "./hooks/useApi";

function App() {
  const { postMessage } = useApi();
  const [channels, setChannels] = createSignal<Channel[]>([]);

  async function sendToVsCode() {
    const channels = await postMessage("GET_CHANNEL_LIST", undefined);
    setChannels(channels);
  }

  return (
    <>
      <button class="button" onClick={sendToVsCode}>
        Send to VS Code
      </button>

      <ul>
        {channels().map((channel) => (
          <li>{channel.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
