import React, { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import axios from "axios";


function HomePage(props) {
  const [normal, setNormal] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);
  const accessKey = `TTlrYf7j3lfKBuBmgctsRelhEH80a-MzXtopjt8F5T8`;
  let  randomUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=30`;
  let queryUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
  useEffect(() => {
    setQuery(props.reqQuery);
    setSearchClicked(props.search);
  }, [props.reqQuery, props.search]);

  useEffect(() => {
    setNormal(props.displayStyle);
  }, [props.displayStyle]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(randomUrl);
        console.log(response.data) ; 
        setData(response.data);
      } catch (error) {
        console.error('Error fetching random data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchQueryData() {
      if (query && searchClicked) {
        try {
          const response = await axios.get(queryUrl);
          const result = response.data.results ; 
          console.log(result) ; 
          setData(result);
        } catch (error) {
          console.error('Error fetching query data:', error);
        }
      }
    }

    fetchQueryData();
  }, [query, searchClicked]);

  function createCard(item) {
    return (
      <div className="image-card" key={item.id}>
      {query !== null ? <ImageCard
          isRandom = {false}
          id={item.id}
          display={normal}
          url={item.urls.raw}
          alt_description={item.alt_description}
          // aperture={item.exif.aperture}
          views={item.views !== null ? item.views : null }
          // focal_length={item.exif.focal_length}
          // exposure_time={item.exif.exposure_time}
          // iso={item.exif.iso}
          likes={item.likes}
          instagram_username={item.user.instagram_username !== null ? item.user.instagram_username : item.user.username }
          created_at={item.created_at}
        /> :  <ImageCard
        isRandom = {true}
          id={item.id}
          display={normal}
          url={item.urls.raw}
          alt_description={item.alt_description}
          aperture={item.exif.aperture}
          views={item.views}
          focal_length={item.exif.focal_length}
          exposure_time={item.exif.exposure_time}
          iso={item.exif.iso}
          likes={item.likes}
          instagram_username={item.user.instagram_username !== null ? item.user.instagram_username : item.user.username }
          created_at={item.created_at}
        /> }
        
       
      </div>
    );
  }

  return (
    <div>
      {normal ? (
        <div className=" h-full flex flex-col">
          {Array.isArray(data) && data.map(createCard)}
        </div>
      ) : (
        <div className="border-solid border-2 border-yellow-400 gallary">
        {Array.isArray(data) && data.map(createCard)}
        </div>
      )}
    </div>
  );
}
export default HomePage ; 