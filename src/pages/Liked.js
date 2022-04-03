import React, {useEffect, useState} from 'react'
import Card from "../components/Card";
import axios from 'axios';

function Liked() {

  const [getResult, setGetResult] = useState([])
  useEffect(() => {
    let getIds = JSON.parse(localStorage.getItem("Ids"))
    setGetResult(getIds)
    console.log("json ", getIds);
  },[])

  async function getIdsResult(di){
    let getData = await axios.get(`https://rickandmortyapi.com/api/character/${di}`)
    return getData.data
  }
  return (
    <>
    <div className='like_main'>
      <div className='like'>
      {
          getResult && getResult != undefined && getResult.length > 0 ?
          getResult?.map((item, index) => {
            return (
              <Card key={index} data={getIdsResult(item)} />
            )
          })
          :
          <div>No Likes Cards.....</div>
        }
      </div>
    </div>
    <style jsx>{`
    .like_main{
      width: 100%;
      height: 100%;
    }
    .like {
      padding: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }
  `}</style>
  </>
  )
}

export default Liked