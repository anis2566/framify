import { TracingBeam } from "@/components/tracing-beam";
import { Footer } from "@/features/home/ui/footer";
import { Hero } from "@/features/home/ui/hero";
import Newsletter from "@/features/home/ui/newsletter";
import { PopularFrames } from "@/features/home/ui/popular-frames";
import { SignatureFrames } from "@/features/home/ui/signature-frames";
import { Testimonials } from "@/features/home/ui/testimonials";
import { Trial } from "@/features/home/ui/trial";
import { Workflow } from "@/features/home/ui/workflow";
import { NavbarProvider } from "@/providers/nav-provider";

const Home = () => {
  return (
    <TracingBeam>
      <NavbarProvider>
        <Hero />
        <Trial />
        <SignatureFrames />
        <Workflow />
        <PopularFrames />
        <Testimonials />
        <Newsletter />
        <Footer />
      </NavbarProvider>
    </TracingBeam>
  )
};

export default Home;