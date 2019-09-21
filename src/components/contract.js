import Portis from "@portis/web3";
import Web3 from "web3";

const portis = new Portis("9928268e-3ccb-4ac4-a8d8-3fc01ec39196", "ropsten");

const web3 = new Web3(portis.provider);

var abi = [
  {
    constant: false,
    inputs: [],
    name: "cancle",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "n",
        type: "string"
      }
    ],
    name: "deposit",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "string",
        name: "hash",
        type: "string"
      },
      {
        internalType: "string",
        name: "sign",
        type: "string"
      }
    ],
    name: "storeSign",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "uint256",
        name: "balence",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "start",
        type: "uint256"
      },
      {
        internalType: "string",
        name: "nm",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "escrow",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "fund",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "add",
        type: "address"
      }
    ],
    name: "getAccountName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "hash",
        type: "string"
      }
    ],
    name: "getSign",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "getTotalAccounts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "gotAccount",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    name: "hashaccounts",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];

var con = new web3.eth.Contract(
  abi,
  "0xc01610b806337d4dfbb7ad0bbc8fa7a27911bac2"
);

export default con;
