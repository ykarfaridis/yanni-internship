import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "../UI/CountdownTimer";
import Skeleton from "../UI/Skeleton";
import useMinimumLoading from "../UI/useMinimumLoading";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const displayLoading = useMinimumLoading(loading, 700);

  useEffect(() => {
    async function fetchNewItems() {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      const data = await response.json();
      setNewItems(data);
      setLoading(false);
    }
    fetchNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {displayLoading
            ? new Array(4).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Skeleton width="50px" height="50px" borderRadius="50%" />
                    </div>
                    <div className="nft__item_wrap" style={{ marginTop: "8px" }}>
                      <Skeleton width="100%" height="200px" borderRadius="8px" />
                    </div>
                    <div className="nft__item_info">
                      <Skeleton width="80%" height="20px" borderRadius="4px" />
                      <Skeleton width="40%" height="15px" borderRadius="4px" />
                    </div>
                  </div>
                </div>
              ))
            : newItems.slice(0, 4).map((item) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={`Creator: ${item.title}`}
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
