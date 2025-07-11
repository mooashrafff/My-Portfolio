"use client";

import { AnimatedTestimonials } from "./animated-testimonials";

export function Slider() {
  const testimonials = [
  {
    name: "Back2home",
    quote: "Back2Home is a dedicated platform created by graduating students to address the critical issue of missing persons. What started as an academic project has evolved into a powerful tool that combines advanced technology with compassionate service to help reunite families.",
    redirect: "https://back-to-home.vercel.app/#/",
    pic: "/images/6.jpg" // Assuming you placed the image in public/images/
  }
];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
