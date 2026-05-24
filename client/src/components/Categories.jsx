import { useEffect, useState } from "react";
import API from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("categories.php")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formattedCategories = categories.map((cat) => ({
    ...cat,
    img: cat.image || cat.img || "https://3.imimg.com/data3/TJ/DX/MY-452003/sindhri-mango-500x500.png"
  }));

  const largeCards = formattedCategories.filter((c) => c.size === "large");
  const smallCards = formattedCategories.filter((c) => c.size === "small");

  const useSplitLayout = largeCards.length >= 2 && smallCards.length >= 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&family=DM+Sans:wght@300;400;500&display=swap');

        .cat-root { font-family: 'DM Sans', sans-serif; }

        .cat-card { position: relative; overflow: hidden; cursor: pointer; }
        .cat-card img { transition: transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .cat-card:hover img { transform: scale(1.08); }

        .cat-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,20,10,0.82) 0%, rgba(10,20,10,0.35) 50%, rgba(10,20,10,0.15) 100%);
          transition: background 0.4s;
        }
        .cat-card:hover .cat-overlay {
          background: linear-gradient(to top, rgba(10,20,10,0.88) 0%, rgba(10,20,10,0.45) 55%, rgba(10,20,10,0.2) 100%);
        }

        .cat-content {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: flex-end;
          text-align: center; padding: 2rem 1.5rem;
        }

        .cat-tag {
          display: inline-block;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.22);
          color: #fde68a;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 999px;
          margin-bottom: 10px;
        }

        .cat-name {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          color: #fff;
          line-height: 1.05;
          margin-bottom: 6px;
        }

        .cat-subtitle {
          color: rgba(255,255,255,0.6);
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.05em;
          margin-bottom: 18px;
        }

        .cat-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1a2e1a;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          padding: 10px 26px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          border-radius: 999px;
          transition: background 0.25s, border-color 0.25s, gap 0.25s;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
        }
        .cat-btn:hover {
          background: #eab308;
          border-color: #eab308;
          color: #1a2e1a;
          gap: 12px;
        }
        .cat-btn .arrow {
          display: inline-block;
          transition: transform 0.25s;
        }
        .cat-btn:hover .arrow { transform: translateX(3px); }

        .cat-corner {
          position: absolute; top: 16px; left: 16px;
          width: 28px; height: 28px;
          border-top: 1.5px solid rgba(255,255,255,0.35);
          border-left: 1.5px solid rgba(255,255,255,0.35);
          pointer-events: none;
        }
        .cat-corner-br {
          position: absolute; bottom: 16px; right: 16px;
          width: 28px; height: 28px;
          border-bottom: 1.5px solid rgba(255,255,255,0.35);
          border-right: 1.5px solid rgba(255,255,255,0.35);
          pointer-events: none;
        }
      `}</style>

      <section className="cat-root py-24 bg-[#fafaf7] relative overflow-hidden">

        {/* Background blobs */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-40 pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-16 relative z-10">

          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="block w-8 h-px bg-yellow-400" />
              <span className="text-yellow-500 text-xs font-semibold uppercase tracking-[0.2em]">
                Explore Varieties
              </span>
              <span className="block w-8 h-px bg-yellow-400" />
            </div>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-[#1a2e1a] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Shop By{" "}
              <span className="text-yellow-500 italic">Category</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm max-w-md font-light leading-relaxed">
              Each variety carries its own season, aroma, and story — straight
              from the heart of Pakistan's mango belt.
            </p>
          </motion.div>

          {/* Loading, Empty and Content Transitions */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                <p className="mt-4 text-gray-500 text-sm">Loading categories...</p>
              </motion.div>
            ) : formattedCategories.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="text-6xl mb-4">🥭</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Categories Found</h3>
                <p className="text-gray-400 text-sm">Add mango categories in the Admin Dashboard.</p>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12
                    }
                  }
                }}
              >
                {useSplitLayout ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Column */}
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
                      }}
                      className="cat-card h-[640px] rounded-2xl"
                    >
                      <img
                        src={largeCards[0].img}
                        alt={largeCards[0].name}
                        className="w-full h-full object-cover"
                      />
                      <div className="cat-overlay" />
                      <div className="cat-corner" />
                      <div className="cat-corner-br" />
                      <div className="cat-content">
                        {largeCards[0].tag && <span className="cat-tag">{largeCards[0].tag}</span>}
                        <h2 className="cat-name text-6xl">{largeCards[0].name}</h2>
                        <p className="cat-subtitle">{largeCards[0].subtitle}</p>
                        <button className="cat-btn">
                          Explore <span className="arrow">→</span>
                        </button>
                      </div>
                    </motion.div>

                    {/* Center Column — Stacked */}
                    <div className="flex flex-col gap-4">
                      {smallCards.map((card) => (
                        <motion.div 
                          key={card.id || card.name}
                          variants={{
                            hidden: { opacity: 0, y: 40 },
                            show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
                          }}
                          className="cat-card h-[308px] rounded-2xl"
                        >
                          <img
                            src={card.img}
                            alt={card.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="cat-overlay" />
                          <div className="cat-corner" />
                          <div className="cat-corner-br" />
                          <div className="cat-content">
                            {card.tag && <span className="cat-tag">{card.tag}</span>}
                            <h2 className="cat-name text-4xl">{card.name}</h2>
                            <p className="cat-subtitle">{card.subtitle}</p>
                            <button className="cat-btn">
                              Explore <span className="arrow">→</span>
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Right Column */}
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 40 },
                        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
                      }}
                      className="cat-card h-[640px] rounded-2xl"
                    >
                      <img
                        src={largeCards[1].img}
                        alt={largeCards[1].name}
                        className="w-full h-full object-cover"
                      />
                      <div className="cat-overlay" />
                      <div className="cat-corner" />
                      <div className="cat-corner-br" />
                      <div className="cat-content">
                        {largeCards[1].tag && <span className="cat-tag">{largeCards[1].tag}</span>}
                        <h2 className="cat-name text-6xl">{largeCards[1].name}</h2>
                        <p className="cat-subtitle">{largeCards[1].subtitle}</p>
                        <button className="cat-btn">
                          Explore <span className="arrow">→</span>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formattedCategories.map((card) => (
                      <motion.div 
                        key={card.id || card.name}
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 15 } }
                        }}
                        className="cat-card h-[400px] rounded-2xl relative overflow-hidden"
                      >
                        <img
                          src={card.img}
                          alt={card.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="cat-overlay" />
                        <div className="cat-corner" />
                        <div className="cat-corner-br" />
                        <div className="cat-content">
                          {card.tag && <span className="cat-tag">{card.tag}</span>}
                          <h2 className="cat-name text-4xl">{card.name}</h2>
                          <p className="cat-subtitle">{card.subtitle}</p>
                          <button className="cat-btn">
                            Explore <span className="arrow">→</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Categories;