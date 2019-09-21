import React, { Component } from "react";
import EthSigUtil from "eth-sig-util"; //for signature check
import { Document, Page } from "react-pdf"; //fro showing pdf
import { pdfjs } from "react-pdf"; //pdf componentes
import {
  Progress,
  Icon,
  Grid,
  Step,
  Segment,
  Container,
  List
} from "semantic-ui-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//hash calculation library
import crypto from "crypto-js";
//for smart contract call
import con from "./contract";
//setting the pdf render worker

class CertificateVerification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cert_hash: "",
      cert_signature: "",
      signature_signer_add: "",
      signature_signer_org: "",
      percent: 0
    };
    this.getSignatureSigner = this.getSignatureSigner.bind(this);
    this.loadfile = this.loadfile.bind(this);
  }

  increment = () =>
    this.setState(prevState => ({
      percent: prevState.percent >= 100 ? 0 : prevState.percent + 20
    }));

  loadfile(event) {
    let file = event.target.files[0];
    //console.log(file);
    // this.setState({ selectedFile: file, loaded: 0 });
    if (file) {
      var reader = new FileReader();
      reader.onload = () => {
        var uint = new Uint8Array(reader.result);
        var sha = crypto.algo.SHA256.create();
        for (var i = 0; i < uint.byteLength; i = i + 100000) {
          var c = String.fromCharCode.apply(null, uint.slice(i, i + 100000));
          sha.update(c);
        }
        var h = sha.finalize();
        console.log("hash in function:" + h);
        this.setState({ cert_hash: h + "" });
        toast.success("hash calculation done");
        this.increment();
        this.getFilesignature();
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please Select a file");
    }
  }

  getFilesignature = async () => {
    //this functino call smart contract for cerificate signatire
    console.log("hAAH " + this.state.cert_hash);
    var sig = await con.methods.getSign("" + this.state.cert_hash).call();
    console.log("Signature string :" + sig);
    if (sig == "") {
      this.setState({
        cert_signature: "No account related this file"
      });
    } else {
      this.setState({
        cert_signature: sig
      });
      this.increment();
      await this.getSignatureSigner();
    }
  };

  //setp 5 get the signer of the signature
  async getSignatureSigner() {
    var h = this.state.cert_hash;
    var s = this.state.cert_signature;
    console.log("hs " + h);
    console.log("sign :" + s);
    //this part will work when you provide this with valid signature and its returns signer address
    try {
      var singner_account_add = EthSigUtil.recoverPersonalSignature({
        data: String(h),
        sig: s
      });
    } catch (e) {
      console.log(e);
    }

    //"0x5ec74ed675a04c5752bb92ccf80d43eeabfe984a";//account address will be something like this
    console.log("signer :" + singner_account_add);
    this.setState({
      signature_signer_add: singner_account_add
    });
    console.log("signer :" + this.state.signature_signer_add);
    this.increment();
    await this.getSignerNamer();
  }

  //setp 6 get the company name from MYSQL using signer address +20%
  getSignerNamer = async () => {
    var acnm = await con.methods
      .getAccountName("" + this.state.signature_signer_add)
      .call();
    console.log("company Name :" + acnm);
    if (acnm == "") {
      this.setState({
        signature_signer_org: "No account present related to this address"
      });
    } else {
      this.setState({ signature_signer_org: acnm });
      this.increment();
      this.increment();
    }
  };

  render() {
    return (
      <div>
        <Container>
          <input type="file" name="myFile" onChange={this.loadfile} />
          <Segment>
            <Progress percent={this.state.percent} indicating />
          </Segment>
          <Container fluid>
            <Step.Group size="tiny" ordered>
              <Step completed={this.state.cert_hash != ""}>
                <Step.Content>
                  <Step.Title>Obtain cetificate Data and Hash</Step.Title>
                </Step.Content>
              </Step>

              <Step completed={this.state.cert_signature != ""}>
                <Step.Content>
                  <Step.Title>Obtain signarure</Step.Title>
                </Step.Content>
              </Step>

              <Step completed={this.state.signature_signer_org != ""}>
                <Step.Content>
                  <Step.Title>Fetch Signarure Organization</Step.Title>
                </Step.Content>
              </Step>
              <Step completed={this.state.signature_signer_org != ""}>
                <Step.Content>
                  <Step.Title>Final Result</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </Container>

          <br />
          <br />
          <List as="ul">
            <List.Item as="li">
              Certificate Hash(SHA256) :{this.state.cert_hash}
            </List.Item>
            <List.Item as="li">
              Digital Signature of Certificate :{this.state.cert_signature}
            </List.Item>
            <List.Item as="li">
              Organizations
              <List.List as="ul">
                <List.Item as="li">
                  Signature signer organization address :
                  {this.state.signature_signer_add}
                </List.Item>
                <List.Item as="li">
                  Signature signer organization name :
                  {this.state.signature_signer_org}
                </List.Item>
              </List.List>
            </List.Item>
          </List>
        </Container>
      </div>
    );
  }
}

export default CertificateVerification;
