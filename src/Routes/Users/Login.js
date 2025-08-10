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
import Loading from "../Loading";

function Login({ handleLogin }) {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    username: "",
    password: "",
  });

  const [passVis, setPassVis] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await handleLogin(formData);
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      console.error("Login failed:", err);
      setError(err.response?.data?.error || "Invalid username or password.");
    }
  };

  return (
    <div className="col-md-8 mx-auto my-4">
      <Card className="border rounded shadow-sm">
        <CardBody>
          {isLoading && <Loading context={`Loging In: ${formData.username}`} />}
          <CardTitle className="font-weight-bold text-center fs-4 mb-3">
            LOG IN
          </CardTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                placeholder="Enter Username"
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
                placeholder="Enter Password"
                onChange={handleChange}
                required
              />
              <Button type="button" onClick={togglePassVis} className="mt-2">
                {passVis ? "Hide" : "Show"}
              </Button>
              {error && <div className="text-danger mt-2">{error}</div>}
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

export default Login;
