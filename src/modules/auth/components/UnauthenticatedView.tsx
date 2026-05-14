import { GalaxyInteractiveHeroSection } from "@/components/ui/galaxy-interactive-hero-section";
import FeaturesSection from "@/components/ui/features";
import TestimonialV2 from "@/components/ui/testimonial-v2";
import PricingSection4 from "@/components/ui/pricing-section-4";
import { CinematicFooter } from "@/components/ui/motion-footer";

export const UnauthenticatedView = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 font-sans overflow-x-hidden">

            <main className="flex-1 flex flex-col">
                <GalaxyInteractiveHeroSection />
                <FeaturesSection />
                <TestimonialV2 />
                <PricingSection4 />


            <CinematicFooter />
            </main>
        </div>
    )
}