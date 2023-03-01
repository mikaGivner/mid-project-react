import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import {
  FavouritesStyle,
  InputTitle,
  HomeStyle,
  ChooseBox,
  DisplayRow,
  Submit,
  PlaceImg,
} from "../style";
import "./style.css";
import "./SpinnerStyle.css";
export default function Home() {
  const [event, setEvent] = useState("walking trials");
  const [area, setArea] = useState("north");
  const [currentEvent, setCurrentEvent] = useState("walking trials");
  const [currentArea, setCurrentArea] = useState("north");

  const newEvent = (e) => {
    setEvent(e.target.value);
  };
  const newArea = (e) => {
    setArea(e.target.value);
  };

  const [showData, setShowData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const MyData = async () => {
    console.log(event, area);
    setCurrentEvent(event);
    setCurrentArea(area);
    try {
      setIsLoading(true);

      const showRes = await axios.get(
        "https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company"
      );

      setShowData(showRes.data);

      setIsLoading(false);
      setIsError(false);
    } catch (err) {
      console.log("the page is not found", err);
      setIsError(true);
    }
  };

  return (
    <FavouritesStyle>
      <Header />
      <HomeStyle>
        <h1>What is your next adventure?</h1>
        <DisplayRow>
          <ChooseBox>
            <InputTitle>I wanna go to:</InputTitle>

            <select
              value={event}
              name="event"
              className="selectInput"
              onChange={newEvent}
            >
              <option value="walking trials">Hiking trails</option>
              <option value="camping">Camping</option>
              <option value="picnic">Picnic</option>
              <option value="dogs friendly">Dogs Friendly</option>
              <option value="bikes trails">Bikes Trails</option>
              <option value="bikes trails">Water Experience</option>
              <option value="for the Story">For The "Story"</option>
            </select>
          </ChooseBox>
          <ChooseBox>
            <InputTitle>My Area Is:</InputTitle>

            <select
              value={area}
              name="area"
              className="selectInput"
              onChange={newArea}
            >
              <option value="north">North</option>
              <option value="center">Center</option>
              <option value="south">South</option>
            </select>
          </ChooseBox>
        </DisplayRow>
        <Submit onClick={MyData}>Search Places</Submit>
        <div>
          {isError && <div>page not found</div>}
          {/*TODO: ADD SPINNER INSTED OF LOADING */}
          {isLoading && !isError && (
            // <div style={{ color: "red" }}>Loading...</div>
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          )}
          {!isLoading &&
            showData.map((company, index) => {
              if (
                company.area === currentArea &&
                company.events.includes(currentEvent)
              ) {
                return (
                  <div key={index}>
                    name:{company.name}
                    <PlaceImg src={company.img} alt="img" />
                  </div>
                );
              }

              //  return (
              {
                /* <div key={index}>
                  name:{company.name}
                  <img src={company.img} alt="img" />
                </div> */
              }

              // );
            })}
        </div>
      </HomeStyle>
    </FavouritesStyle>
  );
}
