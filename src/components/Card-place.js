import { useContext } from "react";
import { SaveOptionContext } from "./StateContext";
import { Button } from "../style/Submit";
import { Card, Title, DisplayOption } from "../style";

export default function CardPlace(props) {
  const { deletFeatuer } = useContext(SaveOptionContext);
  const currentUserName = localStorage.getItem("logIn");
  return (
    <Card background={props.background}>
      <Title> {props.title}</Title>
      <DisplayOption>
        {deletFeatuer === "To delete" ? (
          <Button id={props.id} onClick={props.LearnMore}>
            learn more
          </Button>
        ) : (
          <Button id={props.id} onClick={props.deleteSave}>
            delete
          </Button>
        )}

        {!props.saveOption && currentUserName !== "" && (
          <Button id={props.id} onClick={props.SaveItem}>
            {props.isSaved ? "Saved!" : "Save"}
          </Button>
        )}
      </DisplayOption>
    </Card>
  );
}
