import Autoplay from "embla-carousel-autoplay";
import { FC, PropsWithChildren } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import image1 from "@/assets/1.svg";
import image2 from "@/assets/2.svg";
import image3 from "@/assets/3.svg";

const images = [
  { image: image1, text: "Track your progress" },
  { image: image2, text: "Get instant feedback" },
  { image: image3, text: "Prepare for your test" },
];

const OnboardingLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden bg-muted lg:block">
        <Carousel
          className="h-full"
          opts={{
            loop: true,
          }}
          plugins={[
            Autoplay({
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="h-full" containerClassName="h-full">
            {images.map(({ image, text }, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="max-w-[630px] w-full flex flex-col justify-between gap-24 px-8 py-12 m-8">
                    <img className="w-full h-full" src={image} />
                    <p className="italic text-center text-lg">"{text}"</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      {children}
    </div>
  );
};

export default OnboardingLayout;
