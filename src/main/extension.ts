import { ExtensionContext, window } from "vscode";

import { VsChatViewProvider } from "./ViewProvider/VsChatViewProvider";
import { SlackApp } from "./SlackApp";

export function activate(context: ExtensionContext) {
  const slackApp = new SlackApp(
    "xapp-1-A05UZ17CD5L-5977192786503-ef003eeebe4f399d50d601b2f5912edd44f5d95a21933f6fe5f3093b1a1b512d"
  );

  context.subscriptions.push(
    window.registerWebviewViewProvider(
      "slack-chat.webview",
      new VsChatViewProvider(context.extensionUri, slackApp)
    )
  );

  setTimeout(console.clear, 2000);
}
