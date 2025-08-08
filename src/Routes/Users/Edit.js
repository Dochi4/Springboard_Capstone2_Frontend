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
import { useNavigate, useParams } from "react-router-dom";

function Edit({ handleEditUser }) {
  const { username } = useParams();
  console.log("username from useParams:", username);
  const navigate = useNavigate();
  const [passVis, setPassVis] = useState(false);

  const [formData, setformData] = useState({
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState(null);

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
    const { password, email } = formData;
    const errors = [];

    if (password.length < 5) {
      errors.push("Password must be at least 5 characters.");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Email format is invalid.");
    }
    if (errors.length > 0) {
      setError(errors.join(" "));
      return;
    }
    try {
      handleEditUser(username, formData);
      navigate(`/profile/${username}`);
    } catch (err) {
      console.error("Edit failed:", err);
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="col-md-8 mx-auto my-4">
      <Card className="border rounded shadow-sm">
        <CardBody>
          <CardTitle className="font-weight-bold text-center fs-4 mb-4">
            Edit {username} Profile
          </CardTitle>
          {error && <div className="text-danger mt-2">{error}</div>}
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

export default Edit;
