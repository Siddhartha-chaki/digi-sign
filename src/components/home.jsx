import React, { Component } from "react";
import { Button, Container } from "semantic-ui-react";
import Portis from "@portis/web3";
import Web3 from "web3";
import con from "./contract";

const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallet_add: ""
    };
    this.onHandelClick = this.onHandelClick.bind(this);
  }
  async onHandelClick(addres) {
    console.log("wallet...............");
    console.log(addres);
    this.setState({
      wallet_add: addres
    });
    var status = await con.methods.gotAccount().call({ from: addres });
    if (status) {
      console.log("account already present");
      this.props.history.push("/sign", [this.state]);
    } else {
      console.log("account not created");
      this.props.history.push("/create_account", [this.state]);
    }
   
  }

  render() {
    return (
      <div>
        <Container>
          <Button
            fluid
            onClick={async () => {
              var candidateAddress = await portis.provider.enable();
              console.log(candidateAddress[0]);
              sessionStorage.setItem("LoggedUser", candidateAddress[0]);
              if (candidateAddress > 0) {
                this.onHandelClick(String(candidateAddress[0]));
              }
            }}
          >
            Sign Document
          </Button>
          <Button
            fluid
            primary
            onClick={() => {
              this.props.history.push("/verification", [this.state]);
            }}
          >
            Varify Signature
          </Button>
        </Container>
      </div>
    );
  }
}

export default Home;
