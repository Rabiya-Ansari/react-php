import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [varietiesOpen, setVarietiesOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');

        .nb-root { font-family: 'DM Sans', sans-serif; background: #fff; border-bottom: 1px solid #f0f0ec; }
        .nb-top { background: #1a2e1a; padding: 7px 0; }
        .nb-top-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; justify-content: space-between; align-items: center; }
        .nb-top span { color: #a8c5a0; font-size: 12px; letter-spacing: 0.04em; }
        .nb-top-links { display: flex; gap: 1.5rem; }
        .nb-top-links a { color: #a8c5a0; font-size: 12px; text-decoration: none; transition: color 0.2s; letter-spacing: 0.03em; }
        .nb-top-links a:hover { color: #d4e8cf; }

        .nb-main { max-width: 1200px; margin: 0 auto; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; height: 90px; }

        .nb-nav { display: flex; align-items: center; }
        .nb-nav-item { position: relative; }
        .nb-nav-link { display: flex; align-items: center; gap: 5px; padding: 8px 18px; font-size: 12.5px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: #2a2a2a; text-decoration: none; transition: color 0.25s; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; position: relative; }
        .nb-nav-link:hover, .nb-nav-link.active { color: #3d6b3d; }
        .nb-nav-link .chevron { font-size: 10px; transition: transform 0.25s; margin-top: 1px; }
        .nb-nav-link-underline::after { content: ''; position: absolute; bottom: 0; left: 18px; right: 18px; height: 1.5px; background: #3d6b3d; transform: scaleX(0); transform-origin: center; transition: transform 0.25s ease; }
        .nb-nav-link-underline:hover::after { transform: scaleX(1); }

        .nb-dropdown { position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%) translateY(-6px); background: #fff; border: 1px solid #e8e8e2; border-top: 2px solid #3d6b3d; min-width: 180px; opacity: 0; visibility: hidden; transition: opacity 0.2s, transform 0.2s; z-index: 100; }
        .nb-dropdown.open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
        .nb-dropdown a { display: block; padding: 10px 18px; font-size: 13px; color: #3a3a3a; text-decoration: none; transition: background 0.15s, color 0.15s, padding-left 0.15s; border-bottom: 1px solid #f5f5f0; }
        .nb-dropdown a:last-child { border-bottom: none; }
        .nb-dropdown a:hover { background: #f5faf5; color: #3d6b3d; padding-left: 22px; }

        .nb-logo { display: flex; flex-direction: column; align-items: center; gap: 2px; text-decoration: none; }
        .nb-logo-icon { width: 52px; height: 52px; background: linear-gradient(135deg, #2d5a27 0%, #4a8c42 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .nb-logo-icon::before { content: ''; position: absolute; inset: 3px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.25); }
        .nb-logo-wordmark { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 600; color: #1a2e1a; letter-spacing: 0.06em; white-space: nowrap; }
        .nb-logo-tagline { font-size: 9px; color: #8a9e87; letter-spacing: 0.18em; text-transform: uppercase; margin-top: -2px; }

        .nb-right { display: flex; align-items: center; gap: 4px; }

        .nb-select { position: relative; }
        .nb-select select { appearance: none; background: transparent; border: 1px solid #e8e8e2; padding: 6px 26px 6px 10px; font-size: 12px; color: #3a3a3a; font-family: 'DM Sans', sans-serif; cursor: pointer; border-radius: 4px; transition: border-color 0.2s; outline: none; }
        .nb-select select:hover { border-color: #3d6b3d; }
        .nb-select::after { content: ''; position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid #888; pointer-events: none; }

        .nb-divider { width: 1px; height: 20px; background: #e8e8e2; margin: 0 6px; }

        .nb-icon-btn { position: relative; width: 40px; height: 40px; border: none; background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; border-radius: 6px; transition: background 0.2s, color 0.2s; color: #2a2a2a; }
        .nb-icon-btn:hover { background: #f0f7ee; color: #3d6b3d; }
        .nb-icon-btn svg { width: 19px; height: 19px; stroke-width: 1.8; }
        .nb-badge { position: absolute; top: 5px; right: 5px; width: 17px; height: 17px; background: #3d6b3d; color: #fff; font-size: 10px; font-weight: 600; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; }

        .nb-search-bar { position: absolute; top: 100%; left: 0; right: 0; background: #fff; border-top: 2px solid #3d6b3d; border-bottom: 1px solid #e8e8e2; padding: 18px 2rem; display: flex; gap: 12px; align-items: center; z-index: 200; opacity: 0; visibility: hidden; transform: translateY(-8px); transition: all 0.25s; }
        .nb-search-bar.open { opacity: 1; visibility: visible; transform: translateY(0); }
        .nb-search-bar input { flex: 1; border: 1px solid #e0e0d8; padding: 10px 16px; font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; border-radius: 4px; color: #2a2a2a; }
        .nb-search-bar input::placeholder { color: #aaa; }
        .nb-search-bar input:focus { border-color: #3d6b3d; }
        .nb-search-btn { background: #1a2e1a; color: #fff; border: none; padding: 10px 24px; font-size: 13px; font-family: 'DM Sans', sans-serif; font-weight: 500; cursor: pointer; border-radius: 4px; letter-spacing: 0.05em; transition: background 0.2s; }
        .nb-search-btn:hover { background: #2d5a27; }
      `}</style>

      <div style={{ position: "relative" }}>
        <div className="nb-root">

          {/* Announcement Bar */}
          <div className="nb-top">
            <div className="nb-top-inner">
              <span>🌿 Free shipping on orders over $75</span>
              <div className="nb-top-links">
                <a href="#">Track Order</a>
                <a href="#">Contact</a>
                <a href="#">FAQ</a>
              </div>
            </div>
          </div>

          {/* Main Navbar */}
          <div className="nb-main">

            {/* Left Nav */}
            <nav className="nb-nav" aria-label="Primary navigation">

              <div className="nb-nav-item">
                <Link to="/" className="nb-nav-link nb-nav-link-underline active">
                  Home
                </Link>
              </div>

              <div
                className="nb-nav-item"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button className="nb-nav-link nb-nav-link-underline">
                  Shop
                  <svg
                    className="chevron"
                    style={{ width: 12, height: 12, transition: "transform 0.25s", transform: shopOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={`nb-dropdown ${shopOpen ? "open" : ""}`}>
                  <a href="#">All Products</a>
                  <a href="#">Fresh Mangoes</a>
                  <a href="#">Gift Boxes</a>
                  <a href="#">Bulk Orders</a>
                </div>
              </div>

              <div
                className="nb-nav-item"
                onMouseEnter={() => setVarietiesOpen(true)}
                onMouseLeave={() => setVarietiesOpen(false)}
              >
                <button className="nb-nav-link nb-nav-link-underline">
                  Varieties
                  <svg
                    className="chevron"
                    style={{ width: 12, height: 12, transition: "transform 0.25s", transform: varietiesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={`nb-dropdown ${varietiesOpen ? "open" : ""}`}>
                  <a href="#">Chaunsa</a>
                  <a href="#">Anwar Ratol</a>
                  <a href="#">Sindhri</a>
                  <a href="#">Langra</a>
                </div>
              </div>

              <div className="nb-nav-item">
                <a href="#" className="nb-nav-link nb-nav-link-underline">Blog</a>
              </div>

              <div className="nb-nav-item">
                <Link to="/admin" className="nb-nav-link nb-nav-link-underline">Admin Panel</Link>
              </div>

            </nav>

            {/* Logo */}
            <a href="#" className="nb-logo" aria-label="Rehmat Mangoes home">
              <div className="nb-logo-icon">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 4C10 4 7 7.5 7 11.5C7 17 11 21 14 23C17 21 21 17 21 11.5C21 7.5 18 4 14 4Z" fill="rgba(255,255,255,0.95)" />
                  <path d="M14 4C14 4 16 2 19 3" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M9.5 12C9.5 12 10 15 13 16.5" stroke="rgba(160,220,150,0.8)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="nb-logo-wordmark">Rehmat Mangoes</div>
              <div className="nb-logo-tagline">Farm Fresh · Est. 2026</div>
            </a>

            {/* Right Icons */}
            <div className="nb-right">

              <div className="nb-select">
                <select aria-label="Select language">
                  <option>EN</option>
                  <option>UR</option>
                </select>
              </div>

              <div className="nb-select">
                <select aria-label="Select currency">
                  <option>USD</option>
                  <option>PKR</option>
                  <option>GBP</option>
                </select>
              </div>

              <div className="nb-divider" aria-hidden="true" />

              <button
                className="nb-icon-btn"
                aria-label="Toggle search"
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M17 17l3.5 3.5" />
                </svg>
              </button>

              <button className="nb-icon-btn" aria-label="Account">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </button>

              <button className="nb-icon-btn" aria-label="Wishlist">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 21C12 21 3 14.5 3 8.5a4.5 4.5 0 0 1 9-.3A4.5 4.5 0 0 1 21 8.5C21 14.5 12 21 12 21Z" />
                </svg>
              </button>

              <button className="nb-icon-btn" aria-label="Cart, 0 items">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="nb-badge" aria-hidden="true">0</span>
              </button>

            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`nb-search-bar ${searchOpen ? "open" : ""}`} role="search">
          <input
            type="text"
            placeholder="Search for Chaunsa, Sindhri, gift boxes…"
            aria-label="Search products"
            autoFocus={searchOpen}
          />
          <button className="nb-search-btn">Search</button>
          <button
            className="nb-icon-btn"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
            style={{ color: "#888" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;