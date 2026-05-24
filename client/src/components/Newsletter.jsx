import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = () => {
    if (email.includes("@")) {
      setSubmitted(true);
      setEmail("");
    }
  };

  const perks = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <path d="M20 12V22H4V12" />
          <path d="M22 7H2v5h20V7z" />
          <path d="M12 22V7" />
          <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
          <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
        </svg>
      ),
      label: "Exclusive Deals",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c9 0 12-8 12-8a14.5 14.5 0 0 1-3 .86z" />
        </svg>
      ),
      label: "Seasonal Drops",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      label: "Early Access",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      label: "Zero Spam",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .nl-root { font-family: 'DM Sans', sans-serif; }

        .nl-input-wrap {
          display: flex;
          align-items: center;
          background: #fff;
          border: 1.5px solid #e8e8e2;
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.25s, box-shadow 0.25s;
          max-width: 520px;
          width: 100%;
        }
        .nl-input-wrap.focused {
          border-color: #3d6b3d;
          box-shadow: 0 0 0 4px rgba(61,107,61,0.08);
        }
        .nl-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 14px 20px;
          font-size: 14px;
          font-family: 'DM Sans', sans-serif;
          color: #1a2e1a;
          background: transparent;
        }
        .nl-input::placeholder { color: #b0b0a8; }

        .nl-btn {
          background: #1a2e1a;
          color: #fff;
          border: none;
          padding: 12px 28px;
          margin: 4px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: background 0.25s, transform 0.2s;
          white-space: nowrap;
        }
        .nl-btn:hover { background: #2d5a27; }
        .nl-btn:active { transform: scale(0.97); }

        .nl-perk {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #5a7a56;
          font-weight: 400;
        }
        .nl-perk svg { color: #3d6b3d; flex-shrink: 0; }

        .nl-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          animation: nl-pop 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes nl-pop {
          0% { opacity: 0; transform: scale(0.88) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .nl-check {
          width: 56px; height: 56px;
          border-radius: 50%;
          background: #e8f5e4;
          display: flex; align-items: center; justify-content: center;
          color: #3d6b3d;
        }
      `}</style>

      <section className="nl-root py-28 bg-[#fafaf7] relative overflow-hidden">

        {/* Background blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

        {/* Decorative rings */}
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full border border-[#1a2e1a]/5 pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border border-yellow-300/20 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col items-center text-center"
          >

            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-yellow-400" />
              <span className="text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em]">
                Stay in the Loop
              </span>
              <span className="block w-8 h-px bg-yellow-400" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              className="text-4xl md:text-5xl font-extrabold text-[#1a2e1a] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Fresh Deals,{" "}
              <span className="text-yellow-500 italic">Right to Your Inbox</span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              variants={fadeUp}
              className="mt-4 text-gray-400 text-sm max-w-md font-light leading-relaxed"
            >
              Be the first to know about seasonal mango drops, exclusive
              subscriber-only discounts, and harvest updates from Rehmat Farms.
            </motion.p>

            {/* Perks row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap justify-center gap-5 mt-8 mb-10"
            >
              {perks.map((p, i) => (
                <div key={i} className="nl-perk">
                  {p.icon}
                  <span>{p.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Input or Success */}
            <motion.div variants={fadeUp} className="w-full flex justify-center">
              {submitted ? (
                <div className="nl-success">
                  <div className="nl-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-semibold text-[#1a2e1a]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    You're on the list!
                  </h3>
                  <p className="text-gray-400 text-sm font-light">
                    Welcome to the Rehmat Farms family. Expect something sweet soon.
                  </p>
                </div>
              ) : (
                <div
                  className={`nl-input-wrap ${focused ? "focused" : ""}`}
                >
                  {/* Mail icon */}
                  <div className="pl-4 text-gray-400">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5">
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="m2 7 10 7 10-7" />
                    </svg>
                  </div>

                  <input
                    type="email"
                    className="nl-input"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />

                  <button className="nl-btn" onClick={handleSubmit}>
                    Subscribe →
                  </button>
                </div>
              )}
            </motion.div>

            {/* Fine print */}
            {!submitted && (
              <motion.p
                variants={fadeUp}
                className="mt-5 text-xs text-gray-400 font-light"
              >
                No spam, ever. Unsubscribe anytime.{" "}
                <span className="text-[#3d6b3d] font-medium cursor-pointer hover:underline">
                  Privacy Policy
                </span>
              </motion.p>
            )}

            {/* Divider */}
            <motion.div
              variants={fadeUp}
              className="mt-16 w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
            />

            {/* Bottom social proof */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap justify-center items-center gap-3 text-gray-400 text-sm font-light"
            >
              <div className="flex -space-x-2">
                {["img=12", "img=32", "img=5", "img=47", "img=22"].map((q, i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/40?${q}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    alt=""
                  />
                ))}
              </div>
              <span>
                <span className="text-[#1a2e1a] font-medium">2,400+ subscribers</span>{" "}
                already enjoy our seasonal updates.
              </span>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;