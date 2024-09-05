import { width } from "@mui/system";
import Image from "next/image";
import React from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
export default function PropertyImages({ images }: { images: string[] }) {
  console.log(images);
  return (
    <Gallery>
      <section className=" bg-slate-100 p-4 ">
        <div className="container mx-auto">
          {images.length === 1 ? (
            <Item
              original={images.at(0)}
              thumbnail={images.at(0)}
              width="1000"
              height="600"
            >
              {({ ref, open }: any) => (
                <Image
                  ref={ref}
                  onClick={open}
                  alt="propertyImage"
                  className="object-cover h-[400px] mx-auto rounded-xl"
                  src={images[0]}
                  width={1800}
                  height={400}
                  priority={true}
                  style={{ height: "auto" }}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`${
                    images.length === 3 && i === 2 ? "col-span-2" : "col-span-1"
                  }`}
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
                        className="object-cover h-[400px] w-full rounded-xl"
                        src={img}
                        width={900}
                        height={400}
                        priority={true}
                        style={{ height: "auto" }}
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
