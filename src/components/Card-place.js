import { useState, useEffect, useContext } from "react";
import { SaveOptionContext } from "./StateContext";

import { PlaceContent, Card, Title, DisplayOption } from "../style";

export default function CardPlace(props) {
  const { setIsLearn, setDeletFeatuer, deletFeatuer } =
    useContext(SaveOptionContext);
  return (
    <Card background={props.background}>
      <Title> {props.title}</Title>
      <DisplayOption>
        {deletFeatuer === "To delete" ? (
          <PlaceContent id={props.id} onClick={props.LearnMore}>
            learn more
          </PlaceContent>
        ) : (
          <PlaceContent id={props.id} onClick={props.deleteSave}>
            delete
          </PlaceContent>
        )}

        <PlaceContent id={props.id} onClick={props.SaveItem}>
          {props.saveOption}
        </PlaceContent>
      </DisplayOption>
    </Card>
  );
}
