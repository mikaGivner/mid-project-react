import { useEffect, useContext, useState } from "react";
import { DeletePage, SearchNav, PlacesMenu, PlaceTitle } from "../style";
import axios from "axios";
import { SaveOptionContext } from "./StateContext";
export default function DeletePlaces() {
  const { isError, setIsError, isLoading, setIsLoading } =
    useContext(SaveOptionContext);
  const [arrayData, setArrayData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState("");
  const DeletItem = async (e) => {
    try {
      setIsLoading(true);

      await axios.delete(
        `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company/${e.target.id}`
      );
      setItemToDelete(e.target.id);
      setIsLoading(false);
      setIsError(false);
    } catch (err) {
      console.log("the page is not found", err);
      setIsError(true);
    }
  };
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setIsLoading(true);
        const showPlaces = await axios.get(
          "https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/company"
        );
        setArrayData(showPlaces.data);

        setIsLoading(false);
        setIsError(false);
      } catch (err) {
        console.log("the page is not found", err);
        setIsError(true);
      }
    };
    fetchPlaces();
  }, [setIsError, setIsLoading, itemToDelete]);
  return (
    <DeletePage>
      <SearchNav>
        {isLoading && !isError && (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        <h1>Which place do you want to delete?</h1>
        <PlacesMenu>
          {arrayData.map((place) => {
            return (
              <PlaceTitle onClick={DeletItem} key={place.id} id={place.id}>
                {place.name}
              </PlaceTitle>
            );
          })}
        </PlacesMenu>
      </SearchNav>
    </DeletePage>
  );
}
