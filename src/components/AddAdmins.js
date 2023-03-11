import { useEffect, useContext, useState } from "react";
import { DeletePage, SearchNav, PlacesMenu, PlaceTitle } from "../style";
import axios from "axios";
import { SaveOptionContext } from "./StateContext";
export default function AddAdmins() {
  const { isError, setIsError, isLoading, setIsLoading } =
    useContext(SaveOptionContext);
  const [arrayData, setArrayData] = useState([]);
  const [newAdminAdded, setNewAdminAdded] = useState("");
  const NewAdmin = async (e) => {
    try {
      setIsLoading(true);
      await axios.put(
        `https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/users/${e.target.id}`,
        { isAdmin: true }
      );
      setNewAdminAdded(e.target.id);
      setIsLoading(false);
      setIsError(false);
    } catch (err) {
      console.log("the page is not found", err);
      setIsError(true);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const showusers = await axios.get(
          "https://63fcb7158ef914c5559dbaa5.mockapi.io/api/sa1/users"
        );
        setArrayData(showusers.data);

        setIsLoading(false);
        setIsError(false);
      } catch (err) {
        console.log("the page is not found", err);
        setIsError(true);
      }
    };
    fetchUsers();
  }, [setIsError, setIsLoading, newAdminAdded]);
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
        <h1>Which user do you want to make admin</h1>
        <PlacesMenu>
          {arrayData.map((user) => {
            if (!user.isAdmin) {
              return (
                <PlaceTitle key={user.id} id={user.id} onClick={NewAdmin}>
                  {user.userName}
                </PlaceTitle>
              );
            } else return false;
          })}
        </PlacesMenu>
      </SearchNav>
      <SearchNav>
        <h1>users have already admins:</h1>

        {arrayData.map((user) => {
          if (user.isAdmin) {
            return (
              <p style={{ color: " #f9f9f9" }} key={user.id} id={user.id}>
                {user.userName}
              </p>
            );
          } else return false;
        })}
      </SearchNav>
    </DeletePage>
  );
}
