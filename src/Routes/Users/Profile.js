import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../App";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import NewBookApi from "../../NewBookApi";

function Profile({ onLoadComplete }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      console.log("LOADING PROFILE");
      try {
        const user = await NewBookApi.getUser(currentUser);
        setUserData(user);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        if (onLoadComplete) onLoadComplete();
        console.log("Complete Profile ");
      }
    }
    if (currentUser) fetchUser();
  }, [currentUser, onLoadComplete]);

  if (!userData) return null;

  return (
    <div className="col-md-8 mx-auto my-4">
      <Card className="border rounded shadow-sm">
        <CardBody>
          <CardTitle tag="h2" className="mb-4 text-center text-muted">
            Profile: {userData.username}
          </CardTitle>
          <CardText className="text-center text-muted mb-4">
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            <p>Email: {userData.email}</p>
          </CardText>
          <div className="text-center">
            <Link to={`/profile/edit/${userData.username}`}>
              <Button color="dark" outline>
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
