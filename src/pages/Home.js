import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import axios from 'axios';

function Home() {

  const [getResult, setGetResult] = useState([])
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    fetchdata()
  },[])

  const fetchdata = async () => {
    let getData = await axios.get("https://rickandmortyapi.com/api/character")
    setGetResult(getData?.data?.results)
  }

  const onSearch = async (e) => {
    setInputVal(e.target.value)
    let val = e.target.value
    let searchArr = []
    let getSearchData = await axios.get("https://rickandmortyapi.com/api/character")
    getSearchData?.data?.results?.map((item) => {
      
      if(item.name.toLowerCase().includes(val.toLowerCase()) || item.gender.toLowerCase().includes(val.toLowerCase()) || item.status.toLowerCase().includes(val.toLowerCase()) || item.species.toLowerCase().includes(val.toLowerCase())){
        searchArr.push(item)
      }
    })
    setGetResult(searchArr)
    if(val === ""){
      fetchdata()
    }
  }

  return (
    <>
      <div className="home_main">
        <div className="inp">
        <input placeholder="Search" onChange={(e) => onSearch(e)} />
        </div>
        
      <div className="home">
        {
          getResult && getResult != undefined && getResult.length > 0 ?
          getResult?.map((item, index) => {
            return (
              <Card key={index} data={item && item != undefined ? item : ""} />
            )
          })
          :
          null
        }
      </div>
      </div>
      <style jsx>{`
        .home_main{
          width: 100%;
          height: 100%;
        }
        .home {
          padding: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        .inp {
          margin-left: 120px;
          margin-top: 20px;
        }
      `}</style>
    </>
  );
}

export default Home;
