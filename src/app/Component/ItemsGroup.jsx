import Image from "next/image";

export function ItemsGroup() {
  // ✅ Left Banner Image (put in /public)
  const banner = {
    title: "Home and\nautdoor",
    button: "Source now",
    img: "/assets/assets/Image/backgrounds/background-interior.png", // <-- LEFT banner image path
  };

  // ✅ Right grid items (8)
  const items = [
    { title: "Soft chairs", price: "USD 19", img: "/assets/assets/Image/interior/chair.png" },
    { title: "Sofa & chair", price: "USD 19", img: "/assets/assets/Image/interior/lamp.png" },
    { title: "Kitchen dishes", price: "USD 19", img: "/assets/assets/Image/interior/kitchendishes.png" },
    { title: "Smart watches", price: "USD 19", img: "/assets/assets/Image/interior/matka.png" },
    { title: "Kitchen mixer", price: "USD 100", img: "/assets/assets/Image/interior/kitchenmixer.png" },
    { title: "Blenders", price: "USD 39", img: "/assets/assets/Image/interior/blender.png" },
    { title: "Home appliance", price: "USD 19", img: "/assets/assets/Image/interior/homethings.png" },
    { title: "Coffee maker", price: "USD 10", img: "/assets/assets/Image/interior/plant.png" },
  ];

  return (
    <section className="w-full bg-white mt-15">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
          <div className="grid md:grid-cols-[280px_1fr]">
            {/* LEFT BANNER */}
            <div className="relative min-h-[180px] overflow-hidden  border-b md:min-h-[260px] md:border-b-0 md:border-r">
              {/* Banner image */}
              <Image
                src={banner.img}
                alt="Home and outdoor banner"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 280px"
                priority
              />

              {/* Overlay content */}
              <div className="relative z-10 p-5">
                <h3 className="whitespace-pre-line text-xl font-semibold leading-snug text-gray-900">
                  {banner.title}
                </h3>

                <button className="mt-4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-gray-50">
                  {banner.button}
                </button>
              </div>

              {/* Soft overlay like screenshot */}
              <div className="absolute inset-0 bg-yellow-50/30" />
            </div>

            {/* RIGHT GRID (8 items) */}
            <div className="grid grid-cols-2 md:grid-cols-4">
              {items.map((it, idx) => (
                <div
                  key={it.title}
                  className={[
                    "relative flex h-[128px] items-start justify-between gap-3 p-4 md:h-[130px]",
                    // borders like screenshot
                    "border-t border-gray-300 md:border-t-0",
                    idx % 2 === 1 ? "border-l" : "", // mobile vertical divider
                    idx >= 4 ? "md:border-t" : "", // 2nd row divider on desktop
                    idx % 4 !== 0 ? "md:border-l" : "", // desktop vertical dividers
                  ].join(" ")}
                >
                  {/* Left text */}
                  <div className="pt-1">
                    <p className="text-sm font-medium text-gray-900">{it.title}</p>
                    <p className="mt-2 text-xs text-gray-500">From</p>
                    <p className="text-sm text-blue-500">{it.price}</p>
                  </div>

                  {/* Right image */}
                  <div className="relative h-16 w-16 shrink-0 md:h-20 md:w-20">
                    <Image
                      src={it.img}
                      alt={it.title}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export function ItemsGroupElectronics() {
  // ✅ Left Banner (put image in /public)
  const banner = {
    title: "Consumer\nelectronics and\ngadgets",
    button: "Source now",
    img: "/assets/assets/Image/backgrounds/backgroun-mobile-headphone.png", // <-- LEFT banner image
  };

  // ✅ Right grid items (8)
  const items = [
    { title: "Smart watches", price: "USD 19", img: "/assets/assets/Image/tech/watch.png" },
    { title: "Cameras", price: "USD 89", img: "/assets/assets/Image/tech/camera.png" },
    { title: "Headphones", price: "USD 10", img: "/assets/assets/Image/tech/headphone.png" },
    { title: "Smart watches", price: "USD 90", img: "/assets/assets/Image/tech/jug.png" }, // (image looks like kettle in screenshot)
    { title: "Gaming set", price: "USD 35", img: "/assets/assets/Image/tech/headphoness.png" },
    { title: "Laptops & PC", price: "USD 340", img: "/assets/assets/Image/tech/imagelaptop.png" },
    { title: "Smartphones", price: "USD 19", img: "/assets/assets/Image/tech/tab.png" },
    { title: "Electric kattle", price: "USD 240", img: "/assets/assets/Image/tech/minimobile.png" }, // red phone in screenshot
  ];

  return (
    <section className="w-full bg-white mt-15">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
          <div className="grid md:grid-cols-[280px_1fr]">
            {/* LEFT BANNER */}
            <div className="relative min-h-[180px] overflow-hidden border-b md:min-h-[260px] md:border-b-0 md:border-r">
              <Image
                src={banner.img}
                alt="Consumer electronics and gadgets banner"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 280px"
                priority
              />

              <div className="relative z-10 p-5">
                <h3 className="whitespace-pre-line text-xl font-semibold leading-snug text-gray-900">
                  {banner.title}
                </h3>

                <button className="mt-4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-gray-50">
                  {banner.button}
                </button>
              </div>

              {/* Light overlay like screenshot */}
              <div className="absolute inset-0 bg-blue-50/35" />
            </div>

            {/* RIGHT GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4">
              {items.map((it, idx) => (
                <div
                  key={`${it.title}-${idx}`}
                  className={[
                    "relative flex h-[128px] items-start justify-between gap-3 p-4 md:h-[130px]",
                    "border-t border-gray-300 md:border-t-0",
                    idx % 2 === 1 ? "border-l" : "",
                    idx >= 4 ? "md:border-t" : "",
                    idx % 4 !== 0 ? "md:border-l" : "",
                  ].join(" ")}
                >
                  {/* Text */}
                  <div className="pt-1">
                    <p className="text-sm font-medium text-gray-900">{it.title}</p>
                    <p className="mt-2 text-xs text-gray-500">From</p>
                    <p className="text-sm text-blue-500">{it.price}</p>
                  </div>

                  {/* Image */}
                  <div className="relative h-16 w-16 shrink-0 md:h-20 md:w-20">
                    <Image
                      src={it.img}
                      alt={it.title}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
