"use client";

import { HomeMultimodalInput } from "@/components/multimodal-input";

export default function HomeGreeting({ greeting }: { greeting: string }) {
  return (
    <section className="10 mx-auto grid space-y-8 md:space-y-10 lg:space-y-12">
      <h1 className="home-h2 text-center text-balance max-w-screen-sm mx-auto">
        {greeting}
      </h1>
      <HomeMultimodalInput className="w-full max-w-screen-md mx-auto" />
    </section>
  );
}
