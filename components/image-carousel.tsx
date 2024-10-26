
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselDemo({imagesUrl}: {imagesUrl: string[]}) {
  return (
    <Carousel
      className="flex h-[340px] w-full overflow-hidden"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="h-full w-full">
        {imagesUrl.map((imageUrl: string, index) => (
          <CarouselItem key={index} className="h-full w-full">
            <Image
              src={imageUrl}
              alt="hotel room image "
              width={500}
              height={500}
              className="h-full w-full object-cover transition-all duration-500 hover:scale-110"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
