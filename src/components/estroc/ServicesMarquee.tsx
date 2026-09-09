interface ServicesMarqueeProps {
  onSelect: (id: string) => void
}

const marqueeServices = [
  "IF YOU CAN IMAGINE IT",
  "ESTROC CAN BUILD IT",
]

export default function ServicesMarquee({
  onSelect,
}: ServicesMarqueeProps) {
  const run = (key: string) => (
    <ul
      className="marquee-run"
      aria-hidden={key === "echo" ? true : undefined}
    >
      {marqueeServices.map((service, index) => (
        <li
          key={`${key}-${service}-${index}`}
          className={`marquee-item ${
            index === 0
              ? "marquee-item-filled"
              : "marquee-item-outline"
          }`}
        >
          <span className="marquee-text">
            {service}
          </span>

          <span
            className="marquee-mark"
            aria-hidden="true"
          >
            •
          </span>
        </li>
      ))}
    </ul>
  )

  return (
    <section
      className="border-y border-white/[0.08] bg-[#0d0d0f]"
      data-testid="services-marquee-section"
    >
      <button
        type="button"
        onClick={() => onSelect("build")}
        className="marquee-group block w-full overflow-hidden py-7 text-left sm:py-9"
        aria-label="See everything ESTROC builds"
        data-testid="services-marquee"
      >
        <div className="marquee-track">
          {run("lead")}
          {run("echo")}
        </div>
      </button>
    </section>
  )
}