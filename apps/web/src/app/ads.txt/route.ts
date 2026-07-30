import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "pub-0000000000000000";
  const publisherId = clientId.replace(/^ca-/, "");

  const adsTxtContent = `# ads.txt for Triunfo FM 87,9
google.com, ${publisherId}, DIRECT, f08c47fec0942fa0
`;

  return new NextResponse(adsTxtContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
