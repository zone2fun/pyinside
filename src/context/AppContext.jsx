import { createContext, useEffect, useState } from "react"
import { news, postContent, news_category, hotNewsList, travel, travel_category } from "../assets/assets.js"



export const AppContext = createContext()

const AppContextProvider = (props) => {

     const  [ newsData, setNewsData ] = useState([])
     const [ postData, setPostData] = useState([])
      const [ newsCategory, setNewsCategory ] = useState([])
      const [ travelCategory, setTravelCategory ] = useState([])
      const [ hotNews, setHotNews ] = useState([])
      const [ travels, setTravels ] = useState([])


      const getTravels = async ()=>{

           try{

              const data = travel
                if(data){
                  setTravels(data)
                }

           }catch(error){

               console.log(error)


           }

      }

      const getTravelCategory = async ()=>{


          try{

              const data = travel_category
               if(data){
                  setTravelCategory(data)
               }

          }catch(error){
            console.log(error)
          }

      }


      const getHotNews = async ()=>{

         try{

            const data  = hotNewsList

              if(data){
               setHotNews(data)
              }else{
                console.log("Can not get Hotnews Data")
              }

         }catch(error){

             console.log(error)

         }

          

      }


      const getNewsCategory = async ()=>{

         try{

             const data = news_category
               if(data){
                   setNewsCategory(data)
               }else{
                  console.log("Can not get news category")
               }


         }catch(error){
            console.log(error)
         }

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
        getPosts(),
        getHotNews(),
        getTravels(),
        getTravelCategory()
     },[])

     const value = {
        getNews, newsData, setNewsData,
        getPosts, postData, setPostData,
        getNewsCategory, newsCategory, setNewsCategory,
        getHotNews, hotNews, setHotNews,
        getTravels, travels, setTravels,
        getTravelCategory, travelCategory, setTravelCategory
     }


  return (
    <AppContext.Provider value={value}>
       {props.children}
    </AppContext.Provider>
  )
}
export default AppContextProvider