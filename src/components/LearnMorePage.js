import { useContext } from "react";
import { InsideLearn, Theabout, Submit, ContentLearn } from "../style";

import { SaveOptionContext } from "./StateContext";
export default function LearnMore({ about, placeTitle }) {
  const { setIsLearn } = useContext(SaveOptionContext);
  function CloseLearn() {
    setIsLearn(false);
  }

  return (
    <InsideLearn>
      <Theabout>
        <h1 style={{ color: "#fff" }}>{placeTitle}</h1>
      </Theabout>
      <ContentLearn>{about}</ContentLearn>
      <Submit onClick={CloseLearn}>back</Submit>
    </InsideLearn>
  );
}
