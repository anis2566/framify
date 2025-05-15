import { TracingBeam } from "@/components/tracing-beam";
import { Footer } from "@/features/home/ui/footer";
import { Hero } from "@/features/home/ui/hero";
import Newsletter from "@/features/home/ui/newsletter";
import { PopularFrames } from "@/features/home/ui/popular-frames";
import { SignatureFrames } from "@/features/home/ui/signature-frames";
import { Testimonials } from "@/features/home/ui/testimonials";
import { Trial } from "@/features/home/ui/trial";
import { Workflow } from "@/features/home/ui/workflow";

const Home = () => {
  return (
    <TracingBeam>
      <Hero />
      <Trial />
      <SignatureFrames />
      <Workflow />
      <PopularFrames />
      <Testimonials />
      <Newsletter />
      <Footer />
    </TracingBeam>
  )
};

export default Home;