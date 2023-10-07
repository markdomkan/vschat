import { CommandResponse, Commands } from "src/shared/Commands";

const vscode = window.acquireVsCodeApi();

const promisesPool: Record<
  string,
  {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }
> = {};

window.addEventListener(
  "message",
  ({ data }: { data: CommandResponse<any> }) => {
    if (data.error === undefined) {
      promisesPool[data.id]?.resolve(data.response);
    } else {
      promisesPool[data.id]?.reject(data.error);
    }
    delete promisesPool[data.id];
  }
);

async function postMessage<T extends keyof Commands>(
  command: T,
  params: Commands[T]["args"]
): Promise<Commands[T]["response"]> {
  const commandHash = generateRandomHash();

  vscode.postMessage({
    id: commandHash,
    command,
    args: params,
  });

  const response = await new Promise((resolve, reject) => {
    promisesPool[commandHash] = { resolve, reject };
  });

  return response as Commands[T]["response"];
}

function generateRandomHash(): string {
  return Math.random().toString(36).substring(7);
}

export function useApi() {
  return {
    postMessage,
  };
}
