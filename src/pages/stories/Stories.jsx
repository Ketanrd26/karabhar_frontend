import React, { useEffect, useState } from 'react'
import "./Stories.scss"
import { Swiper, SwiperSlide } from "swiper/react";
import ReactPlayer from "react-player";
import "swiper/css";
import "swiper/css/pagination";
import { FcLikePlaceholder, FcComments } from "react-icons/fc";
import { Autoplay, Pagination } from "swiper/modules";

import { FaShareFromSquare } from "react-icons/fa6";
import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";
import { adminApi } from '../../utils/Api';
import { socket } from '../../socket';
import { trucateAmt } from '../../components/truncateAmt/TruncateAmt';

const Stories = () => {
  const [reelData, setReelData] = useState([]);
  const [likeReel, setLikeReel] = useState([]);
  const [playingReelId, setPlayingReelId] = useState(null);

  // Fetch reels
  const getAllReel = async () => {
    try {
      const response = await adminApi.get("api/reel/getAllReel");
      setReelData(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Like reel
  const handleLikeReel = async (id) => {
    try {
      if (likeReel.includes(String(id))) return;

      // 🔥 OPTIMISTIC UPDATE (INSTANT UI)
      setReelData((prev) =>
        prev.map((reel) =>
          reel.id === id
            ? { ...reel, likeCount: Number(reel.likeCount) + 1 }
            : reel
        )
      );

      await adminApi.post(
        `api/reel/likeReel?id=${id}`,
        {},
        { withCredentials: true }
      );

      setLikeReel((prev) => [...prev, String(id)]);
    } catch (error) {
      console.error(error);
    }
  };

  // Join teel rooms AFTER reels load
  useEffect(() => {
    if (!reelData.length) return;

    reelData.forEach((reel) => {
      socket.emit("joinReel", `reel_${reel.id}`);
    });
  }, [reelData]);

  // 🔥 Real-time like updates
  useEffect(() => {
    socket.on("reelLikeUpdated", ({ reelId, likes }) => {
      setReelData((prev) =>
        prev.map((reel) =>
          reel.id === reelId ? { ...reel, likeCount: likes } : reel
        )
      );
    });

    return () => socket.off("reelLikeUpdated");
  }, []);

  const getAllLikedReel = async () => {
    try {
      const response = await adminApi.get("api/reel/getAllLikeWithCookies");
      if (response?.status === 200) {
        setLikeReel(response.data.data.map(String));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // unlike reel

const unlikeReel = async (id) => {
  try {
    // 🔥 OPTIMISTIC UPDATE
    setReelData((prev) =>
      prev.map((reel) =>
        reel.id === id
          ? { ...reel, likeCount: Math.max(reel.likeCount - 1, 0) }
          : reel
      )
    );

    const response = await adminApi.post(
      `api/reel/unlikeReel?id=${id}`,
      {},
      { withCredentials: true }
    );

    if (response?.status === 200) {
      setLikeReel((prev) => prev.filter((r) => r !== String(id)));
    }
  } catch (error) {
    console.log(error);
  }
};


  // Initial load
  useEffect(() => {
    getAllReel();
    getAllLikedReel();
  }, []);

  return (
    <>
    <div class="stories_parent parent">
        <div class="stories_cont cont">
            <h3>
                Stories
            </h3>
            <div class="reelslist">
               {
                reelData && reelData?.map((item,index)=>(
                     <div class="reel_card">
                     <Link to={`/Vendor_profile?sellerId=${item.sellerId}`} className="sell_name">{item?.sellerName}</Link>

                <div className="main-card">
                  <ReactPlayer
                    src={item.reel}
                    slot="media"
                    height="100%"
                    width="100%"
                    className="react-video"
                    controls={true}
                    playing={playingReelId === item.id}
                    onPlay={() => setPlayingReelId(item.id)}
                    onPause={() => {
                      if (playingReelId === item.id) setPlayingReelId(null);
                    }}
                  />
                </div>

                <div className="bottom_sec">
                  <div className="bt_left">
                    {likeReel && likeReel?.includes(String(item.id)) ? (
                      <div className="likes">
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => unlikeReel(item.id)}
                        >
                          <FcLike />
                        </span>
                        <h6>{trucateAmt(item.likeCount)}</h6>
                      </div>
                    ) : (
                      <div className="likes">
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handleLikeReel(item.id)}
                        >
                          <FcLikePlaceholder />
                        </span>
                        <h6>{trucateAmt(item.likeCount)}</h6>
                      </div>
                    )}

                    {/* <div className="likes">
                      <span style={{ cursor: "pointer" }}>
                        <FcComments />
                      </span>
                      <h6>{trucateAmt(item.commentCount)}</h6>
                    </div> */}
                  </div>
                  <div className="share">
                    <FaShareFromSquare />
                  </div>
                </div>
                </div>
                ))
               }
            </div>
        </div>
    </div>
      
    </>
  )
}

export default Stories
