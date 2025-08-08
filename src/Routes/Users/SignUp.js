import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

// user must include { username, password, firstName, lastName, email }
function Signup({ handleSignUp }) {
  const navigate = useNavigate();
  const [passVis, setPassVis] = useState(false);
  const [error, setError] = useState();

  const [formData, setformData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const togglePassVis = () => {
    setPassVis(!passVis);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setformData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password.length < 5) {
      setError("Password must be at least 5 characters long");
      return;
    }

    try {
      handleSignUp(formData);
      navigate(`/`);
    } catch (err) {
      console.log("Backend Error:", err);
      setError(e.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="col-md-8 mx-auto my-4">
      <Card className="border rounded shadow-sm">
        <CardBody>
          <CardTitle className="font-weight-bold text-center fs-4 mb-3">
            SIGN UP
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                placeholder="Add First Name"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                placeholder="Add Last Name"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                placeholder="Add Username"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type={passVis ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                placeholder="Add Password"
                onChange={handleChange}
                required
              />
              <Button type="button" onClick={togglePassVis} className="mt-2">
                {passVis ? "Hide" : "Show"}
              </Button>
              {error && <div className="text-danger mt-2">{error}</div>}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                placeholder="Add Email"
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary" className="w-100 mt-3">
              Submit
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Signup;
