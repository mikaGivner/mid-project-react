import { useState } from "react";
import axios from "axios";
import { WrapperAdd, AddForm, Submit } from "../style";
import "./style.css";
export default function AddPlace() {
  const [placeName, setPlaceName] = useState("");
  const [theImg, setTheImg] = useState("");
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

  function newPlace(e) {
    setPlaceName(e.target.value);
  }
  function newImg(e) {
    setTheImg(e.target.value);
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
  function AddPlaceAPI(e) {
    e.preventDefault();
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
      img: `${theImg}`,
      about: `${placeAbout}`,
      usersSave: ["1"],
    };
    const newObj = axios.post(
      `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company`,
      newPlaceAdd
    );
  }
  return (
    <WrapperAdd>
      <AddForm onSubmit={AddPlaceAPI}>
        <input
          onChange={newPlace}
          type="text"
          placeholder="Place Name"
          value={placeName}
        />
        <label>area:</label>
        <select value={area} onChange={newArea}>
          <option value="north">north</option>
          <option value="center">center</option>
          <option value="south">south</option>
        </select>
        <p>select events to this place:</p>
        <div className="wrapperRadio">
          <label>
            <input
              className="radioInput"
              type="radio"
              name="hiking trails"
              onChange={changeHiking}
              checked={cheakeHiking}
            />
            hiking trails
          </label>
          <label>
            <input
              className="radioInput"
              type="radio"
              name="camping"
              onChange={changeCamp}
              checked={cheakeCamp}
            />
            camping
          </label>
          <label>
            <input
              className="radioInput"
              type="radio"
              name="picnic"
              onChange={changePicnic}
              checked={cheakePicnic}
            />
            picnic
          </label>
          <label>
            <input
              className="radioInput"
              type="radio"
              name="dogs friendly"
              onChange={changeDog}
              checked={cheakeDog}
            />
            dogs friendly
          </label>
          <label>
            <input
              className="radioInput"
              type="radio"
              name="bikes trails"
              onChange={changeBike}
              checked={cheakeBike}
            />
            bikes trails
          </label>
          <label>
            <input
              className="radioInput"
              type="radio"
              name="water experience"
              onChange={changeWater}
              checked={cheakeWater}
            />
            water experience
          </label>
          <label>
            <input
              className="radioInput"
              type="radio"
              name="for the Story"
              onChange={changeStory}
              checked={cheakeStory}
            />
            for the Story
          </label>
        </div>
        <input
          type="text"
          placeholder="Add img"
          onChange={newImg}
          value={theImg}
        />
        <textarea
          placeholder="About The Place"
          rows="6"
          cols="40"
          value={placeAbout}
          onChange={newAbout}
        />
        <Submit type="submit">submit</Submit>
      </AddForm>
    </WrapperAdd>
  );
}
