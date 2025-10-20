import { createContext, useEffect, useState } from "react"
import { news, postContent } from "../assets/assets.js"



export const AppContext = createContext()

const AppContextProvider = (props) => {

     const  [ newsData, setNewsData ] = useState([])
     const [ postData, setPostData] = useState([])



 
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
        getPosts, postData, setPostData
     }


  return (
    <AppContext.Provider value={value}>
       {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider