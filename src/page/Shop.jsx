import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import ModalShop from "../context/ModalShop.jsx";

const Shop = () => {
  const { shops, getShop } = useContext(AppContext);
  const { id } = useParams(); // ถ้ามี id ใน route

  const [visiblePosts, setVisiblePosts] = useState([]);
  const [loadingSkeletons, setLoadingSkeletons] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [nextIndex, setNextIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const loaderRef = useRef(null);
  const POSTS_PER_LOAD = 5;

  // Filter ข้อมูล: ถ้า id มีค่า จะ filter ตาม category หรือ id, ถ้าไม่มี จะเอาทั้งหมด
  const filteredShop = id
    ? shops.filter((item) => item.category === id || item.id === id)
    : shops;

  // โหลดข่าวจาก context
  useEffect(() => {
    getShop();
  }, []);

  // โหลดโพสต์เริ่มต้น หรือเมื่อ newsData / id เปลี่ยน
  useEffect(() => {
    setVisiblePosts([]);
    setNextIndex(0);
    loadMorePosts(true); // true = reset index
  }, [shops, id]);

  const loadMorePosts = (reset = false) => {
    if (loadingSkeletons) return;
    setLoadingSkeletons(true);

    setTimeout(() => {
      const start = reset ? 0 : nextIndex;
      const shopData = filteredShop.slice(start, start + POSTS_PER_LOAD);
      setVisiblePosts((prev) => (reset ? shopData : [...prev, ...shopData]));
      setNextIndex(start + POSTS_PER_LOAD);
      setLoadingSkeletons(false);
    }, 500); // ลดเวลาเล็กน้อย
  };

  // Intersection Observer สำหรับ infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextIndex < filteredShop.length) {
          loadMorePosts();
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [nextIndex, loadingSkeletons, filteredShop]);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set([...prev, id]));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-4 bg-gray-50 overflow-y-auto">
      <div className="w-full max-w-6xl space-y-6 px-4">
        {visiblePosts.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedPost(item)}
            className="w-full bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg duration-300 hover:cursor-pointer"
          >
            <div className="relative h-56 w-full bg-gray-200">
              {!loadedImages.has(item.id) && (
                <div className="absolute inset-0 animate-pulse bg-gray-200"></div>
              )}

              <img
                src={item.picture || "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg"}
                alt={item.name}
                className={`w-full h-full object-cover transition-opacity duration-700 ${loadedImages.has(item.id) ? "opacity-100" : "opacity-0"}`}
                onLoad={() => handleImageLoad(item.id)}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="p-5">
              <p className="text-gray-600 line-clamp-3">{item.name}</p>
            </div>
          </div>
        ))}

        {loadingSkeletons &&
          Array.from({ length: POSTS_PER_LOAD }).map((_, index) => (
            <div key={`skeleton-${index}`} className="w-full bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse">
              <div className="h-56 bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          ))}

        <div ref={loaderRef} className="h-12 flex justify-center items-center mt-4">
          {nextIndex >= filteredShop.length && <p className="text-gray-400">— หมดรายการแล้ว —</p>}
        </div>
      </div>

      <ModalShop selectedPost={selectedPost} setSelectedPost={setSelectedPost} />
    </div>
  );
};

export default Shop;
