import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SaveOptionContext } from "./StateContext";
import "./style.css";
import CardPlace from "./Card-place";
import "./SpinnerStyle.css";
import LearnMore from "./LearnMorePage";
import {
  WrapperPlaces,
  Submit,
  TryAgain,
  SearchNav,
  HomeStyle,
} from "../style";
export default function FavouritesPlaces() {
  const {
    saveOptionn,
    setShowLogIn,
    isLoading,
    setIsLoading,
    learnAbout,
    setLearnAbout,
    isLearn,
    setIsLearn,
    namePlace,
    setNamePlace,
    deletFeatuer,
    setDeletFeatuer,
  } = useContext(SaveOptionContext);
  let counterFavorites = 0;
  const currentUser = localStorage.getItem("logIn");
  const [hasUser, setHasUser] = useState("You have to logIn");
  const [arrayData, setArrayData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [rendSave, setRendSave] = useState("");
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const showRes = await axios.get(
          "https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company"
        );

        setArrayData(showRes.data);

        setIsLoading(false);
        setIsError(false);
      } catch (err) {
        console.log("the page is not found", err);
        setIsError(true);
      }
    };

    if (currentUser !== "") {
      setHasUser("");
      fetchFavorites();
    } else {
      setHasUser("You have to logIn");
    }
  }, [saveOptionn, rendSave, currentUser.length, setIsLoading]);
  async function Learn(e) {
    setIsLearn(true);
    setLearnAbout("");
    setNamePlace("");
    setIsLoading(true);
    const ress = await axios.get(
      `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company/${e.target.id}`
    );

    setLearnAbout(ress.data.about);
    setNamePlace(ress.data.name);
    setIsLoading(false);
    console.log(e.target.id);
  }

  function F() {}
  function GoLogIn() {
    setShowLogIn(true);
  }
  function deleteActive(e) {
    setIsLearn(false);
    if (e.target.innerText === "To delete") {
      setDeletFeatuer("Stop delete");
    } else {
      setDeletFeatuer("To delete");
    }
  }

  async function deleteSave(e) {
    if (deletFeatuer === "Stop delete") {
      const arrData = await axios.get(
        `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company`
      );
      const arrayToDeleteFrom = arrData.data[e.target.id - 1].usersSave;
      //arrayToDeleteFrom give the array that we need to remote name from
      const indexToRemove = arrayToDeleteFrom.indexOf(currentUser);
      if (indexToRemove !== -1) {
        arrayToDeleteFrom.splice(indexToRemove, 1);
      }
      await axios.put(
        `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company/${e.target.id}`,
        { usersSave: arrayToDeleteFrom }
      );
    }
    setRendSave(e.target.id);
  }

  return (
    <HomeStyle>
      <SearchNav>
        {isLearn && !isLoading && (
          <LearnMore about={learnAbout} placeTitle={namePlace} />
        )}
        {hasUser !== "" ? (
          <>
            <TryAgain>{hasUser}</TryAgain>
            <Submit onClick={GoLogIn}>Click to logIn</Submit>
          </>
        ) : (
          <div>
            <div>
              {isError && <div>Page not found</div>}

              {isLoading && !isError && (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
              <WrapperPlaces>
                {!isLoading &&
                  currentUser !== "" &&
                  arrayData.map((company) => {
                    if (company.usersSave.includes(currentUser)) {
                      return (
                        <CardPlace
                          key={company.id}
                          id={company.id}
                          title={company.name}
                          saveOption={true}
                          SaveItem={F}
                          background={company.img}
                          LearnMore={Learn}
                          deleteSave={deleteSave}
                        >
                          {counterFavorites++}
                        </CardPlace>
                      );
                    } else return <></>;
                  })}
              </WrapperPlaces>
            </div>
          </div>
        )}
        {counterFavorites === 0 && !hasUser && !isLoading && (
          <TryAgain>There are no favorites places</TryAgain>
        )}
      </SearchNav>
      {counterFavorites !== 0 &&
        !hasUser &&
        !isLoading &&
        currentUser !== "" && (
          <Submit onClick={deleteActive}>{deletFeatuer}</Submit>
        )}
    </HomeStyle>
  );
}
