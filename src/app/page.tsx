"use client";

import { HeroSlider } from "@/components/sections/hero-slider";
import { PhotographerStory } from "@/components/sections/photographer-story";
import { FeaturedPortfolio } from "@/components/sections/featured-portfolio";
import { CinematicFilms } from "@/components/sections/cinematic-films";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { TestimonialSlider } from "@/components/sections/testimonial-slider";
import { InstagramGrid } from "@/components/sections/instagram-grid";
import { CallToAction } from "@/components/sections/call-to-action";

export default function Home() {

  return (
    <div className="space-y-0">
      <HeroSlider />

      <FeaturedPortfolio />
      <CinematicFilms />
      <WhyChooseUs />
      <TestimonialSlider />
      <InstagramGrid />
      <PhotographerStory />
      <CallToAction />
    </div>
  );
}
