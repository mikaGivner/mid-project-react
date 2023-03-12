import { Card, Title } from "../style";
export default function DemoCard(props) {
  return (
    <Card background={props.background}>
      <Title> {props.title}</Title>
    </Card>
  );
}
