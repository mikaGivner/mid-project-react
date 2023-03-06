import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./style.css";
import { SaveOptionContext } from "./StateContext";
import LogIn from "./LogIn";
import CardPlace from "./Card-place";
import { DisplayRow, FavouritesStyle, Submit, TryAgain } from "../style";
import "./SpinnerStyle.css";
import LearnMore from "./LearnMorePage";
export default function FavouritesPlaces() {
  let counterFavorites = 0;
  const {
    saveOptionn,
    showLogIn,
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
  const currentUser = localStorage.getItem("logIn");
  const [hasUser, setHasUser] = useState("you have to logIn");
  const [arrayData, setArrayData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [empty, setEmpty] = useState("");

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

  function F() {}
  function GoLogIn() {
    setShowLogIn(true);
  }
  function deleteActive(e) {
    if (e.target.innerText === "To delete") {
      setDeletFeatuer("Stop delete");
    } else {
      setDeletFeatuer("To delete");
    }
  }
  const [rendSave, setRendSave] = useState("");
  async function deleteSave(e) {
    if (deletFeatuer === "Stop delete") {
      const arrData = await axios.get(
        `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company`
      );
      const arrayToDeleteFrom = arrData.data[e.target.id - 1].usersSave;
      //arrayToDeleteFrom give the array that we need to remote name from
      console.log(arrayToDeleteFrom);
      const indexToRemove = arrayToDeleteFrom.indexOf(currentUser);
      if (indexToRemove !== -1) {
        arrayToDeleteFrom.splice(indexToRemove, 1);
      }
      const deleteUserSave = await axios.put(
        `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company/${e.target.id}`,
        { usersSave: arrayToDeleteFrom }
      );
    }
    setRendSave("1");
  }
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

    if (currentUser.length !== 0) {
      setHasUser("");
      fetchFavorites();
    } else {
      setHasUser("you have to logIn");
    }
  }, [saveOptionn, rendSave]);
  return (
    <div>
      {" "}
      <FavouritesStyle>
        {isLearn && <LearnMore about={learnAbout} placeTitle={namePlace} />}
        {hasUser !== "" ? (
          <>
            <TryAgain>{hasUser}</TryAgain>
            <Submit onClick={GoLogIn}>Click to logIn</Submit>
          </>
        ) : (
          <div>
            {/* <Submit onClick={giveData}>Show my favorites</Submit> */}
            <div>
              {isError && <div>page not found</div>}

              {isLoading && !isError && (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
              <DisplayRow>
                {!isLoading &&
                  currentUser.length !== 0 &&
                  arrayData.map((company) => {
                    if (company.usersSave.includes(currentUser)) {
                      return (
                        <CardPlace
                          key={company.id}
                          id={company.id}
                          title={company.name}
                          saveOption={empty}
                          SaveItem={F}
                          background={company.img}
                          LearnMore={Learn}
                          deleteSave={deleteSave}
                        >
                          {counterFavorites++}
                        </CardPlace>
                      );
                    }
                  })}
              </DisplayRow>
            </div>
          </div>
        )}
        {counterFavorites === 0 && !hasUser && !isLoading && (
          <TryAgain>there are no favorites places</TryAgain>
        )}
        {counterFavorites !== 0 &&
          !hasUser &&
          !isLoading &&
          currentUser.length !== 0 && (
            <Submit onClick={deleteActive}>{deletFeatuer}</Submit>
          )}
      </FavouritesStyle>
    </div>
  );
}
