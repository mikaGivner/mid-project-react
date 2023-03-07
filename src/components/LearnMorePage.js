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
      <Theabout>{placeTitle}</Theabout>
      <ContentLearn>{about}</ContentLearn>
      <Submit onClick={CloseLearn}>back</Submit>
    </InsideLearn>
  );
}
