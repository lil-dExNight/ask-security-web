import { SiteHeader } from "@/components/landing/site-header";
import { Hero } from "@/components/landing/hero";
import { Services } from "@/components/landing/services";
import { StatsBand } from "@/components/landing/stats-band";
import { Cases } from "@/components/landing/cases";
import { Contact } from "@/components/landing/contact";
import { SiteFooter } from "@/components/landing/site-footer";

export default function HomePage() {
  return (
    <>
      <div aria-hidden className="pd-scanlines pointer-events-none fixed inset-0 z-30" />
      <div aria-hidden className="pd-scanbeam z-30" />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Services />
        <StatsBand />
        <Cases />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
