const WhyChooseUs = () => {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c9 0 12-8 12-8a14.5 14.5 0 0 1-3 .86z" />
        </svg>
      ),
      tag: "From the Source",
      title: "Farm Fresh",
      desc: "Handpicked directly from Rehmat Farms at peak ripeness — no cold storage, no middlemen.",
      stat: "Same Day",
      statLabel: "Harvest to Pack",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7">
          <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      tag: "100% Natural",
      title: "Organic Grown",
      desc: "Naturally ripened with zero chemicals or artificial agents — pure taste, pure health.",
      stat: "0%",
      statLabel: "Chemicals Used",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7">
          <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
          <rect x="9" y="11" width="14" height="10" rx="2" />
          <circle cx="12" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
        </svg>
      ),
      tag: "Speedy",
      title: "Fast Delivery",
      desc: "Packed securely and shipped swiftly across Pakistan and abroad within 24 hours.",
      stat: "24h",
      statLabel: "Delivery Window",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-7 h-7">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
      tag: "Certified",
      title: "Export Quality",
      desc: "Every batch meets international export standards — the same quality sent worldwide.",
      stat: "A+",
      statLabel: "Quality Grade",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .wcu-root { font-family: 'DM Sans', sans-serif; }

        .wcu-card {
          position: relative;
          background: #fff;
          border: 1px solid #efefeb;
          border-radius: 16px;
          padding: 2rem 1.75rem;
          overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
        }
        .wcu-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #f0faf0 0%, #fffbeb 100%);
          opacity: 0;
          transition: opacity 0.35s;
          border-radius: 16px;
        }
        .wcu-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(26,46,26,0.10);
          border-color: #bde0b5;
        }
        .wcu-card:hover::before { opacity: 1; }

        .wcu-card-inner { position: relative; z-index: 1; }

        .wcu-icon-wrap {
          width: 56px; height: 56px;
          border-radius: 14px;
          background: #f0faf0;
          border: 1px solid #d4edcc;
          display: flex; align-items: center; justify-content: center;
          color: #3d6b3d;
          margin-bottom: 1.25rem;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }
        .wcu-card:hover .wcu-icon-wrap {
          background: #1a2e1a;
          color: #fde68a;
          border-color: #1a2e1a;
        }

        .wcu-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #3d6b3d;
          background: #e8f5e4;
          border-radius: 999px;
          padding: 3px 12px;
          margin-bottom: 10px;
        }

        .wcu-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 600;
          color: #1a2e1a;
          margin-bottom: 8px;
          line-height: 1.2;
        }

        .wcu-desc {
          font-size: 13.5px;
          color: #7a7a70;
          line-height: 1.7;
          font-weight: 300;
        }

        .wcu-stat-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid #f0f0eb;
        }
        .wcu-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 600;
          color: #1a2e1a;
          line-height: 1;
        }
        .wcu-stat-label {
          font-size: 11px;
          color: #a0a096;
          letter-spacing: 0.05em;
          line-height: 1.4;
          font-weight: 400;
        }

        .wcu-corner-accent {
          position: absolute;
          bottom: 0; right: 0;
          width: 64px; height: 64px;
          border-top-left-radius: 64px;
          background: linear-gradient(135deg, #e8f5e4, #fffbeb);
          opacity: 0;
          transition: opacity 0.35s;
        }
        .wcu-card:hover .wcu-corner-accent { opacity: 1; }

        .wcu-number {
          position: absolute;
          top: 1.25rem; right: 1.5rem;
          font-family: 'Cormorant Garamond', serif;
          font-size: 64px;
          font-weight: 600;
          color: rgba(26,46,26,0.04);
          line-height: 1;
          pointer-events: none;
          transition: color 0.35s;
        }
        .wcu-card:hover .wcu-number { color: rgba(26,46,26,0.07); }
      `}</style>

      <section className="wcu-root py-24 bg-[#fafaf7] relative overflow-hidden">

        {/* Background blobs */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">

          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-14">
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-yellow-400" />
              <span className="text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em]">
                Our Promise
              </span>
              <span className="block w-8 h-px bg-yellow-400" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-[#1a2e1a] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Why Choose{" "}
              <span className="text-yellow-500 italic">Rehmat Farms</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm max-w-md font-light leading-relaxed">
              From orchard to your doorstep — every step is handled with care,
              integrity, and a passion for the finest mangoes Pakistan has to offer.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((item, i) => (
              <div key={i} className="wcu-card group">
                <span className="wcu-number">{String(i + 1).padStart(2, "0")}</span>
                <div className="wcu-corner-accent" />
                <div className="wcu-card-inner">
                  <div className="wcu-icon-wrap">{item.icon}</div>
                  <span className="wcu-tag">{item.tag}</span>
                  <h3 className="wcu-title">{item.title}</h3>
                  <p className="wcu-desc">{item.desc}</p>
                  <div className="wcu-stat-row">
                    <span className="wcu-stat-num">{item.stat}</span>
                    <span className="wcu-stat-label">{item.statLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom trust bar */}
          <div className="mt-14 flex flex-wrap justify-center items-center gap-10 py-6 px-8 bg-white border border-[#efefeb] rounded-2xl">
            {[
              { val: "5,000+", lbl: "Happy Customers" },
              { val: "4", lbl: "Mango Varieties" },
              { val: "40+", lbl: "Years of Farming" },
              { val: "98%", lbl: "Satisfaction Rate" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-center">
                <span
                  className="text-3xl font-extrabold text-[#1a2e1a]"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {s.val}
                </span>
                <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                  {s.lbl}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;