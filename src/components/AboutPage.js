import { AboutTitle, AboutContent } from "../style";
import "./style.css";
export default function AboutPage() {
  return (
    <AboutTitle>
      <h1>How We Are?</h1>
      <AboutContent>
        <p>
          {" "}
          Tripo helps you easily and quickly find a place to travel. Just choose
          a region and events for your trip and you will get all the places that
          suit you.
        </p>
        <p>
          Wanna save favorite places? Got an amazing place to share with us?
          Sign up and join us and you can enjoy all this!{" "}
        </p>
      </AboutContent>
      <h1>Our Idea</h1>
      <AboutContent>
        <p>
          The idea behind it - choosing places according to appearance and
          suitability for the trip we are looking for - without a long and
          unnecessary word.
        </p>
        <p>
          By clicking on a place that looks good to you - you can learn a little
          more about it if you liked what you read and want to go to this place
          in the future - you can save it in your favorites (if you are
          registered of course). Now there is no need to worry - because the
          next time you enter the application you can easily reach all the
          places you liked.
        </p>
        <p>
          And most importantly - we at "Trifo" believe in sharing and the
          knowledge of the masses. You can share the places you've been and
          other people can see them and even save them.
        </p>
        <p>So go ahead - go find your next trip...</p>
      </AboutContent>
    </AboutTitle>
  );
}
