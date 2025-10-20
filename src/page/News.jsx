import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2 } from "lucide-react"; // 👈 ต้องติดตั้ง lucide-react

const News = () => {
  const { newsData, getNews, formatThaiDate } = useContext(AppContext);

  const [visiblePosts, setVisiblePosts] = useState([]);
  const [loadingSkeletons, setLoadingSkeletons] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [nextIndex, setNextIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null); // 👈 เก็บโพสต์ที่ถูกคลิก
  const loaderRef = useRef(null);
  const POSTS_PER_LOAD = 5;

  useEffect(() => {
    getNews();
    loadMorePosts();
  }, []);

  const loadMorePosts = () => {
    if (loadingSkeletons) return;
    setLoadingSkeletons(true);

    setTimeout(() => {
      const newPosts = newsData.slice(nextIndex, nextIndex + POSTS_PER_LOAD);
      setVisiblePosts((prev) => [...prev, ...newPosts]);
      setNextIndex((prev) => prev + POSTS_PER_LOAD);
      setLoadingSkeletons(false);
    }, 800);
  };

  // Intersection Observer สำหรับโหลดเพิ่ม
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextIndex < newsData.length) {
          loadMorePosts();
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [nextIndex, loadingSkeletons, newsData]);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set([...prev, id]));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-4 bg-gray-50 overflow-y-auto">
      <div className="w-full max-w-6xl space-y-6 px-4">
        {/* Posts */}
        {visiblePosts.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedPost(item)} // 👈 เมื่อคลิก เปิด Popup
            className="w-full bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg duration-300 hover:cursor-pointer"
          >
            <div className="relative h-56 w-full bg-gray-200">
              {!loadedImages.has(item.id) && (
                <div className="absolute inset-0 animate-pulse bg-gray-200"></div>
              )}

              <img
                src={
                  item.picUrl ||
                  "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg"
                }
                alt={item.headline}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  loadedImages.has(item.id) ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(item.id)}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              {/* <h2 className="absolute bottom-3 left-4 text-white text-lg font-semibold drop-shadow-md">
                {item.headline || "ไม่มีชื่อเรื่อง"}
              </h2> */}
            </div>

            <div className="p-5">
              <p className="text-gray-600 line-clamp-3">{item.headline}</p>
            </div>
          </div>
        ))}

        {/* Skeleton Loader */}
        {loadingSkeletons &&
          Array.from({ length: POSTS_PER_LOAD }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="w-full bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse"
            >
              <div className="h-56 bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}

        <div ref={loaderRef} className="h-12 flex justify-center items-center mt-4">
          {nextIndex >= newsData.length && (
            <p className="text-gray-400">— หมดรายการแล้ว —</p>
          )}
        </div>
      </div>

      {/* 🔹 Popup Modal */}
      <AnimatePresence>
  {selectedPost && (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4"
      onClick={() => setSelectedPost(null)} // ปิดเมื่อคลิกพื้นหลัง
    >
      <motion.div
        key="modal"
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden relative"
        onClick={(e) => e.stopPropagation()} // กันคลิกทะลุ
      >
        {/* ปุ่มปิด */}
        <button
          onClick={() => setSelectedPost(null)}
          className="absolute top-3 right-3 bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black"
        >
          ✕
        </button>

        {/* ภาพ */}
        <img
          src={
            selectedPost.picUrl ||
            "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg"
          }
          alt={selectedPost.headline}
          className="w-full h-64 object-cover"
        />

        <div className="p-6 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            {selectedPost.title}
          </h2>
          <p className="text-gray-500">
           <span className="font-semibold">
              {formatThaiDate(selectedPost.postDate)}
            </span>
          </p>

          
           {/* ❤️ ปุ่ม Like / Share */}
<div className="flex flex-wrap items-center justify-start gap-3 mt-3">
  {/* ปุ่ม Like */}
  <motion.button
    whileTap={{ scale: 0.85 }}
    whileHover={{ scale: 1.1 }}
    onClick={() =>
      setSelectedPost({
        ...selectedPost,
        liked: !selectedPost.liked,
      })
    }
    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all shadow-sm ${
      selectedPost.liked
        ? "bg-pink-100 text-pink-600"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    }`}
  >
    <Heart
      size={20}
      className={`${
        selectedPost.liked ? "fill-pink-500 text-pink-500" : ""
      }`}
    />
    <span className="text-sm font-medium">
      {selectedPost.liked ? "ถูกใจแล้ว" : "ถูกใจ"}
    </span>
  </motion.button>

  {/* ปุ่มแชร์ LINE */}
  <motion.button
    whileTap={{ scale: 0.85 }}
    whileHover={{ scale: 1.1 }}
    onClick={() => {
      const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(
        `${selectedPost.title}\n${window.location.href}`
      )}`;
      window.open(lineUrl, "_blank");
    }}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 shadow-sm transition-all"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
      <path d="M19.616 4.369C17.936 2.693 15.315 2 12.037 2 5.825 2 2 6.04 2 10.021c0 2.493 1.203 4.734 3.202 6.214V20l3.116-1.7c1.13.315 2.395.49 3.719.49 6.212 0 10.037-4.04 10.037-8.021 0-2.004-.742-3.789-2.458-5.4z"/>
    </svg>
    <span className="text-sm font-medium">Line</span>
  </motion.button>

  {/* ปุ่มแชร์ FACEBOOK */}
  <motion.button
    whileTap={{ scale: 0.85 }}
    whileHover={{ scale: 1.1 }}
    onClick={() => {
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
      window.open(fbUrl, "_blank");
    }}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-sm transition-all"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20">
      <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.128 8.438 9.877v-6.987H8.077v-2.89h2.36V9.797c0-2.33 1.393-3.616 3.523-3.616 1.021 0 2.09.183 2.09.183v2.3h-1.177c-1.162 0-1.525.723-1.525 1.463v1.756h2.594l-.414 2.89h-2.18v6.987C18.343 21.128 22 17 22 12z"/>
    </svg>
    <span className="text-sm font-medium">Facebook</span>
  </motion.button>

  {/* ปุ่มแชร์ TIKTOK */}
  <motion.button
    whileTap={{ scale: 0.85 }}
    whileHover={{ scale: 1.1 }}
    onClick={() => {
      const tiktokUrl = `https://www.tiktok.com/share?url=${encodeURIComponent(window.location.href)}`;
      window.open(tiktokUrl, "_blank");
    }}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 shadow-sm transition-all"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor" width="20" height="20">
      <path d="M35.5 12.6c-1.5-.8-2.8-2-3.8-3.5-.7-1.1-1.1-2.3-1.3-3.6H25v27.2c0 1.7-1.4 3.1-3.1 3.1S18.8 34.4 18.8 32.7c0-1.6 1.3-3 2.9-3.1v-5.2c-4.8.2-8.6 4.1-8.6 9 0 5 4 9 9 9s9-4 9-9V19.6c2.3 1.6 5.1 2.5 8 2.6v-5.3c-1.1 0-2.2-.3-3.2-.7z"/>
    </svg>
    <span className="text-sm font-medium">TikTok</span>
  </motion.button>
</div>

          {/* รายละเอียด */}
          <p className="text-gray-700 leading-relaxed mt-4">
            {selectedPost.detail || "ไม่มีรายละเอียดสำหรับข่าวนี้"}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default News;
