import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const testimonials = [
  {
    quote:
      "Absolutely the best mangoes I've ever tasted. Packing was secure, delivery was lightning fast, and the Sindhri variety was incredibly sweet and juicy.",
    name: "Destinee Crawford",
    role: "Marketing Professional",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    variety: "Sindhri",
  },
  {
    quote:
      "Rehmat Farms never disappoints. The Chaunsa mangoes were perfectly ripe on arrival — melt-in-your-mouth sweetness with zero fibres. Will order again every season.",
    name: "Ahmed Ali",
    role: "Verified Customer",
    avatar: "https://i.pravatar.cc/80?img=32",
    rating: 5,
    variety: "Chaunsa",
    featured: true,
  },
  {
    quote:
      "Highly recommended. Fresh, natural taste just like straight from the farm. The Anwar Ratol box was a wonderful gift — my whole family loved it.",
    name: "Sara Khan",
    role: "Happy Buyer",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    variety: "Anwar Ratol",
  },
];

const StarRow = ({ count }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: count }).map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4 text-yellow-400"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .tst-root { font-family: 'DM Sans', sans-serif; }

        .tst-card {
          position: relative;
          backdrop-filter: blur(14px);
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 20px;
          padding: 2rem 1.75rem;
          color: #fff;
          overflow: hidden;
          transition: background 0.35s, border-color 0.35s, transform 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .tst-card:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.28);
          transform: translateY(-5px);
        }
        .tst-card.featured {
          background: rgba(26,46,26,0.55);
          border-color: rgba(250,204,21,0.35);
        }
        .tst-card.featured:hover {
          background: rgba(26,46,26,0.68);
          border-color: rgba(250,204,21,0.55);
        }

        .tst-quote-icon {
          font-family: 'Cormorant Garamond', serif;
          font-size: 88px;
          line-height: 0.6;
          color: rgba(250,204,21,0.25);
          position: absolute;
          top: 1.5rem;
          right: 1.75rem;
          pointer-events: none;
          user-select: none;
        }

        .tst-variety {
          display: inline-block;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #fde68a;
          background: rgba(250,204,21,0.15);
          border: 1px solid rgba(250,204,21,0.25);
          border-radius: 999px;
          padding: 3px 12px;
          margin-bottom: 12px;
        }

        .tst-text {
          font-size: 14px;
          color: rgba(255,255,255,0.82);
          line-height: 1.8;
          font-weight: 300;
        }

        .tst-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.1);
          margin: 1.25rem 0;
        }

        .tst-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
        }
        .tst-role {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        .tst-avatar {
          width: 46px; height: 46px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(250,204,21,0.4);
        }
      `}</style>

      <section
        className="tst-root relative py-28 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: "url('/public/images/testimonial.jpg')",
        }}
      >
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />

        {/* Decorative rings */}
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[380px] h-[380px] rounded-full border border-white/5 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">

          {/* Section Header */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center text-center mb-16"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold uppercase tracking-[0.2em]">
                Customer Stories
              </span>
              <span className="block w-8 h-px bg-yellow-400" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              What Our{" "}
              <span className="text-yellow-400 italic">Customers Say</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-3 text-white/50 text-sm max-w-md font-light leading-relaxed"
            >
              Real words from real mango lovers — families, food lovers, and
              loyal buyers who come back every season.
            </motion.p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={item}
                className={`tst-card ${t.featured ? "featured" : ""}`}
              >
                {/* Decorative quote mark */}
                <span className="tst-quote-icon" aria-hidden="true">"</span>

                <div className="relative z-10">
                  {/* Variety tag */}
                  <span className="tst-variety">{t.variety}</span>

                  {/* Stars */}
                  <StarRow count={t.rating} />

                  {/* Quote */}
                  <p className="tst-text">"{t.quote}"</p>

                  {/* Divider */}
                  <div className="tst-divider" />

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="tst-avatar"
                    />
                    <div>
                      <p className="tst-name">{t.name}</p>
                      <p className="tst-role">{t.role}</p>
                    </div>

                    {t.featured && (
                      <div className="ml-auto">
                        <span className="text-[10px] font-medium tracking-widest uppercase text-yellow-400 bg-yellow-400/10 border border-yellow-400/25 px-3 py-1 rounded-full">
                          Top Review
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom strip */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-16 flex flex-wrap justify-center items-center gap-3 text-white/50 text-sm font-light"
          >
            <div className="flex -space-x-2 mr-2">
              {["img=12", "img=32", "img=5", "img=47", "img=22"].map((q, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?${q}`}
                  className="w-8 h-8 rounded-full border-2 border-black/40 object-cover"
                  alt=""
                />
              ))}
            </div>
            <span>
              Joined by{" "}
              <span className="text-white font-medium">5,000+ happy customers</span>{" "}
              — and growing every season.
            </span>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default Testimonials;