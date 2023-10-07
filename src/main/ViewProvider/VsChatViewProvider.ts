import { CommandRequest } from "src/shared/Commands";
import { Uri, Webview, WebviewView, WebviewViewProvider } from "vscode";
import { SlackApp } from "../SlackApp";
import { htmlGenerator } from "./HtmlGenerator";

export class VsChatViewProvider implements WebviewViewProvider {
  private view?: Webview;

  constructor(
    private readonly extensionUri: Uri,
    private readonly slackApp: SlackApp
  ) {}

  public resolveWebviewView(webviewView: WebviewView) {
    this.view = webviewView.webview;
    this.view.options = {
      enableScripts: true,
      localResourceRoots: [Uri.joinPath(this.extensionUri, "out", "assets")],
    };
    this.view.onDidReceiveMessage(async (data: CommandRequest) => {
      const mapper: Record<string, (...args: any) => Promise<any>> = {
        GET_CHANNEL_LIST: this.slackApp.getChannelList.bind(this.slackApp),
      };
      try {
        const response = await mapper[data.command]?.(data.args);
        if (response) {
          this.view?.postMessage({
            id: data.id,
            response,
          });
        }
      } catch (error) {
        this.view?.postMessage({
          id: data.id,
          error,
        });
      }
    });
    this.view.html = htmlGenerator(
      Uri.joinPath(this.extensionUri, "out", "view", "assets").path
    );
  }
}
