import React, { useEffect, useState } from "react";
import "./Reels.scss";
import ReactPlayer from "react-player";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { Link } from "react-router-dom";
import { adminApi } from "../../utils/Api";
import { socket } from "../../socket";
import { trucateAmt } from "../truncateAmt/TruncateAmt";

const Reels = () => {
  const [reels, setReels] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playingReelId, setPlayingReelId] = useState(null);
  const [reelsPerPage, setReelsPerPage] = useState(2); // Display minimum 2 reels

  useEffect(() => {
    const updateReelsPerPage = () => {
      setReelsPerPage(window.innerWidth <= 600 ? 1 : 2);
    };

    updateReelsPerPage();
    window.addEventListener("resize", updateReelsPerPage);
    return () => window.removeEventListener("resize", updateReelsPerPage);
  }, []);

  // ---------------- FETCH REELS ----------------
  const fetchReels = async () => {
    try {
      const res = await adminApi.get("api/reel/getAllReel", {
        withCredentials: true,
      });

      setReels(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- TOGGLE LIKE ----------------
  const toggleLike = async (reelId) => {
    setReels((prev) =>
      prev.map((reel) => {
        if (reel.id === reelId) {
          return {
            ...reel,
            isLiked: !reel.isLiked,
            likeCount: reel.isLiked ? reel.likeCount - 1 : reel.likeCount + 1,
          };
        }
        return reel;
      }),
    );

    try {
      await adminApi.post(
        `api/reel/toggleLike?id=${reelId}`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- JOIN SOCKET ROOMS ----------------
  useEffect(() => {
    if (!reels.length) return;

    reels.forEach((reel) => {
      socket.emit("joinReel", `reel_${reel.id}`);
    });
  }, [reels]);

  // ---------------- SOCKET LISTENER ----------------
  useEffect(() => {
    socket.on("reelLikeUpdated", ({ reelId, likes }) => {
      setReels((prev) =>
        prev.map((reel) =>
          reel.id === reelId ? { ...reel, likeCount: likes } : reel,
        ),
      );
    });

    return () => socket.off("reelLikeUpdated");
  }, []);

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    fetchReels();
  }, []);

  useEffect(() => {
    if (reels.length === 0) return;
    const maxIndex = Math.max(reels.length - reelsPerPage, 0);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [reels, currentIndex, reelsPerPage]);

  const visibleReels = reels.slice(currentIndex, currentIndex + reelsPerPage);

  return (
    <div className="reel_section parent">
      <div className="reel_section_cont cont">
        <div className="left">
          <h2>Meet the Makers</h2>
          <p>
            Every product on Jungle Boosh begins with a real person. Meet the
            makers and creators behind the craft, culture, and care.
          </p>
          <Link to="/stories" className="btn">
            Explore Stories
          </Link>
        </div>

        <div className="right">
          {visibleReels.length === 0 ? (
            <div className="empty-message">No reels available</div>
          ) : (
            <div className="manual-carousel">
              <div className="carousel-controls">
                <button
                  className="carousel-button prev"
                  onClick={() => {
                    setPlayingReelId(null);
                    setCurrentIndex((prev) => Math.max(prev - 1, 0));
                  }}
                  disabled={currentIndex === 0}
                >
                  Prev
                </button>
                <span className="carousel-counter">
                  {currentIndex + 1} - {Math.min(currentIndex + reelsPerPage, reels.length)} / {reels.length}
                </span>
                <button
                  className="carousel-button next"
                  onClick={() => {
                    setPlayingReelId(null);
                    setCurrentIndex((prev) => Math.min(prev + 1, Math.max(reels.length - reelsPerPage, 0)));
                  }}
                  disabled={currentIndex + reelsPerPage >= reels.length}
                >
                  Next
                </button>
              </div>

              <div className="reels-container">
                {visibleReels.map((reel) => (
                  <div key={reel.id} className="custom-slide">
                    <Link
                      to={`/Vendor_profile?sellerId=${reel.sellerId}`}
                      className="sell_name"
                    >
                      {reel.sellerName}
                    </Link>

                    <div className="main-card">
                      <ReactPlayer
                        src={reel.reel}
                        playing={playingReelId === reel.id}
                        onPlay={() => setPlayingReelId(reel.id)}
                        onPause={() => setPlayingReelId(null)}
                        height="100%"
                        width="100%"
                        className="react-video"
                        controls={true}
                      />
                    </div>

                    <div className="bottom_sec">
                      <div className="bt_left">
                        <div className="likes">
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => toggleLike(reel.id)}
                          >
                            {reel.isLiked ? (
                              <FcLike size={22} />
                            ) : (
                              <FcLikePlaceholder size={22} />
                            )}
                          </span>
                          <h6>{trucateAmt(reel.likeCount)}</h6>
                        </div>
                      </div>

                      {/* <div className="share">
                    <FaShareFromSquare />
                  </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reels;
