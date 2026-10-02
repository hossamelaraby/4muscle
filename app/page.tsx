import Hero from "@/components/Hero";
import BenefitRow from "@/components/BenefitRow";
import ProblemSection from "@/components/ProblemSection";
import UseCases from "@/components/UseCases";
import ProductShowcase from "@/components/ProductShowcase";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BenefitRow />
      <ProblemSection />
      <UseCases />
      <ProductShowcase />
      <Comparison />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
