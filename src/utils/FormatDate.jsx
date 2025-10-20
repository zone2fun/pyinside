
export const formatThaiDate = (dateString) => {
    if (!dateString) return ""

    const date = new Date(dateString)

    // ตัวเลือกสำหรับรูปแบบวันที่แบบไทยเต็ม
    const options = {
      weekday: "long", // วันในสัปดาห์ เช่น "วันอาทิตย์"
      day: "numeric",
      month: "long",
      year: "numeric",
    }

    // ใช้ toLocaleDateString แบบไทย
    const thaiDate = date.toLocaleDateString("th-TH", options)

    // เพิ่ม "พ.ศ." และปรับปีให้ถูกต้อง (toLocaleDateString ทำให้อัตโนมัติ)
    return thaiDate
  }