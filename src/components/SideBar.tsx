import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "./Button";


import '../styles/sidebar.scss'
import { api } from "../services/api";
import { Content } from "./Content";

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar() {


  const [selectedGenreId, setSelectedGenreId] = useState(3);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  // Complete aqui

  useEffect(() => {
    api.get('genres').then(response => {
      setGenres(response.data.genres);
    });
  }, []);

  useEffect(() => {
  }, [selectedGenreId]);


  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <>
      <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              id={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
      <Content selectedGenreId={selectedGenreId} />
    </>
  )
}