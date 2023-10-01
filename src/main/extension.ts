import {
  // CancellationToken,
  ExtensionContext,
  SnippetString,
  Uri,
  Webview,
  WebviewView,
  WebviewViewProvider,
  // WebviewViewResolveContext,
  window,
} from "vscode";

import { readFileSync, readdirSync } from "fs";
import { extname, join } from "path";
export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    window.registerWebviewViewProvider(
      "slack-chat.webview",
      new ChatViewProvider(context.extensionUri)
    )
  );
}

class ChatViewProvider implements WebviewViewProvider {
  // private view?: WebviewView;

  constructor(private readonly extensionUri: Uri) {}

  public resolveWebviewView(
    webviewView: WebviewView
    // context: WebviewViewResolveContext,
    // token: CancellationToken
  ) {
    // this.view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [Uri.joinPath(this.extensionUri, "out", "assets")],
    };

    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    webviewView.webview.onDidReceiveMessage((data) => {
      switch (data.type) {
        case "colorSelected": {
          window.activeTextEditor?.insertSnippet(
            new SnippetString(`#${data.value}`)
          );
          break;
        }
      }
    });
  }

  private getHtmlForWebview(webview: Webview) {
    const files = readdirSync(
      Uri.joinPath(this.extensionUri, "out", "view", "assets").path
    );

    let scripts = "";
    let styles = "";

    for (const file of files) {
      const fileType = extname( file);
      if (fileType === ".js") {
        scripts = scripts.concat(
          `<script>
          ${readFileSync(
            join(this.extensionUri.path, "out", "view", "assets", file)
          )}
          </script>`
        );
      } else if (fileType === ".css") {
        styles = styles.concat(
          `<style>
          ${readFileSync(
            join(this.extensionUri.path, "out", "view", "assets", file)
          )}
          </style>`
        );
      }
    }

    return `<!doctype html>
    <html lang="en"> 
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${styles}   
        <title>Vite + Solid + TS</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
      ${scripts}
    </html>
    `;
  }
}
