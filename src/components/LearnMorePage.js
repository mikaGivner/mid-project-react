import { useState, useContext } from "react";
import {
  WrapperLearn,
  InsideLearn,
  Theabout,
  Submit,
  ContentLearn,
} from "../style";

import { SaveOptionContext } from "./StateContext";
export default function LearnMore({ about, placeTitle }) {
  const { setIsLearn, isLoading } = useContext(SaveOptionContext);
  function CloseLearn() {
    setIsLearn(false);
  }

  return (
    <WrapperLearn>
      {isLoading ? (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <InsideLearn>
          <Theabout>{placeTitle}</Theabout>
          <ContentLearn>{about}</ContentLearn>
          <Submit onClick={CloseLearn}>back</Submit>
        </InsideLearn>
      )}
    </WrapperLearn>
  );
}
