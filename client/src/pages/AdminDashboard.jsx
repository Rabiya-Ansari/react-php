import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaFolder, 
  FaPlus, 
  FaTrash, 
  FaArrowLeft, 
  FaDatabase, 
  FaBoxOpen, 
  FaSearch, 
  FaTimes, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaFileAlt
} from "react-icons/fa";
import API from "../services/api";

const AdminDashboard = () => {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState("overview");

  // Data State
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProds, setLoadingProds] = useState(true);
  const [dbStatus, setDbStatus] = useState("checking");
  const [dbError, setDbError] = useState("");

  // Search Filters
  const [catSearch, setCatSearch] = useState("");
  const [prodSearch, setProdSearch] = useState("");

  // Modals & Popups
  const [showCatModal, setShowCatModal] = useState(false);
  const [showProdModal, setShowProdModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'category'|'product', id, name }
  const [notification, setNotification] = useState(null); // { type: 'success'|'error', message }

  // Form States
  const [catForm, setCatForm] = useState({
    name: "",
    subtitle: "",
    tag: "",
    image: "",
    size: "small"
  });

  const [prodForm, setProdForm] = useState({
    name: "",
    price: "",
    description: "",
    image: ""
  });

  const [submitting, setSubmitting] = useState(false);

  // Fetch Logic
  const fetchCategories = async () => {
    setLoadingCats(true);
    try {
      const res = await API.get("categories.php");
      setCategories(res.data || []);
      setDbStatus("online");
    } catch (err) {
      console.error(err);
      setDbStatus("offline");
      setDbError(err.message || "Failed to reach categories API");
    } finally {
      setLoadingCats(false);
    }
  };

  const fetchProducts = async () => {
    setLoadingProds(true);
    try {
      const res = await API.get("products.php");
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      setDbStatus("offline");
      setDbError(err.message || "Failed to reach products API");
    } finally {
      setLoadingProds(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // Notifications helper
  const triggerNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // Form Submit: Category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!catForm.name.trim()) {
      triggerNotification("error", "Category name is required");
      return;
    }
    if (!catForm.image.trim()) {
      triggerNotification("error", "Category image is required");
      return;
    }

    // Validate category image URL / path / Google image address
    const imgUrl = catForm.image.trim();
    const isHttp = /^https?:\/\//i.test(imgUrl);
    const isDataUrl = /^data:image\/(jpeg|png|gif|webp|svg\+xml);base64,/i.test(imgUrl);
    const isLocalPath = /^\/?(assets|images|public)\//i.test(imgUrl) || /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(imgUrl);

    if (!isHttp && !isDataUrl && !isLocalPath) {
      triggerNotification("error", "Invalid image format. Must be a valid web URL, relative path, or Google image address.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await API.post("categories.php", { ...catForm, image: imgUrl });
      if (res.data.status === "success") {
        triggerNotification("success", "Category added successfully!");
        setCatForm({ name: "", subtitle: "", tag: "", image: "", size: "small" });
        setShowCatModal(false);
        fetchCategories();
      } else {
        triggerNotification("error", res.data.message || "Failed to add category");
      }
    } catch (err) {
      console.error(err);
      triggerNotification("error", err.response?.data?.message || "Failed to connect to backend");
    } finally {
      setSubmitting(false);
    }
  };

  // Form Submit: Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!prodForm.name.trim() || !prodForm.price.trim()) {
      triggerNotification("error", "Product name and price are required");
      return;
    }
    setSubmitting(true);
    try {
      const res = await API.post("products.php", prodForm);
      if (res.data.status === "success") {
        triggerNotification("success", "Product added successfully!");
        setProdForm({ name: "", price: "", description: "", image: "" });
        setShowProdModal(false);
        fetchProducts();
      } else {
        triggerNotification("error", res.data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      triggerNotification("error", err.response?.data?.message || "Failed to connect to backend");
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Item Delete
  const executeDelete = async () => {
    if (!deleteConfirm) return;
    const { type, id } = deleteConfirm;
    try {
      const apiFile = type === "category" ? "categories.php" : "products.php";
      const res = await API.delete(`${apiFile}?id=${id}`);
      if (res.data.status === "success") {
        triggerNotification("success", `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
        if (type === "category") fetchCategories();
        else fetchProducts();
      } else {
        triggerNotification("error", res.data.message || `Failed to delete ${type}`);
      }
    } catch (err) {
      console.error(err);
      triggerNotification("error", `Failed to delete ${type}: Server connection error`);
    } finally {
      setDeleteConfirm(null);
    }
  };

  // Filters
  const filteredCategories = categories.filter((c) =>
    c.name?.toLowerCase().includes(catSearch.toLowerCase()) ||
    c.subtitle?.toLowerCase().includes(catSearch.toLowerCase()) ||
    c.tag?.toLowerCase().includes(catSearch.toLowerCase())
  );

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(prodSearch.toLowerCase()) ||
    p.description?.toLowerCase().includes(prodSearch.toLowerCase())
  );

  // Statistics
  const totalCategories = categories.length;
  const totalProducts = products.length;
  const largeCategoriesCount = categories.filter(c => c.size === "large").length;
  const smallCategoriesCount = categories.filter(c => c.size === "small").length;

  return (
    <div className="min-h-screen bg-[#fafaf7] text-gray-800 font-sans flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1a2e1a] text-white flex flex-col justify-between shrink-0 p-6 z-20">
        <div>
          {/* Admin Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-8">
            <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-[#1a2e1a] font-bold text-lg">
              RM
            </div>
            <div>
              <h1 className="font-semibold text-sm leading-tight tracking-wider">REHMAT FARMS</h1>
              <span className="text-[10px] text-yellow-300 font-medium tracking-[0.2em] uppercase">Admin Panel</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all ${
                activeTab === "overview"
                  ? "bg-yellow-400 text-[#1a2e1a] shadow-lg shadow-yellow-400/10 font-semibold"
                  : "hover:bg-white/5 text-gray-300 hover:text-white"
              }`}
            >
              <FaDatabase className="w-4 h-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all ${
                activeTab === "categories"
                  ? "bg-yellow-400 text-[#1a2e1a] shadow-lg shadow-yellow-400/10 font-semibold"
                  : "hover:bg-white/5 text-gray-300 hover:text-white"
              }`}
            >
              <FaFolder className="w-4 h-4" />
              Manage Categories
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all ${
                activeTab === "products"
                  ? "bg-yellow-400 text-[#1a2e1a] shadow-lg shadow-yellow-400/10 font-semibold"
                  : "hover:bg-white/5 text-gray-300 hover:text-white"
              }`}
            >
              <FaBoxOpen className="w-4 h-4" />
              Manage Products
            </button>
          </nav>
        </div>

        {/* Back to Site Button */}
        <div className="pt-6 border-t border-white/10 mt-8">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 hover:border-white/55 rounded-xl text-xs font-semibold uppercase tracking-widest text-white transition-all bg-white/5 hover:bg-white/10"
          >
            <FaArrowLeft className="w-3 h-3" />
            View Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1a2e1a] capitalize tracking-tight">
              {activeTab === "overview" ? "Dashboard Overview" : `Manage ${activeTab}`}
            </h2>
            <p className="text-gray-400 text-xs mt-1">
              {activeTab === "overview" && "System health, catalog quick counts, and statistics."}
              {activeTab === "categories" && "Add, review, and delete mango varieties."}
              {activeTab === "products" && "Add, update, and manage inventory products."}
            </p>
          </div>

          {/* Database Health Badge */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100">
            <span className={`relative flex h-3.5 w-3.5`}>
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                dbStatus === "online" ? "bg-emerald-400" : dbStatus === "offline" ? "bg-rose-400" : "bg-amber-400"
              }`}></span>
              <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${
                dbStatus === "online" ? "bg-emerald-500" : dbStatus === "offline" ? "bg-rose-500" : "bg-amber-500"
              }`}></span>
            </span>
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              DB: {dbStatus}
            </span>
          </div>
        </header>

        {/* Global Notification Banner */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-xl text-white ${
                notification.type === "success" ? "bg-emerald-600" : "bg-rose-600"
              }`}
            >
              {notification.type === "success" ? (
                <FaCheckCircle className="w-5 h-5" />
              ) : (
                <FaExclamationTriangle className="w-5 h-5" />
              )}
              <span className="text-sm font-semibold tracking-wide">{notification.message}</span>
              <button 
                onClick={() => setNotification(null)} 
                className="ml-4 hover:opacity-80 transition"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Tab Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  
                  {/* Card 1: Total Categories */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-1">Categories</span>
                      <h3 className="text-3xl font-extrabold text-[#1a2e1a]">
                        {loadingCats ? "..." : totalCategories}
                      </h3>
                      <span className="text-[10px] text-gray-400 mt-2 block">
                        {largeCategoriesCount} Large / {smallCategoriesCount} Small
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-600 flex items-center justify-center">
                      <FaFolder className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card 2: Total Products */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-1">Products</span>
                      <h3 className="text-3xl font-extrabold text-[#1a2e1a]">
                        {loadingProds ? "..." : totalProducts}
                      </h3>
                      <span className="text-[10px] text-gray-400 mt-2 block">Available items in store</span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center">
                      <FaBoxOpen className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Card 3: DB Status */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between col-span-1 sm:col-span-2 lg:col-span-2">
                    <div className="flex-1 min-w-0 pr-4">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-1">Connection Details</span>
                      <h3 className="text-base font-bold text-gray-700 truncate">
                        {dbStatus === "online" ? "localhost: rehmat_mangoes" : "Offline / Connecting"}
                      </h3>
                      <p className="text-[10px] text-gray-400 truncate mt-1">
                        {dbStatus === "online" ? "Fully integrated with XAMPP MySQL server." : dbError || "Database offline."}
                      </p>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                      dbStatus === "online" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    }`}>
                      <FaDatabase className="w-6 h-6" />
                    </div>
                  </div>

                </div>

                {/* DB Health Alert if Offline */}
                {dbStatus === "offline" && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-3xl p-6 flex items-start gap-4 shadow-sm">
                    <FaExclamationTriangle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-base">Backend Connection Failed</h4>
                      <p className="text-sm text-rose-700/95 mt-1 leading-relaxed">
                        We could not query the MySQL database. Please make sure XAMPP Control Panel is running and MySQL module is started. 
                        Error details: <code className="bg-rose-100 px-1.5 py-0.5 rounded text-xs text-rose-900">{dbError}</code>
                      </p>
                    </div>
                  </div>
                )}

                {/* Shortcut & Quick Actions */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-bold text-[#1a2e1a] mb-6">Quick Catalog Shortcuts</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setShowCatModal(true)}
                      className="group flex items-center gap-4 p-5 rounded-2xl bg-yellow-50/50 hover:bg-yellow-50 border border-yellow-100 hover:border-yellow-200 transition-all text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-yellow-400 text-[#1a2e1a] flex items-center justify-center transition-transform group-hover:scale-105">
                        <FaPlus className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1a2e1a]">Add Mango Category</h4>
                        <p className="text-xs text-gray-400 mt-0.5">Insert new mango types (Sindhri, Anwar Ratol...)</p>
                      </div>
                    </button>

                    <button
                      onClick={() => setShowProdModal(true)}
                      className="group flex items-center gap-4 p-5 rounded-2xl bg-green-50/50 hover:bg-green-50 border border-green-100 hover:border-green-200 transition-all text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#1a2e1a] text-white flex items-center justify-center transition-transform group-hover:scale-105">
                        <FaPlus className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1a2e1a]">Add Mango Product</h4>
                        <p className="text-xs text-gray-400 mt-0.5">List boxed or single varieties with custom pricing.</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Dashboard Recent Activity lists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Categories Preview */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-[#1a2e1a]">Recent Categories</h3>
                      <button onClick={() => setActiveTab("categories")} className="text-xs font-semibold text-yellow-600 hover:underline">
                        View All
                      </button>
                    </div>
                    {loadingCats ? (
                      <div className="space-y-4">
                        {[1, 2].map(i => (
                          <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                      </div>
                    ) : categories.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-6">No categories found.</p>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {categories.slice(0, 3).map((cat) => (
                          <div key={cat.id} className="flex items-center gap-4 py-3">
                            <img
                              src={cat.image || cat.img || "https://3.imimg.com/data3/TJ/DX/MY-452003/sindhri-mango-500x500.png"}
                              alt={cat.name}
                              className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-gray-800 truncate">{cat.name}</h4>
                              <p className="text-xs text-gray-400 truncate mt-0.5">{cat.subtitle}</p>
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 bg-yellow-50 text-yellow-600 rounded-full border border-yellow-100">
                              {cat.size}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Recent Products Preview */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-[#1a2e1a]">Recent Products</h3>
                      <button onClick={() => setActiveTab("products")} className="text-xs font-semibold text-yellow-600 hover:underline">
                        View All
                      </button>
                    </div>
                    {loadingProds ? (
                      <div className="space-y-4">
                        {[1, 2].map(i => (
                          <div key={i} className="h-12 bg-gray-100 rounded-xl animate-pulse" />
                        ))}
                      </div>
                    ) : products.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-6">No products found.</p>
                    ) : (
                      <div className="divide-y divide-gray-100">
                        {products.slice(0, 3).map((prod) => (
                          <div key={prod.id} className="flex items-center gap-4 py-3">
                            <img
                              src={prod.image || "https://3.imimg.com/data3/TJ/DX/MY-452003/sindhri-mango-500x500.png"}
                              alt={prod.name}
                              className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-gray-800 truncate">{prod.name}</h4>
                              <p className="text-xs text-gray-400 truncate mt-0.5">{prod.price}</p>
                            </div>
                            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 shrink-0">
                              In Stock
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* TAB: CATEGORIES */}
            {activeTab === "categories" && (
              <div className="space-y-6">
                
                {/* Search and Action Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                  <div className="relative flex-1 max-w-md">
                    <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                      <FaSearch className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={catSearch}
                      onChange={(e) => setCatSearch(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-yellow-400/50 text-sm placeholder-gray-400 outline-none transition"
                    />
                  </div>
                  <button
                    onClick={() => setShowCatModal(true)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-[#1a2e1a] font-bold text-sm tracking-wide rounded-2xl transition shadow-md shadow-yellow-400/10"
                  >
                    <FaPlus className="w-3.5 h-3.5" />
                    Add Category
                  </button>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/75 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <th className="px-6 py-4 text-center w-16">ID</th>
                          <th className="px-6 py-4 w-20">Preview</th>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Subtitle</th>
                          <th className="px-6 py-4">Badge/Tag</th>
                          <th className="px-6 py-4 w-28">Layout Size</th>
                          <th className="px-6 py-4 text-right w-24">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {loadingCats ? (
                          <tr>
                            <td colSpan="7" className="text-center py-20">
                              <div className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
                              <span className="text-xs text-gray-400 mt-3 block">Fetching categories...</span>
                            </td>
                          </tr>
                        ) : filteredCategories.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center py-16 text-gray-400">
                              <div className="text-4xl mb-3">📭</div>
                              <p className="font-semibold text-sm text-gray-600">No categories match your search</p>
                              <p className="text-xs text-gray-400 mt-1">Try clear the filter or add a new category.</p>
                            </td>
                          </tr>
                        ) : (
                          filteredCategories.map((cat) => (
                            <tr key={cat.id} className="hover:bg-gray-50/40 transition">
                              <td className="px-6 py-4.5 text-center font-bold text-gray-400">{cat.id}</td>
                              <td className="px-6 py-4.5">
                                <img
                                  src={cat.image || cat.img || "https://3.imimg.com/data3/TJ/DX/MY-452003/sindhri-mango-500x500.png"}
                                  alt={cat.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm"
                                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400"; }}
                                />
                              </td>
                              <td className="px-6 py-4.5 font-bold text-gray-800">{cat.name}</td>
                              <td className="px-6 py-4.5 text-gray-500 max-w-xs truncate">{cat.subtitle || "-"}</td>
                              <td className="px-6 py-4.5">
                                {cat.tag ? (
                                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-yellow-50 text-yellow-600 rounded-full border border-yellow-100">
                                    {cat.tag}
                                  </span>
                                ) : (
                                  <span className="text-xs text-gray-300">None</span>
                                )}
                              </td>
                              <td className="px-6 py-4.5">
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg border ${
                                  cat.size === "large" 
                                    ? "bg-purple-50 text-purple-700 border-purple-100" 
                                    : "bg-blue-50 text-blue-700 border-blue-100"
                                }`}>
                                  {cat.size || "small"}
                                </span>
                              </td>
                              <td className="px-6 py-4.5 text-right">
                                <button
                                  onClick={() => setDeleteConfirm({ type: "category", id: cat.id, name: cat.name })}
                                  className="p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition"
                                  title="Delete Category"
                                >
                                  <FaTrash className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: PRODUCTS */}
            {activeTab === "products" && (
              <div className="space-y-6">
                
                {/* Search and Action Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                  <div className="relative flex-1 max-w-md">
                    <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                      <FaSearch className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={prodSearch}
                      onChange={(e) => setProdSearch(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-gray-50 border-0 focus:ring-2 focus:ring-yellow-400/50 text-sm placeholder-gray-400 outline-none transition"
                    />
                  </div>
                  <button
                    onClick={() => setShowProdModal(true)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1a2e1a] hover:bg-[#254225] text-white font-bold text-sm tracking-wide rounded-2xl transition shadow-md shadow-[#1a2e1a]/10"
                  >
                    <FaPlus className="w-3.5 h-3.5" />
                    Add Product
                  </button>
                </div>

                {/* Table Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/75 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-widest">
                          <th className="px-6 py-4 text-center w-16">ID</th>
                          <th className="px-6 py-4 w-20">Preview</th>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4 w-32">Price</th>
                          <th className="px-6 py-4">Description</th>
                          <th className="px-6 py-4 text-right w-24">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 text-sm">
                        {loadingProds ? (
                          <tr>
                            <td colSpan="6" className="text-center py-20">
                              <div className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
                              <span className="text-xs text-gray-400 mt-3 block">Fetching products...</span>
                            </td>
                          </tr>
                        ) : filteredProducts.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-16 text-gray-400">
                              <div className="text-4xl mb-3">📭</div>
                              <p className="font-semibold text-sm text-gray-600">No products match your search</p>
                              <p className="text-xs text-gray-400 mt-1">Try clear the filter or add a new product.</p>
                            </td>
                          </tr>
                        ) : (
                          filteredProducts.map((prod) => (
                            <tr key={prod.id} className="hover:bg-gray-50/40 transition">
                              <td className="px-6 py-4.5 text-center font-bold text-gray-400">{prod.id}</td>
                              <td className="px-6 py-4.5">
                                <img
                                  src={prod.image || "https://3.imimg.com/data3/TJ/DX/MY-452003/sindhri-mango-500x500.png"}
                                  alt={prod.name}
                                  className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm"
                                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400"; }}
                                />
                              </td>
                              <td className="px-6 py-4.5 font-bold text-gray-800">{prod.name}</td>
                              <td className="px-6 py-4.5 text-emerald-700 font-bold">{prod.price}</td>
                              <td className="px-6 py-4.5 text-gray-500 max-w-sm truncate">{prod.description || "-"}</td>
                              <td className="px-6 py-4.5 text-right">
                                <button
                                  onClick={() => setDeleteConfirm({ type: "product", id: prod.id, name: prod.name })}
                                  className="p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition"
                                  title="Delete Product"
                                >
                                  <FaTrash className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* MODAL: ADD CATEGORY */}
      <AnimatePresence>
        {showCatModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCatModal(false)}
              className="absolute inset-0 bg-[#1a2e1a]/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#1a2e1a] text-white px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg leading-tight">Add Mango Category</h3>
                  <p className="text-white/60 text-xs mt-0.5">Register a new variety of Pakistani Mangoes.</p>
                </div>
                <button
                  onClick={() => setShowCatModal(false)}
                  className="p-1.5 hover:bg-white/10 rounded-xl transition text-white/80 hover:text-white"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleAddCategory} className="p-6 space-y-4">
                
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Variety Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sindhri, Anwar Ratol"
                    value={catForm.name}
                    onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200/80 focus:border-yellow-400 focus:bg-white text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Subtitle Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The King of Mangoes, Rich & aromatic"
                    value={catForm.subtitle}
                    onChange={(e) => setCatForm({ ...catForm, subtitle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200/80 focus:border-yellow-400 focus:bg-white text-sm outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Tag / Badge
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Premium, Farm Fresh"
                      value={catForm.tag}
                      onChange={(e) => setCatForm({ ...catForm, tag: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200/80 focus:border-yellow-400 focus:bg-white text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Grid Layout Size
                    </label>
                    <select
                      value={catForm.size}
                      onChange={(e) => setCatForm({ ...catForm, size: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200/80 focus:border-yellow-400 focus:bg-white text-sm outline-none transition"
                    >
                      <option value="small">Small Card (Standard)</option>
                      <option value="large">Large Card (Wide/Hero)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Image URL / Path <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. https://domain.com/mango.png or assets/sindhri.png"
                    value={catForm.image}
                    onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200/80 focus:border-yellow-400 focus:bg-white text-sm outline-none transition"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Specify a web URL link, relative path, or Google image address (required).</span>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCatModal(false)}
                    className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-[#1a2e1a] font-bold text-xs uppercase tracking-wider rounded-xl transition disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : "Save Category"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD PRODUCT */}
      <AnimatePresence>
        {showProdModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProdModal(false)}
              className="absolute inset-0 bg-[#1a2e1a]/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#1a2e1a] text-white px-6 py-5 flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg leading-tight">Add Mango Product</h3>
                  <p className="text-white/60 text-xs mt-0.5">Register a new product box/item for shop inventory.</p>
                </div>
                <button
                  onClick={() => setShowProdModal(false)}
                  className="p-1.5 hover:bg-white/10 rounded-xl transition text-white/80 hover:text-white"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Product Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sindhri Premium Box"
                      value={prodForm.name}
                      onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200/80 focus:border-yellow-400 focus:bg-white text-sm outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Price <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. $25.00"
                      value={prodForm.price}
                      onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200/80 focus:border-yellow-400 focus:bg-white text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Provide a detailed description of the box size, quality, and origin orchards..."
                    rows="3"
                    value={prodForm.description}
                    onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200/80 focus:border-yellow-400 focus:bg-white text-sm outline-none transition resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://domain.com/mango-box.jpg"
                    value={prodForm.image}
                    onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200/80 focus:border-yellow-400 focus:bg-white text-sm outline-none transition"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Specify an online URL link to the product photo.</span>
                </div>

                {/* Footer Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-100 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowProdModal(false)}
                    className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-500 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 bg-[#1a2e1a] hover:bg-[#244124] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : "Save Product"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPUP: DELETE CONFIRMATION */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirm(null)}
              className="absolute inset-0 bg-[#1a2e1a]/40 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-gray-100 overflow-hidden p-6 text-center"
            >
              <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExclamationTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-[#1a2e1a] text-lg leading-tight">Confirm Deletion</h3>
              <p className="text-gray-400 text-xs mt-2 leading-relaxed">
                Are you sure you want to delete <span className="font-bold text-gray-700">"{deleteConfirm.name}"</span>? 
                This action is permanent and cannot be undone.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-center mt-6">
                <button
                  type="button"
                  onClick={() => setDeleteConfirm(null)}
                  className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold uppercase tracking-wider text-gray-500 transition"
                >
                  No, Cancel
                </button>
                <button
                  type="button"
                  onClick={executeDelete}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
