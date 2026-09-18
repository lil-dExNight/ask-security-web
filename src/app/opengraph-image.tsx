import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "ASK Security — Web3 security audits. Someone will read your code line by line. Make sure it's us.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "src", "assets", "logo-inverted.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: "#060a08",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={logoSrc} width={360} height={130} style={{ objectFit: "contain" }} alt="" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#e8f5ee",
            lineHeight: 1.05,
          }}
        >
          <span>Someone will read your code line by line.</span>
          <span style={{ color: "#41f2a4" }}>Make sure it&rsquo;s us.</span>
        </div>
        <div style={{ fontSize: 30, color: "#7a9386", lineHeight: 1.3 }}>
          Independent security audits for web3 protocols, infrastructure, and wallets
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #16241c",
          paddingTop: 28,
          fontSize: 24,
          color: "#7a9386",
        }}
      >
        <span>t.me/asksecurity</span>
        <span style={{ color: "#41f2a4" }}>ask.security@gmail.com</span>
      </div>
    </div>,
    { ...size },
  );
}
