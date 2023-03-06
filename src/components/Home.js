import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LearnMore from "./LearnMorePage";
import CardPlace from "./Card-place";
import { SaveOptionContext } from "./StateContext";
import {
  TryAgain,
  HomeHead,
  FavouritesStyle,
  InputTitle,
  HomeStyle,
  ChooseBox,
  DisplayRow,
  Submit,
  WrapperPlaces,
} from "../style";
import "./style.css";
import "./SpinnerStyle.css";

export default function Home() {
  const {
    saveOptionn,
    setSaveOptionn,
    userName,
    setUserName,
    isLearn,
    setIsLearn,
    isLoading,
    setIsLoading,
    learnAbout,
    setLearnAbout,
    namePlace,
    setNamePlace,
  } = useContext(SaveOptionContext);
  let counterPlaces = 0;
  // const [isLearn, setIsLearn] = useState(false);
  const [event, setEvent] = useState("--Where do U wanna go--");
  const [area, setArea] = useState("--What is your area--");
  const [currentEvent, setCurrentEvent] = useState("--Where do U wanna go--");
  const [currentArea, setCurrentArea] = useState("--What is your area--");

  const newEvent = (e) => {
    setEvent(e.target.value);
  };
  const newArea = (e) => {
    setArea(e.target.value);
  };

  const [showData, setShowData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchNow, setSearchNow] = useState(false);

  const MyData = async () => {
    setCurrentEvent(event);
    setCurrentArea(area);
    if (
      currentEvent !== "--Where do U wanna go--" &&
      currentArea !== "--What is your area--"
    ) {
      setSearchNow(true);
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
    }
  };
  const currentUser = localStorage.getItem("logIn");
  async function SaveItem(e) {
    const res = await axios.get(
      `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company`
    );

    // const currentUser = localStorage.getItem("logIn");

    if (!res.data[e.target.id - 1].usersSave.includes(currentUser)) {
      const updatedUsersSave = [
        ...res.data[e.target.id - 1].usersSave,
        currentUser,
      ]; // add currentUser as a string to the existing array
      const response = await axios.put(
        `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company/${e.target.id}`,
        { usersSave: updatedUsersSave }
      );
    }
  }

  async function Learn(e) {
    setIsLearn(true);
    setLearnAbout("");
    setNamePlace("");
    setIsLoading(true);
    const ress = await axios.get(
      `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company/${e.target.id}`
    );
    console.log(`company ${e.target.id}:`, ress.data);
    setLearnAbout(ress.data.about);
    setNamePlace(ress.data.name);
    setIsLoading(false);
    console.log(e.target.id);
  }
  const [isDisable, setIsDisable] = useState(true);

  useEffect(() => {
    event !== "--Where do U wanna go--" &&
      area !== "--What is your area--" &&
      setIsDisable(false);
  }, [MyData, Submit]);
  function deleteSave() {}
  return (
    <div>
      <FavouritesStyle>
        {isLearn && <LearnMore about={learnAbout} placeTitle={namePlace} />}

        <HomeStyle>
          {currentUser.length !== 0 && <div>hey {currentUser}</div>}
          {/* <HomeHead></HomeHead> */}
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
                <option hidden selected>
                  --Where do U wanna go--
                </option>
                <option className="optiontInput" value="walking trials">
                  Hiking trails
                </option>
                <option value="camping">Camping</option>
                <option value="picnic">Picnic</option>
                <option value="dogs friendly">Dogs Friendly</option>
                <option value="bikes trails">Bikes Trails</option>
                <option value="water experience">Water Experience</option>
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
                <option hidden selected>
                  --What is your area--
                </option>
                <option value="north">North</option>
                <option value="center">Center</option>
                <option value="south">South</option>
              </select>
            </ChooseBox>
          </DisplayRow>
          {/* {event !== "--Where do U wanna go--" &&
          area !== "--What is your area--"
            ? setIsDisable(false)
            : setIsDisable(true)} */}

          <Submit disabled={isDisable} onClick={MyData}>
            Search Places
          </Submit>
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

            {!isLoading && (
              <WrapperPlaces>
                {showData.map((company) => {
                  if (
                    company.area === currentArea &&
                    company.events.includes(currentEvent)
                  ) {
                    return (
                      <CardPlace
                        key={company.id}
                        id={company.id}
                        title={company.name}
                        saveOption={saveOptionn}
                        SaveItem={SaveItem}
                        background={company.img}
                        LearnMore={Learn}
                        deleteSave={deleteSave}
                      >
                        {counterPlaces++}
                      </CardPlace>
                    );
                  }
                })}

                {/* {!searchNow && <div>Please first pick adventure </div>} */}
                {counterPlaces === 0 && searchNow && (
                  <TryAgain>places are not found, try again</TryAgain>
                )}
              </WrapperPlaces>
            )}
          </div>
        </HomeStyle>
      </FavouritesStyle>
    </div>
  );
}
