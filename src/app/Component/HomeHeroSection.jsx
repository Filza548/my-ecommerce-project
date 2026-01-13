`use client`;
import Image from "next/image";

export default function HomeHeroSection() {
    const categories = [
        "Automobiles",
        "Products",
        "Home interiors",
        "Computer and tech",
        "Tools, equipments",
        "Sports and outdoor",
        "Animal and pets",
        "Machinery tools",
        "More category",
    ];

    return (
        <section className="w-full bg-white">
            <div className="mx-auto max-w-7xl px-3 md:px-6">
                <div className="rounded-lg  bg-white p-3 md:p-4">
                    {/* 3 Columns */}
                    <div className="grid gap-3 md:grid-cols-[240px_1fr_260px]">
                        {/* LEFT: Categories */}
                        <aside className="hidden md:block">
                            <div className="rounded-md bg-gray-50 p-2">
                                <ul className="space-y-1">
                                    {categories.map((item, idx) => (
                                        <li key={item}>
                                            <a
                                                href="#"
                                                className={`block rounded-md px-3 py-2 text-sm ${idx === 0
                                                        ? "bg-blue-100 text-gray-900"
                                                        : "text-gray-600 hover:bg-white hover:text-gray-900"
                                                    }`}
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* CENTER: Hero Banner */}
                       <div className="relative h-[175px] sm:h-[200px] md:h-[376px] w-full overflow-hidden rounded-md">
  <Image
    src="/assets/assets/Image/backgrounds/Banner-board.png"
    alt="Banner board background"
    fill
    className="object-cover"
    priority
  />

  <div className="absolute inset-0 bg-white/0" />

  <div className="relative flex h-full items-center p-4 md:p-10">
    <div className="max-w-md">
      <p className="text-lg font-medium text-gray-900 md:text-2xl">
        Latest trending
      </p>

      <h2 className="mt-1 text-xl font-bold text-gray-900 md:text-4xl">
        Electronic items
      </h2>

      <button className="mt-4 rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow hover:bg-gray-100">
        Learn more
      </button>
    </div>
  </div>
</div>


                        {/* RIGHT: Cards */}
                        <aside className="space-y-3">
                            {/* User Card */}
                            <div className="rounded-md bg-blue-50 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200 text-blue-700">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M20 21a8 8 0 0 0-16 0"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                            <path
                                                d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">Hi, user</p>
                                        <p className="text-sm text-gray-600">let’s get stated</p>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <button className="w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                                        Join now
                                    </button>
                                    <button className="w-full rounded-md bg-white py-2 text-sm font-semibold text-blue-700 hover:bg-gray-50">
                                        Log in
                                    </button>
                                </div>
                            </div>

                            {/* Orange Card */}
                            <div className="rounded-md bg-orange-500 p-4 text-white">
                                <p className="text-sm font-semibold leading-5">
                                    Get US $10 off <br />
                                    with a new <br />
                                    supplier
                                </p>
                            </div>

                            {/* Teal Card */}
                            <div className="rounded-md bg-teal-500 p-4 text-white">
                                <p className="text-sm font-semibold leading-5">
                                    Send quotes with <br />
                                    supplier <br />
                                    preferences
                                </p>
                            </div>
                        </aside>
                    </div>

                    {/* MOBILE: Categories Pills */}
                    <div className="mt-3 md:hidden">
                        <div className="no-scrollbar flex gap-2 overflow-x-auto">
                            {categories.map((c, idx) => (
                                <button
                                    key={c}
                                    className={`whitespace-nowrap rounded-md border px-3 py-1.5 text-sm ${idx === 0
                                            ? "border-blue-200 bg-blue-50 text-blue-700"
                                            : "bg-white text-gray-700"
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
