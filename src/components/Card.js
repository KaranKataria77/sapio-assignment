import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";

function Card(props) {
  const [flip, setFlip] = useState(false);
  const [fav, setFav] = useState(false);
  const [ids, setIds] = useState([]);
  const [getData, setGetData] = useState(props.data);

  useEffect(() => {
      setResults()
      getallfav()
  },[props.data])

  async function setResults () {
      let res = await props.data
      setGetData(res)
  }

  const getallfav = () => {
    let getIds = localStorage.getItem("Ids") != undefined && localStorage.getItem("Ids") != null ? localStorage.getItem("Ids") : "[]"
    setIds(JSON.parse(getIds))
  }

  const getFav = (e, iid) => {
    e.stopPropagation();
    setFav(!fav);

    let getIds = localStorage.getItem("Ids") != undefined && localStorage.getItem("Ids") != null ? localStorage.getItem("Ids") : "[]"
    let allids = JSON.parse(getIds)
    if(allids.includes(iid)){
        allids.splice(allids.indexOf(iid),1)
    }else{
        allids.push(iid)
    }
    setIds(allids)
    localStorage.setItem("Ids", JSON.stringify(allids))
    // localStorage.clear()
  }

  return (
    <>
      <div
        className="card"
        onClick={() => {
          setFlip(!flip);
        }}
      >
        <div className={flip ? "card__inner is-flipped" : "card__inner"}>
          <div className="card__face card__face--front">
            <div
              className="heart"
              onClick={(e) => {
                getFav(e, getData && getData != undefined ? getData?.id : "")
              }}
            >
              <FontAwesomeIcon icon={ids?.includes(getData?.id) ? faHeartCircleCheck : faHeart} />
            </div>
            <img
              src={getData && getData != undefined ? getData?.image : ""}
              alt=""
              className="pp"
            />
            <h2>{getData && getData !== undefined ? getData?.name : ""}</h2>
          </div>
          <div className="card__face card__face--back">
            <div className="card__content"></div>
            <div className="card__header">
              <h2>{getData && getData != undefined ? getData?.name : ""}</h2>
            </div>
            <div className="card__body">
              <h3>
                Status: {getData && getData != undefined ? getData?.status : ""}
              </h3>
              <h3>
                Species:{" "}
                {getData && getData != undefined ? getData?.species : ""}
              </h3>
              <h3>
                Gender: {getData && getData != undefined ? getData?.gender : ""}
              </h3>
              <h3>
                Origin:{" "}
                {getData && getData != undefined ? getData?.origin?.name : ""}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
      .card {
        width: 300px;
        height: 400px;
        perspective: 800px;
        border: 0;
        margin: 10px;
      }
      .card__inner{
        width: 100%;
        height: 100%;
        transition: transform 1s;
        transform-style: preserve-3d;
        cursor: pointer;
        position: relative;
      }
      .card__inner.is-flipped{
        transform: rotateY(180deg);
      }
      .card__face{
        position: absolute;
        width: 100%;
        height: 100%;
        -webpack-backface-visibility:hidden;
        backface-visibility:hidden;
        overflow: hidden;
        border-radius: 16px;
        box-shadow: 0px 3px 18px 3px rgba(0, 0, 0, 0.2);
      }
      .card__face--front {
        background-image: linear-gradient(to bottom right, #ffce00, #fe4880);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .heart{
          position: absolute;
          z-index: 111;
          top: 20px;
          left: 20px;
      }
      .card__face--front h2{
          color:#fff;
          font-size: 22px;
      }
      .card__face--back{
        background-color: #f3f3f3;
        transform: rotateY(180deg);
      }
      .card__content{
        width: 100%;
        height 100%;
      }
      .card__header{
        position:relative;
        padding: 30px 30px 40px;
      }
      .card__header:after{
        content: '';
        display: block;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index: -1;
        border-radius: 0 0 50% 0;
        background-image: linear-gradient(to bottom left, #ffce00, #fe4880 115%);
      }
      .pp {
        width: 60%;
        height 60%;
        margin: 0 auto 30px;
        border-radius: 50%;
        background-color: #fff;
        border: 5px solid #fff;
        object-fit: cover;
      }
      .card__header h2{
        color: #fff
        font-size: 22px;
        font-weight: 900;
        text-transform: uppercase;
        text-align:center;
      }
      .card__body {
        padding: 30px
      }
      .card__header h3{
        color: #212121;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 15px;
      }
      .card__body h3 {
        color: #212121;
        font-size: 20px;
        line-height: 1.5;
      }
      `}</style>
    </>
  );
}

export default Card;
