import { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext";
import Modal from "../context/ModalsHome";


const Home = () => {

   const { postData, getPosts } = useContext(AppContext)

  const [visiblePosts, setVisiblePosts] = useState([]);
  const [loadingSkeletons, setLoadingSkeletons] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set()); // สำหรับภาพที่โหลดเสร็จแล้ว
  const [nextIndex, setNextIndex] = useState(0);
  const loaderRef = useRef(null);
  const [selectedPost, setSelectedPost] = useState(null); // 👈 เก็บโพสต์ที่ถูกคลิก

  const POSTS_PER_LOAD = 5;

  useEffect(() => {
    loadMorePosts();
    getPosts()
  }, []);

  const loadMorePosts = () => {
    if (loadingSkeletons) return;
    setLoadingSkeletons(true);

    // จำลอง delay โหลดข้อมูล (เช่นรอ API)
    setTimeout(() => {
      const newPosts = postData.slice(nextIndex, nextIndex + POSTS_PER_LOAD);
      setVisiblePosts((prev) => [...prev, ...newPosts]);
      setNextIndex(nextIndex + POSTS_PER_LOAD);
      setLoadingSkeletons(false);
    }, 1000);
  };

  // Intersection Observer สำหรับ Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && nextIndex < postData.length) {
          loadMorePosts();
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [nextIndex, loadingSkeletons]);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set([...prev, id]));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-4 bg-gray-50 overflow-y-auto">
      <div className="w-full max-w-6xl space-y-6 px-4">
        {/* Posts */}
        {visiblePosts.map((item) => (
          <div
            key={item.id}
             onClick={()=> setSelectedPost(item)}
            className="w-full bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg duration-300 hover:cursor-pointer"
          >
            <div className="relative h-56 w-full bg-gray-200">
              {/* Skeleton สำหรับภาพ */}
              {!loadedImages.has(item.id) && (
                <div className="absolute inset-0 animate-pulse bg-gray-200"></div>
              )}

              {/* ภาพกิจกรรม */}
              <img
                src={item.picture || "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg"}
                alt={item.title}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  loadedImages.has(item.id) ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => handleImageLoad(item.id)}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* ชื่อกิจกรรม */}
              <h2 className="absolute bottom-3 left-4 text-white text-lg font-semibold drop-shadow-md">
                {item.title}
              </h2>
            </div>

            <div className="p-5">
              <p className="text-gray-600 line-clamp-3">{item.burb}</p>
            </div>
          </div>
        ))}

        {/* Skeleton Loader ตอนโหลดชุดใหม่ */}
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

        {/* Loader trigger */}
        <div ref={loaderRef} className="h-12 flex justify-center items-center mt-4">
          {nextIndex >= postData.length && (
            <p className="text-gray-400">— หมดรายการแล้ว —</p>
          )}
        </div>
      </div>

           {/* 🔹 Popup Modal */}
           <Modal selectedPost={selectedPost} setSelectedPost={setSelectedPost} />

    </div>
  );
}
export default Home