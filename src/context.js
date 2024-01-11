import React, {useContext, useEffect, useState} from "react";

export const API_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext =React.createContext();

const AppProvider = ({children}) => {
    const [isLoading, setIsLoading]=useState(true); // isloading =true;
    const [movie, setMovie] = useState([]);
    const arr= useState({show: "false",msg: ""});// [var, functon]
    const [isError, setIsError] =arr;
    const [query, setQuery]=useState("avengers"); // iserror={show:"false", msg:""}

    const getMovies = async (url) =>{
        try{
            const res=await fetch(url);
            // console.log(res);
            const data = await res.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);// isloading=false;
                setMovie(data.Search);
            }
            else{
                setIsError({
                    show: true,
                    msg: data.error,
                });
            }
        } catch(error){
            console.log(error);
        }
    };
    
    useEffect(()=>{
        let timerOut=setTimeout(()=>{
            getMovies(`${API_URL}&s=${query}`);
        },800)
        return()=> clearTimeout(timerOut);
    },[query]);

    return <AppContext.Provider value={{isLoading, isError, movie,query, setQuery}}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext};