import fs from "node:fs";
import path from "node:path";

export function GET() {
  const favicon = fs.readFileSync(path.join(process.cwd(), "public/favicon.svg"));

  return new Response(favicon, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
