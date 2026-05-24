import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      {/* Overlays */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      {/* Subtle bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Decorative circle — top right */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full border border-white/5 pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl text-white"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-7">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-medium tracking-wide">
              <svg
                className="w-4 h-4 text-green-400 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c9 0 12-8 12-8a14.5 14.5 0 0 1-3 .86z" />
              </svg>
              100% Organic · Farm Fresh Mangoes
            </span>
          </motion.div>

          {/* Eyebrow line */}
          <motion.div
            variants={item}
            className="flex items-center gap-3 mb-4"
          >
            <span className="block w-10 h-px bg-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-[0.2em]">
              Rehmat Mango Farms
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="text-5xl md:text-[68px] font-extrabold leading-[1.08] tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Taste The Real <br />
            <span
              className="text-yellow-400 italic"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Sweetness
            </span>{" "}
            <span className="text-white">of Pakistan</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={item}
            className="mt-6 text-base md:text-lg text-gray-300 leading-relaxed max-w-xl font-light"
          >
            Premium Sindhri &amp; Chaunsa mangoes directly from our farm.
            Naturally ripened, handpicked, and delivered fresh to your doorstep.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 mt-10"
          >
            <button className="group relative overflow-hidden bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 text-black px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-widest shadow-lg shadow-yellow-500/20">
              <span className="relative z-10">Shop Now</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 skew-x-[-15deg]" />
            </button>

            <button className="group border border-white/30 hover:border-white/70 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-white px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-widest">
              Explore More
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={item}
            className="mt-14 mb-10 w-full h-px bg-white/10"
          />

          {/* Stats */}
          <motion.div
            variants={container}
            className="flex flex-wrap gap-10"
          >
            {[
              { value: "5,000+", label: "Happy Customers", icon: "😊" },
              { value: "100%", label: "Organic Mangoes", icon: "🥭" },
              { value: "24h", label: "Fast Delivery", icon: "🚚" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={item}
                className="flex flex-col gap-1"
              >
                <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                  {stat.icon} {stat.label}
                </span>
                <span className="text-3xl md:text-4xl font-extrabold text-white leading-none">
                  {stat.value}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust strip */}
          <motion.div
            variants={item}
            className="mt-12 flex items-center gap-3 text-gray-400 text-sm"
          >
            <div className="flex -space-x-2">
              {["bg-yellow-300", "bg-green-300", "bg-orange-300", "bg-lime-300"].map(
                (bg, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${bg} border-2 border-black/40 flex items-center justify-center text-xs font-bold text-black`}
                  >
                    {["A", "S", "R", "M"][i]}
                  </div>
                )
              )}
            </div>
            <span>
              Trusted by{" "}
              <span className="text-white font-semibold">5,000+ families</span>{" "}
              across Pakistan &amp; abroad
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span>Scroll</span>
        <motion.div
          className="w-px h-10 bg-white/30"
          animate={{ scaleY: [1, 0.3, 1], originY: 0 }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;