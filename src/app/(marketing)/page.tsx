import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { StatsBand } from "@/components/landing/stats-band";
import { Services } from "@/components/landing/services";
import { DisplayDivider } from "@/components/landing/display-divider";
import { Cases } from "@/components/landing/cases";
import { Contact } from "@/components/landing/contact";
import { SiteFooter } from "@/components/landing/site-footer";

// CSP nonces require dynamic rendering.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <div aria-hidden className="grain" />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <StatsBand />
        <Services />
        <DisplayDivider />
        <Cases />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
