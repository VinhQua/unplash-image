import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useGlobalContext } from "./context";
const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_ACCESS_KEY
}&page=1`;

const Gallery = () => {
  const { searchValue } = useGlobalContext();
  const response = useQuery({
    queryKey: ["images", searchValue],
    queryFn: async () => {
      const res = await axios.get(`${url}&query=${searchValue}`);
      return res.data;
    },
  });
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }
  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }
  return (
    <section className="image-container">
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            key={item.id}
            src={url}
            alt={item.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
