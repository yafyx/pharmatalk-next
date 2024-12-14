import { CallToAction } from "@/components/call-to-action";
import { Hero } from "@/components/hero";
import { Showcase } from "@/components/showcase";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <div id="pelayanan">
        <Showcase />
      </div>
      <div id="rekomendasi">
        <Testimonials />
      </div>
      <div id="kontak">
        <CallToAction />
      </div>
    </div>
  );
}
