import { createContext, useEffect, useState } from "react"
import { news, postContent } from "../assets/assets.js"



export const AppContext = createContext()

const AppContextProvider = (props) => {

     const  [ newsData, setNewsData ] = useState([])
     const [ postData, setPostData] = useState([])



     // 🗓️ ฟังก์ชันแปลงวันที่เป็นแบบไทย
  const formatThaiDate = (dateString) => {
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


     const getNews = async ()=>{

         try {

            const data = news

              if(data){
                 setNewsData(data)
              }else{
                 console.log("Not data")
              }

         }catch(error){

             console.log(error)

         }

     }

     const getPosts = async ()=>{

         try{

             const data = await postContent

                if(data){
                     setPostData(data)
                }else{
                     console.log("Data not upload")
                }
      

         }catch(error){

              console.log(error)

         }

     }


     useEffect(()=>{
        getNews(),
        getPosts()
     },[])

     const value = {
        getNews, newsData, setNewsData,
        getPosts, postData, setPostData, formatThaiDate
     }


  return (
    <AppContext.Provider value={value}>
       {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider