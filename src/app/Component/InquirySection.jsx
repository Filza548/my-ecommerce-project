"use client";

import { useState } from "react";
import Image from "next/image";

export default function InquirySection() {
  const [form, setForm] = useState({
    item: "",
    details: "",
    qty: "",
    unit: "Pcs",
  });

  const [ui, setUi] = useState({
    loading: false,
    error: "",
    success: "",
  });

  function setField(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
    setUi((u) => ({ ...u, error: "", success: "" }));
  }

  function validate() {
    const item = form.item.trim();
    const details = form.details.trim();
    const qtyNum = Number(form.qty);

    if (!item) return "Please enter item name.";
    if (item.length < 2) return "Item name is too short.";
    if (!details) return "Please type details.";
    if (details.length < 5) return "Details must be at least 5 characters.";
    if (!form.qty) return "Please enter quantity.";
    if (!Number.isFinite(qtyNum) || qtyNum <= 0) return "Quantity must be greater than 0.";

    return "";
  }

  async function onSubmit(e) {
    e.preventDefault();

    const err = validate();
    if (err) {
      setUi({ loading: false, error: err, success: "" });
      return;
    }

    // ✅ "Full functionality" demo: loading state + console log + success + reset
    setUi({ loading: true, error: "", success: "" });

    // simulate async request
    await new Promise((r) => setTimeout(r, 500));

    const payload = {
      item: form.item.trim(),
      details: form.details.trim(),
      quantity: Number(form.qty),
      unit: form.unit,
      createdAt: new Date().toISOString(),
    };

    // ✅ Console log message (your requirement)
    console.log("✅ Inquiry Submitted:", payload);

    setUi({ loading: false, error: "", success: "Inquiry sent successfully!" });
    setForm({ item: "", details: "", qty: "", unit: "Pcs" });
  }

  return (
    <section className="w-full mt-25 ">
      <div className="mx-auto max-w-7xl px-3 md:px-6">
        <div className="relative overflow-hidden rounded-lg">
          {/* ✅ Background Image */}
          <div className="absolute inset-0">
            {/* Put your image in: public/assets/images/banners/warehouse-bg.png */}
            <Image
              src="/assets/assets/Image/backgrounds/Group982.png" // <-- background image path
              alt="Inquiry background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* ✅ Gradient overlay like screenshot */}
          <div className="absolute inset-0" />

          {/* Content */}
          <div className="relative grid gap-6 p-5 md:grid-cols-[1fr_520px] md:p-10">
            {/* LEFT TEXT */}
            <div className="text-white">
              <h2 className="text-2xl font-bold leading-snug md:text-4xl">
                An easy way to send <br />
                requests to all suppliers
              </h2>
              <p className="mt-3 max-w-xl text-sm text-white/90 md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>

            {/* RIGHT CARD */}
            <div className="rounded-lg bg-white p-5 shadow-lg md:p-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Send quote to suppliers
              </h3>

              <form className="mt-4 space-y-4" onSubmit={onSubmit}>
                <input
                  value={form.item}
                  onChange={(e) => setField("item", e.target.value)}
                  placeholder="What item you need?"
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500"
                />

                <textarea
                  value={form.details}
                  onChange={(e) => setField("details", e.target.value)}
                  placeholder="Type more details"
                  rows={4}
                  className="w-full resize-none rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500"
                />

                <div className="grid grid-cols-[1fr_140px] gap-3">
                  <input
                    value={form.qty}
                    onChange={(e) => setField("qty", e.target.value)}
                    placeholder="Quantity"
                    inputMode="numeric"
                    className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />

                  <div className="relative">
                    <select
                      value={form.unit}
                      onChange={(e) => setField("unit", e.target.value)}
                      className="w-full appearance-none rounded-md border bg-white px-3 py-2 pr-10 text-sm outline-none focus:border-blue-500"
                    >
                      <option>Pcs</option>
                      <option>Kg</option>
                      <option>Box</option>
                      <option>Set</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                {ui.error ? (
                  <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                    {ui.error}
                  </div>
                ) : null}

                {ui.success ? (
                  <div className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
                    {ui.success}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={ui.loading}
                  className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {ui.loading ? "Sending..." : "Send inquiry"}
                </button>
              </form>

              {/* Optional hint */}
              <p className="mt-3 text-xs text-gray-500">
                Note: Submit karne par data console me print ho ga.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
