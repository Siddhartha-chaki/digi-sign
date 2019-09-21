import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import con from "./contract";
import Portis from "@portis/web3";

const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");
class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet_add: "",
      name: ""
    };
  }
  async componentDidMount() {
    await this.setState({
      //    wallet_add: this.props.location.state[0].wallet_add
      wallet_add: sessionStorage.getItem("LoggedUser")
    });
  }
  onDepositeClick = async e => {
    if (this.state.name != "") {
      e.preventDefault();
      var candidateAddress = await portis.provider.enable();
      var x = con.methods
        .deposit(this.state.name)
        .send({ from: this.state.wallet_add, value: 5 });
      console.log(x);
    } else {
      alert("please enter name");
    }
  };
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onRegisterClick = () => {
    this.props.history.push("/sign", [this.state]);
  };
  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" textAlign="center">
              Register your name with depositing funs which can be rufunded one
              year later
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  required
                  fluid
                  type="text"
                  name="name"
                  value={this.state.name}
                  icon="user"
                  iconPosition="left"
                  placeholder="Your Name"
                  onChange={this.onHandleChange}
                />
                <Button
                  onClick={this.onDepositeClick}
                  color="black"
                  fluid
                  size="large"
                >
                  Deposite
                </Button>

                <Button
                  onClick={this.onRegisterClick}
                  color="black"
                  fluid
                  size="large"
                >
                  Register
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default CreateAccount;
