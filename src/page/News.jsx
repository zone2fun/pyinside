import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext.jsx";
import Modal from "../context/Modals.jsx";

const News = () => {
  const { newsData, getNews } = useContext(AppContext);

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
           <Modal selectedPost={selectedPost} setSelectedPost={setSelectedPost} />

    </div>
  );
};

export default News;
