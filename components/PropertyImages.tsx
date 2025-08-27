import Image from "next/image";
import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";

export default function PropertyImages({ images }: { images: string[] }) {
  return (
    <Gallery>
      <section className="bg-slate-100 p-4">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images[0]}
              thumbnail={images[0]}
              width="1000"
              height="600"
            >
              {({ ref, open }: any) => (
                <div className="relative w-full h-[400px] mx-auto rounded-xl overflow-hidden">
                  <Image
                    ref={ref}
                    onClick={open}
                    alt="propertyImage"
                    src={images[0]}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`${
                    images.length === 3 && i === 2 ? "col-span-2" : "col-span-1"
                  } relative h-[400px] rounded-xl overflow-hidden`}
                >
                  <Item
                    original={img}
                    thumbnail={img}
                    width="1000"
                    height="600"
                  >
                    {({ ref, open }: any) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        alt={`propertyImage-${i}`}
                        src={img}
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </Item>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  );
}
