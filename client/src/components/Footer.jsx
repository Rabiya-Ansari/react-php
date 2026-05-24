import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const Footer = () => {
  const quickLinks = ["Home", "Shop", "About Us", "Blog", "Contact"];
  const categories = ["Sindhri Mangoes", "Chaunsa Mangoes", "Anwar Ratol", "Langra Mangoes"];

  const socials = [
    {
      label: "Facebook",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
        </svg>
      ),
    },
  ];

  const contact = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 shrink-0">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.58a16 16 0 0 0 5.51 5.51l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      value: "+92 300 1234567",
      href: "tel:+923001234567",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 shrink-0">
          <rect x="2" y="4" width="20" height="16" rx="3" />
          <path d="m2 7 10 7 10-7" />
        </svg>
      ),
      value: "info@rehmatmangoes.com",
      href: "mailto:info@rehmatmangoes.com",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-4 h-4 shrink-0">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      ),
      value: "Karachi, Pakistan",
      href: "https://maps.google.com",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500&display=swap');
        .ft-root { font-family: 'DM Sans', sans-serif; }

        .ft-social {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.6);
          cursor: pointer;
          transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.25s;
        }
        .ft-social:hover {
          background: #eab308;
          color: #1a2e1a;
          border-color: #eab308;
          transform: translateY(-2px);
        }

        .ft-link {
          display: flex; align-items: center; gap: 8px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.2s, padding-left 0.2s;
          font-weight: 300;
        }
        .ft-link::before {
          content: '';
          width: 0; height: 0;
          border-top: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-left: 5px solid #eab308;
          opacity: 0;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .ft-link:hover { color: #fde68a; padding-left: 4px; }
        .ft-link:hover::before { opacity: 1; }

        .ft-contact-row {
          display: flex; align-items: flex-start; gap: 12px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.5);
          font-weight: 300;
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-contact-row:hover { color: #fde68a; }
        .ft-contact-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: #eab308;
          flex-shrink: 0;
        }

        .ft-col-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 1.25rem;
          display: flex; align-items: center; gap: 10px;
        }
        .ft-col-title::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .ft-bottom-link {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s;
        }
        .ft-bottom-link:hover { color: #fde68a; }
      `}</style>

      <footer className="ft-root bg-[#0f1f0f] relative overflow-hidden">

        {/* Background blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-900/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

        {/* Top CTA strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="border-b border-white/5"
        >
          <div className="container mx-auto px-6 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p
                className="text-white text-lg font-semibold"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Ready to taste the finest mangoes of Pakistan?
              </p>
              <p className="text-white/40 text-xs font-light mt-1">
                Order now and get doorstep delivery within 24 hours.
              </p>
            </div>
            <button className="shrink-0 bg-yellow-400 hover:bg-yellow-300 transition text-[#1a2e1a] font-semibold text-sm px-7 py-3 rounded-full uppercase tracking-widest">
              Shop Now →
            </button>
          </div>
        </motion.div>

        {/* Main grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="container mx-auto px-6 lg:px-16 pt-14 pb-10"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand column */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2d5a27] to-[#4a8c42] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                    <path d="M14 4C10 4 7 7.5 7 11.5C7 17 11 21 14 23C17 21 21 17 21 11.5C21 7.5 18 4 14 4Z" fill="rgba(255,255,255,0.95)" />
                    <path d="M14 4C14 4 16 2 19 3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-white font-semibold text-base leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Rehmat Mangoes
                  </p>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase">
                    Farm Fresh · Est. 1982
                  </p>
                </div>
              </div>

              <p className="text-white/45 text-sm leading-7 font-light">
                Export-quality Pakistani mangoes delivered straight from Rehmat
                Farms to your doorstep — naturally ripened, handpicked with care.
              </p>

              {/* Socials */}
              <div className="flex gap-2 mt-6">
                {socials.map((s, i) => (
                  <button key={i} className="ft-social" aria-label={s.label}>
                    {s.icon}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeUp}>
              <h4 className="ft-col-title">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((l, i) => (
                  <li key={i}>
                    <a href="#" className="ft-link">{l}</a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Categories */}
            <motion.div variants={fadeUp}>
              <h4 className="ft-col-title">Our Varieties</h4>
              <ul className="space-y-3">
                {categories.map((c, i) => (
                  <li key={i}>
                    <a href="#" className="ft-link">{c}</a>
                  </li>
                ))}
              </ul>

              {/* Mini badge */}
              <div className="mt-6 inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-yellow-400 text-xs font-medium tracking-wide">
                  Season Live Now
                </span>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div variants={fadeUp}>
              <h4 className="ft-col-title">Get in Touch</h4>
              <div className="space-y-4">
                {contact.map((c, i) => (
                  <a key={i} href={c.href} className="ft-contact-row">
                    <div className="ft-contact-icon">{c.icon}</div>
                    <span className="pt-1">{c.value}</span>
                  </a>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className="container mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/25 text-xs font-light">
              © 2026 Rehmat Mangoes. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy Policy", "Terms of Use", "Sitemap"].map((l, i) => (
                <a key={i} href="#" className="ft-bottom-link">{l}</a>
              ))}
            </div>
          </div>
        </div>

      </footer>
    </>
  );
};

export default Footer;