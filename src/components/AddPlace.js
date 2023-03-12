import { useState } from "react";
import axios from "axios";

import { AddForm, AddSelectStyle, AddInput, AddTitles } from "../style";
import "./style.css";
import { Button } from "../style/Submit";

import DemoCard from "./Demo-Card";
export default function AddPlace() {
  const [placeName, setPlaceName] = useState("");
  const [theImgFile, setTheImgFile] = useState("");
  const [placeAbout, setPlaceAbout] = useState("");
  const [area, setArea] = useState("");
  const [hiking, setHiking] = useState(false);
  const [cheakeHiking, setCheakeHiking] = useState("");
  const [camp, setCamp] = useState(false);
  const [cheakeCamp, setCheakeCamp] = useState("");
  const [picnic, setPicnic] = useState(false);
  const [cheakePicnic, setCheakePicnic] = useState("");
  const [dog, setDog] = useState(false);
  const [cheakeDog, setCheakeDog] = useState("");
  const [bike, setBike] = useState(false);
  const [cheakeBike, setCheakeBike] = useState("");
  const [water, setWater] = useState(false);
  const [cheakeWater, setCheakeWater] = useState("");
  const [story, setStory] = useState(false);
  const [cheakeStory, setCheakeStory] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [thanks, setThanks] = useState(false);

  const [error, setError] = useState(false);
  function newPlace(e) {
    if (e.target.value.slice[-1] === " ") {
    }
    if (placeName.length === 13 || placeName.length === 26) {
      setPlaceName(`${e.target.value} `);
    } else {
      setPlaceName(e.target.value);
    }
  }
  // function newImgFile(e) {
  //   setTheImgFile(e.target.value);
  // }
  function newImgFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const imageDataUrl = event.target.result;
      setTheImgFile(imageDataUrl);
    };

    reader.readAsDataURL(file);
  }

  function newAbout(e) {
    setPlaceAbout(e.target.value);
  }
  function newArea(e) {
    setArea(e.target.value);
  }
  function changeHiking() {
    if (!hiking) {
      setHiking(true);
      setCheakeHiking("checked");
    } else {
      setHiking(false);
      setCheakeHiking("");
    }
  }
  function changeCamp() {
    if (!camp) {
      setCamp(true);
      setCheakeCamp("checked");
    } else {
      setCamp(false);
      setCheakeCamp("");
    }
  }
  function changePicnic() {
    if (!picnic) {
      setPicnic(true);
      setCheakePicnic("checked");
    } else {
      setPicnic(false);
      setCheakePicnic("");
    }
  }
  function changeDog() {
    if (!dog) {
      setDog(true);
      setCheakeDog("checked");
    } else {
      setDog(false);
      setCheakeDog("");
    }
  }
  function changeBike() {
    if (!bike) {
      setBike(true);
      setCheakeBike("checked");
    } else {
      setBike(false);
      setCheakeBike("");
    }
  }
  function changeWater() {
    if (!water) {
      setWater(true);
      setCheakeWater("checked");
    } else {
      setWater(false);
      setCheakeWater("");
    }
  }
  function changeStory() {
    if (!story) {
      setStory(true);
      setCheakeStory("checked");
    } else {
      setStory(false);
      setCheakeStory("");
    }
  }
  const [goodImg, setGoodImg] = useState("");
  function AddPlaceAPI(e) {
    setError(false);
    e.preventDefault();
    // console.log(theImgFile);
    setErrorMessage("");
    let pickEvent = true;
    if (!hiking && !camp && !picnic && !dog && !bike && !water && !story) {
      pickEvent = false;
    }
    if (
      placeName === "" ||
      theImgFile === "" ||
      placeAbout === "" ||
      area === "" ||
      placeName.length > 20 ||
      !pickEvent ||
      placeAbout < 10 ||
      placeAbout > 30
    ) {
      setErrorMessage(
        "Please fill all.The name can be till 35 characters. You have to pick at least 1 event. The about need to be at least 10 characters but no longer than 30."
      );
    } else {
      let arrOgEvents = [];
      if (hiking) arrOgEvents.push("walking trials");
      if (camp) arrOgEvents.push("camping");
      if (picnic) arrOgEvents.push("picnic");
      if (dog) arrOgEvents.push("dogs friendly");
      if (bike) arrOgEvents.push("bikes trails");
      if (water) arrOgEvents.push("water experience");
      if (story) arrOgEvents.push("for the Story");

      const newPlaceAdd = {
        name: `${placeName}`,
        area: `${area}`,
        events: arrOgEvents,
        img: `${theImgFile}`,
        about: `${placeAbout}`,
        usersSave: ["1"],
      };
      try {
        axios.post(
          `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company`,
          newPlaceAdd
        );
        setThanks(true);
      } catch (err) {
        console.log("the image adress is to long", err);
        setGoodImg("This image is not good, please try again");
        setError(true);
      }
    }
  }
  return (
    <>
      {thanks ? (
        <AddForm>
          <p>Thank you!</p>
        </AddForm>
      ) : (
        <AddForm>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={AddPlaceAPI}
          >
            <AddInput
              onChange={newPlace}
              type="text"
              placeholder="The name place"
              value={placeName}
              maxLength={35}
            />

            <AddSelectStyle value={area} onChange={newArea}>
              <option hidden selected>
                Region:
              </option>
              <option value="north">north</option>
              <option value="center">center</option>
              <option value="south">south</option>
            </AddSelectStyle>
            <AddTitles>select events to this place:</AddTitles>
            <div className="wrapperRadio">
              <label>
                <input
                  className="radioInput"
                  type="radio"
                  name="hiking trails"
                  onChange={changeHiking}
                  checked={cheakeHiking}
                />
                <span className="radioTitle">Hiking Trails</span>
              </label>
              <label>
                <input
                  className="radioInput"
                  type="radio"
                  name="camping"
                  onChange={changeCamp}
                  checked={cheakeCamp}
                />
                <span className="radioTitle">Camping</span>
              </label>
              <label>
                <input
                  className="radioInput"
                  type="radio"
                  name="picnic"
                  onChange={changePicnic}
                  checked={cheakePicnic}
                />
                <span className="radioTitle">Picnic</span>
              </label>
              <label>
                <input
                  className="radioInput"
                  type="radio"
                  name="dogs friendly"
                  onChange={changeDog}
                  checked={cheakeDog}
                />
                <span className="radioTitle">Dogs Friendly</span>
              </label>
              <label>
                <input
                  className="radioInput"
                  type="radio"
                  name="bikes trails"
                  onChange={changeBike}
                  checked={cheakeBike}
                />
                <span className="radioTitle">Bikes Trails</span>
              </label>
              <label>
                <input
                  className="radioInput"
                  type="radio"
                  name="water experience"
                  onChange={changeWater}
                  checked={cheakeWater}
                />
                <span className="radioTitle">Water Experience</span>
              </label>
              <label>
                <input
                  className="radioInput"
                  type="radio"
                  name="for the Story"
                  onChange={changeStory}
                  checked={cheakeStory}
                />
                <span className="radioTitle">To the Story</span>
              </label>
            </div>
            {/* <AddInput
          type="text"
          placeholder="Add img"
          onChange={newImg}
          value={theImg}
        /> */}
            <AddInput
              type="file"
              accept="image/*"
              placeholder="Add img"
              onChange={newImgFile}
            />
            <textarea
              placeholder="About The Place"
              rows="6"
              cols="40"
              value={placeAbout}
              onChange={newAbout}
            />
            {error && { goodImg }}
            <Button type="submit">submit</Button>
            {errorMessage}
          </form>
          <DemoCard background={theImgFile} title={placeName} />
        </AddForm>
      )}
    </>
  );
}
