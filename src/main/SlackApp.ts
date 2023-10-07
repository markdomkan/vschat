import { App } from "@slack/bolt";
import type { Channel } from "@slack/web-api/dist/response/ConversationsListResponse";
export class SlackApp {
  private app: App;
  constructor(readonly appToken: string) {
    this.app = new App({
      appToken:
        "xapp-1-A05UZ17CD5L-5977192786503-ef003eeebe4f399d50d601b2f5912edd44f5d95a21933f6fe5f3093b1a1b512d",
      token: "xoxb-5988723018165-5991588065859-evU3H8cxcXlXlI23wqfo4HyM",
      socketMode: true,
    });
  }

  public async getChannelList(): Promise<Channel[]> {
    const response = await this.app.client.conversations.list();
    if (response.ok) {
      return response.channels ?? [];
    }
    throw new Error(response.error);
  }
}
