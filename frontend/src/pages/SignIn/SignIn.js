import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  ButtonPadding,
  Input,
  InfoSec,
  InfoRow,
  InfoColumn,
  TextWrapper,
  TopLine,
  Heading,
  Subtitle,
  ImgWrapper,
  Img,
} from "../../components/Elements/Elements";

const SignIn = ({ login, setLogin, CookieService, setUpdateInfo, setAuth }) => {
  const history = useHistory();

  function verifyCredentials(username, password) {
    const authorization = "Basic " + window.btoa(username + ":" + password);
    const payload = { 
      params: { username: username },
      headers: { authorization: authorization } 
    };
    axios
      .get("http://localhost:8080/api/users/search/findByUsername", payload)
      .then((response) => {
        if (response.status === 200) {
          setLogin("Successful");
          CookieService.set("authorization", authorization);
          const basicUserDetails = {
            username: response.data.username,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            role: response.data.role,
          };
          CookieService.set("userDetails", basicUserDetails);
          setAuth(basicUserDetails);
          setUpdateInfo(true);
        } else {
          setLogin("Unsuccessful");
        }
      })
      .catch((err) => {
        console.log(err);
        setLogin("Unsuccessful");
      });
  }

  //Displays message above login button whether login was succesful or not
  // if credenials are correct,
  // document.getElementById('loginMessageID').innerHTML = "Login in succesful"; //This displays "Login in succesful" above the login button
  // else
  // document.getElementById('loginMessageID').innerHTML = "Login failed. Invalid username or password"; //This displays "Login failed. Invalid username or password" above the login button
  function LoginSuccess(props) {
    const isLoggedIn = props.isLoggedIn;
    if (login === "Not Attempted") {
      return <Subtitle>Not attempted</Subtitle>;
    } else if (login === "Unsuccessful") {
      return <Subtitle>Sign In Un-Successful</Subtitle>;
    }
    return <Subtitle></Subtitle>;
  }

  useEffect(() => {
    //TODO redirect if login is successful
    if (login === "Successful") {
      history.push("/roster/start");
    }
  }, [login]);

  const handleKeyPress = (event, type) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      if (type === "Username") {
        document.getElementById("passwordInput").focus();
      }

      if (type === "Password") {
        verifyCredentials(
          document.getElementById("usernameInput").value,
          document.getElementById("passwordInput").value
        );
      }
    }
  };

  return (
    <>
      <InfoSec lightBg="true">
        <Container>
          <InfoRow imgStart="start">
            <InfoColumn>
              <TextWrapper>
                <TopLine lightTopLine="true">Sign In</TopLine>
                <Heading lightText={false}>
                  Sign in to acess the schedule
                </Heading>
                <Input
                  type="text"
                  placeholder="Username"
                  id="usernameInput"
                  autoFocus="autofocus"
                  onKeyPress={(e) => handleKeyPress(e, "Username")}
                />
                <div />
                <Input
                  type="text"
                  type="password"
                  placeholder="Password"
                  id="passwordInput"
                  onKeyPress={(e) => handleKeyPress(e, "Password")}
                />
                <p className="loginMessage" id="loginMessageID"></p>
                <Link to="/sign-up">
                  <Button big fontBig primary="true">
                    {"Sign Up"}
                  </Button>
                </Link>
                <ButtonPadding
                  big
                  fontBig
                  primary="true"
                  className="loginButton"
                  onClick={() =>
                    verifyCredentials(
                      document.getElementById("usernameInput").value,
                      document.getElementById("passwordInput").value
                    )
                  }
                >
                  Sign In
                </ButtonPadding>
                <LoginSuccess isLoggedIn={login} />
              </TextWrapper>
            </InfoColumn>
            <InfoColumn>
              <ImgWrapper start="start">
                <Img src={require("../../images/workout.svg").default} />
              </ImgWrapper>
            </InfoColumn>
          </InfoRow>
        </Container>
      </InfoSec>
    </>
  );
};

export default SignIn;