import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react"; // ปรับให้ตรงกับไอคอนที่คุณใช้
import { formatThaiDate } from "../utils/FormatDate";

const Modal = ({ selectedPost, setSelectedPost }) => {
  if (!selectedPost) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4"
        onClick={() => setSelectedPost(null)}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 scroll-smooth relative"
          onClick={(e) => e.stopPropagation()}
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
              {selectedPost.headline}
            </h2>
            <p className="text-gray-500">
              <span className="font-semibold">
                {formatThaiDate(selectedPost.postDate)}
              </span>
            </p>

            {/* ❤️ ปุ่ม Like / Share */}
            <div className="flex flex-wrap items-center justify-start gap-3 mt-3">
              {/* Like */}
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

              {/* LINE */}
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
                <span className="text-sm font-medium">Line</span>
              </motion.button>

              {/* Facebook */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    window.location.href
                  )}`;
                  window.open(fbUrl, "_blank");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-sm transition-all"
              >
                <span className="text-sm font-medium">Facebook</span>
              </motion.button>

              {/* TikTok */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => {
                  const tiktokUrl = `https://www.tiktok.com/share?url=${encodeURIComponent(
                    window.location.href
                  )}`;
                  window.open(tiktokUrl, "_blank");
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 shadow-sm transition-all"
              >
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
    </AnimatePresence>
  );
};

export default Modal;
