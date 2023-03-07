import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LearnMore from "./LearnMorePage";
import CardPlace from "./Card-place";
import { SaveOptionContext } from "./StateContext";
import {
  TryAgain,
  SearchNav,
  HomeStyle,
  Message,
  WrapperPlaces,
  HomeTitle,
  SearchMenu,
  SelectStyle,
} from "../style";
import "./style.css";
import "./SpinnerStyle.css";
import { Button } from "../style/Submit";

export default function Home() {
  const {
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

  const [event, setEvent] = useState("");
  const [area, setArea] = useState("");
  const [currentEvent, setCurrentEvent] = useState("");
  const [currentArea, setCurrentArea] = useState("");

  const [message, setMessage] = useState("");
  const newEvent = (e) => {
    setEvent(e.target.value);
  };
  const newArea = (e) => {
    setArea(e.target.value);
  };

  const [showData, setShowData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [searchNow, setSearchNow] = useState(false);
  const [hasData, setHasData] = useState(false);

  const MyData = async (e) => {
    e.preventDefault();
    setIsLearn(false);
    setMessage("");
    if (event !== "" && area !== "") {
      setHasData(true);
    }
    if (event === "" || area === "") {
      setMessage("Please select event and area!");
    } else if (currentEvent === event && currentArea === area) {
      setMessage("You have already search this!");
    } else {
      setCurrentEvent(event);
      setCurrentArea(area);
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
  const [randerArr, setRanderArr] = useState("");
  async function SaveItem(e) {
    const res = await axios.get(
      `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company`
    );

    if (!res.data[e.target.id - 1].usersSave.includes(currentUser)) {
      const updatedUsersSave = [
        ...res.data[e.target.id - 1].usersSave,
        currentUser,
      ];
      await axios.put(
        `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company/${e.target.id}`,
        { usersSave: updatedUsersSave }
      );
      setRanderArr(e.target.id);
    }
  }
  useEffect(() => {
    const fetchHome = async () => {
      try {
        setIsLoading(true);

        const newFeach = await axios.get(
          "https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company"
        );
        setShowData(newFeach.data);

        setIsLoading(false);
        setIsError(false);
      } catch (err) {
        console.log("the page is not found", err);
        setIsError(true);
      }
    };
    fetchHome();
  }, [randerArr]);

  async function Learn(e) {
    setMessage("");
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

  function deleteSave() {}
  return (
    <HomeStyle>
      {/* {currentUser.length !== 0 && <div>hey {currentUser}</div>} */}

      <SearchNav>
        <HomeTitle>Find your next trip!</HomeTitle>
        <SearchMenu onSubmit={MyData}>
          <SelectStyle value={event} name="event" onChange={newEvent}>
            <option hidden selected>
              Select event
            </option>
            <option className="n" value="walking trials">
              Hiking trails
            </option>
            <option value="camping">Camping</option>
            <option value="picnic">Picnic</option>
            <option value="dogs friendly">Dogs Friendly</option>
            <option value="bikes trails">Bikes Trails</option>
            <option value="water experience">Water Experience</option>
            <option value="for the Story">For The "Story"</option>
          </SelectStyle>
          <SelectStyle value={area} name="area" onChange={newArea}>
            <option hidden selected>
              Select area
            </option>
            <option value="north">North</option>
            <option value="center">Center</option>
            <option value="south">South</option>
          </SelectStyle>
          <Button type="submit">Search</Button>
        </SearchMenu>
        <Message>{message}</Message>
      </SearchNav>
      {hasData && (
        <SearchNav>
          {!isLoading && isLearn && (
            <LearnMore about={learnAbout} placeTitle={namePlace} />
          )}
          {isError && <TryAgain>page not found</TryAgain>}

          {isLoading && !isError && (
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
                      isSaved={company.usersSave.includes(currentUser)}
                      key={company.id}
                      id={company.id}
                      title={company.name}
                      saveOption={false}
                      // saveOption={saveOptionn}
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

              {counterPlaces === 0 && searchNow && (
                <TryAgain>places are not found, try again</TryAgain>
              )}
            </WrapperPlaces>
          )}
        </SearchNav>
      )}
    </HomeStyle>
  );
}
