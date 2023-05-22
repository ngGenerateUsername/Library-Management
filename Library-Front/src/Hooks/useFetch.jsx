
import { useState,useEffect } from "react";
import axios from 'axios';

const useFetch=(url)=>{
    const [data,setData] = useState(null)
    const [ispending,setIspending] = useState(true);
    const [err,setErr] = useState(null);
  

    useEffect(() => {
        const source = axios.CancelToken.source();
        console.log("use effect works")
        
        axios.get(url, { cancelToken: source.token })
          .then(response => {
            setData(response.data);
           
            setIspending(false);
            setErr(null);
          })
          .catch(error => {
            if (axios.isCancel(error)) {
              console.log('Request canceled:', error.message);
            } else {
                setIspending(false);
              setErr(error.message);
            }
          });
        
        return () => {
          source.cancel('Request canceled by cleanup function.');
        };
      }, [url]);
    return {data,ispending,err}
}
export default useFetch