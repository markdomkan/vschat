import { readFileSync, readdirSync } from "fs";
import { extname, join } from "path";

export function htmlGenerator(viewBasePath: string): string {
  const files = readdirSync(viewBasePath);
  let scriptsBuffer = "";
  let stylesBuffer = "";
  for (const file of files) {
    const fileType = extname(file);
    if (fileType === ".js") {
      scriptsBuffer = scriptsBuffer.concat(
        `<script>
            ${readFileSync(join(viewBasePath, file))}
            </script>`
      );
    } else if (fileType === ".css") {
      stylesBuffer = stylesBuffer.concat(
        `<style>
            ${readFileSync(join(viewBasePath, file))}
            </style>`
      );
    }
  }
  return `<!doctype html>
      <html lang="en"> 
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          ${stylesBuffer}   
          <title>Vite + Solid + TS</title>
        </head>
        <body>
          <div id="root"></div>
        </body>
        ${scriptsBuffer}
      </html>
      `;
}
