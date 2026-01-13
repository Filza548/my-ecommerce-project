"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(targetMs) {
  const now = Date.now();
  const diff = Math.max(0, targetMs - now);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { diff, days, hours, minutes, seconds };
}

export default function DealsOffers() {
  // ✅ Set your offer end date/time here
  // Example: 4 days from now
  const targetMs = useMemo(() => Date.now() + 4 * 24 * 60 * 60 * 1000, []);

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetMs));

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(targetMs));
    }, 1000);

    return () => clearInterval(id);
  }, [targetMs]);

  // ✅ Replace these image paths with your own images (put them in /public)
  const products = [
    {
      title: "Smart watches",
      discount: "-25%",
      img: "/assets/assets/Image/tech/watch.png", // <-- yahan image
    },
    {
      title: "Laptops",
      discount: "-15%",
      img: "/assets/assets/Image/tech/imagelaptop.png", // <-- yahan image
    },
    {
      title: "GoPro cameras",
      discount: "-40%",
      img: "/assets/assets/Image/tech/camera.png", // <-- yahan image
    },
    {
      title: "Headphones",
      discount: "-25%",
      img: "/assets/assets/Image/tech/headphoness.png", // <-- yahan image
    },
    {
      title: "Canon cameras",
      discount: "-25%",
      img: "/assets/assets/Image/tech/mobile.png", // <-- yahan image
    },
  ];

  return (
    <section className="w-full bg-white mt-10">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
          <div className="grid md:grid-cols-[280px_1fr]">
            {/* LEFT PANEL */}
            <div className="border-b border-gray-300 p-4 md:border-b-0 md:border-r md:p-5">
              <h3 className="text-lg font-semibold text-gray-900">
                Deals and offers
              </h3>
              <p className="text-sm text-gray-500">Hygiene equipments</p>

              {/* TIMER */}
              <div className="mt-4 flex gap-2 ">
                <TimeBox label="Days" value={pad2(timeLeft.days)} />
                <TimeBox label="Hour" value={pad2(timeLeft.hours)} />
                <TimeBox label="Min" value={pad2(timeLeft.minutes)} />
                <TimeBox label="Sec" value={pad2(timeLeft.seconds)} />
              </div>
            </div>

            {/* RIGHT: PRODUCTS ROW */}
            <div className="grid grid-cols-2 md:grid-cols-5">
              {products.map((p, idx) => (
                <div
                  key={p.title}
                  className={[
                    "flex flex-col items-center justify-center px-3 py-4 text-center",
                    // vertical dividers like screenshot
                    idx !== 0 ? "md:border-l" : "",
                    // light border between rows on mobile
                    "border-t border-gray-300 md:border-t-0",
                  ].join(" ")}
                >
                  {/* IMAGE */}
                  <div className="relative h-24 w-24 md:h-28 md:w-28">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      className="object-contain"
                      sizes="112px"
                      priority={idx < 2}
                    />
                  </div>

                  {/* TITLE */}
                  <p className="mt-3 text-sm font-medium text-gray-800">
                    {p.title}
                  </p>

                  {/* DISCOUNT PILL */}
                  <span className="mt-2 inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                    {p.discount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="w-[54px] rounded-md bg-gray-700 px-2 py-2 text-center text-white">
      <div className="text-base font-semibold leading-none">{value}</div>
      <div className="mt-1 text-[11px] leading-none text-white/80">{label}</div>
    </div>
  );
}
