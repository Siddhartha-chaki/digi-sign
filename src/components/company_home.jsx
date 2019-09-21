import React, { Component } from "react";
import * as crypto from "crypto-js";
import Portis from "@portis/web3";
import Web3 from "web3";
import con from "./contract";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class CompanyHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      filehash: "no hash",
      account: "",
      signer_name: "",
      signature: ""
    };
    this.reqSignature = this.reqSignature.bind(this);
    this.uploadSignature = this.uploadSignature.bind(this);
    this.loadfile = this.loadfile.bind(this);
    // this.getSignature = this.getSignature.bind(this);
  }

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
        console.log("hash :" + h);
        this.setState({ filehash: h });
      };
      reader.readAsArrayBuffer(file);
      toast.success("hash calculation done");
    } else {
      alert("Please Select a file");
    }
  }

  async reqSignature() {
    const portis = new Portis(
      "0c8ddc0d-28e0-48c5-a5a5-175c6084646b",
      "ropsten"
    );
    const web3 = new Web3(portis.provider);
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts });
    console.log(accounts[0]);
    var acnm = await con.methods.getAccountName("" + accounts[0]).call();
    this.setState({ signer_name: "" + acnm });
    const messageHex =
      "0x" + new Buffer("" + this.state.filehash, "utf8").toString("hex");
    const signedMessage = await web3.currentProvider.send("personal_sign", [
      messageHex,
      accounts[0]
    ]);
    console.log(signedMessage);
    this.setState({ signature: signedMessage });
  }
  async uploadSignature() {
    console.log("signature :" + typeof this.state.signature);
    await con.methods
      .storeSign("" + this.state.filehash, "" + this.state.signature)
      .send({
        from: this.state.account[0]
      })
      .then(res => {
        toast.success(
          "transaction initiated please wait for getting completed"
        );
        console.log(res);
      });
  }
  render() {
    return (
      <div>
        <div class="form-group">
          <p>Account :{"" + this.state.account}</p>
          <p>Signer Name :{this.state.signer_name}</p>
          <input type="file" name="myFile" onChange={this.loadfile} />
          <p>Hash :{"" + this.state.filehash}</p>
          <button onClick={this.reqSignature}>Sign</button>

          <p>Signature :{this.state.signature}</p>
          <button onClick={this.uploadSignature}>Upload signature</button>
        </div>
      </div>
    );
  }
}

export default CompanyHome;
