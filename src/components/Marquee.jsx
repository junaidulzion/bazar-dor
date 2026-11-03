import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();

  const headlines = Array.isArray(json)
    ? json
    : (json.data ?? json.products ?? []);

  if (headlines.length === 0) return null;

  return (
    <div className="mt-3 overflow-hidden border-y border-gray-200 bg-white">
      <div className="marquee-pause">
        <MarqueeText direction="right" duration={20}>
          {headlines.map((h) => {
            const change = Number(h?.change?.pct ?? 0);

            return (
              <span
                key={h?.id}
                className="inline-flex items-center gap-1.5 border-r border-gray-200 px-4 py-2 text-xs whitespace-nowrap"
              >
                <span>{h?.categoryIcon}</span>

                <span className="font-medium text-sm text-gray-700">
                  {h?.nameBn}
                </span>

                <span className="text-gray-600">
                  {h?.today} টাকা/কেজি
                </span>

                <span
                  className={`font-semibold ${
                    change > 0
                      ? "text-red-500"
                      : change < 0
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {change > 0 ? "▲" : change < 0 ? "▼" : "—"}{" "}
                  {Math.abs(change)}%
                </span>
              </span>
            );
          })}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;