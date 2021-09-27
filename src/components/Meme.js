import React, { useState, useEffect } from "react";
//import axios from "axios";
import styles from "./styles.modules.css";
import { useHistory } from "react-router";

export const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [currentMeme, setCurrentMeme] = useState(0);
  const [captions, setCaptions] = useState([]);

  const history = useHistory();

  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((c, i) => {
        if (index === i) {
          return text;
        } else {
          return c;
        }
      })
    );
  };

  const generateMeme = () => {
    const actualMeme = memes[currentMeme];
    const formData = new FormData();

    formData.append("username", "joneshirsch");
    formData.append("password", "testthis123");
    formData.append("template_id", actualMeme.id);
    captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c));

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((res) => {
        history.push(`/generated?url=${res.data.url}`);
      });
    });
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const random = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[random];
      array[random] = temp;
    }
  };

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((res) =>
      res.json().then((res) => {
        const memes = res.data.memes;
        shuffle(memes);
        setMemes(memes);
      })
    );
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[currentMeme].box_count).fill(""));
    }
  }, [currentMeme, memes]);


  return memes.length ? (
    <div className={styles.container}>
      <img src={memes[currentMeme].url} alt="memes" />

      {captions.map((c, index) => (
        <input onChange={(e) => updateCaption(e, index)} key={index} />
      ))}
      <button onClick={() => setCurrentMeme(currentMeme + 1)} className="skip">
        Next
      </button>
      <button onClick={generateMeme} className="generate">
        Generate Meme
      </button>
    </div>
  ) : (
    <></>
  );
};
