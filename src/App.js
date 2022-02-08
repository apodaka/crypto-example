import "./styles.css";
import AES from 'crypto-js/aes';
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import produce from "immer";

const obj = {
  persona: {
    nombre: "Erubiel",
    apellido: "Apodaca",
    website: "http://localhost/MainPage?var=1&var=2"
  }
};

const JSONData = {"email":"sol@sol.com","name":"Sham","simulationId":"cf343256-4fc6-4628-b035-64244fdc56aa","creditType":"REAL_ESTATE","phoneNumber":"5531087743","leadId":"DEV0000005048","redirectVerification":"www.ion.com","source":"PARTNER_HOMIE"}



const encrypter = {
  val: null,
  password: "",
  algoritm: "",
  encrypt: null,
  decrypt: null,
  inputEncoding: "utf8",
  outputEncoding: "hex",
  init: false,
  default: {
    configure: {
      algoritm: "aes-128-cbc",
      password: "P4swO0rd!",
      inputEncoding: "utf8",
      outputEncoding: "hex"
    }
  },
  data: [],
  configure(options = {}) {
    const opt = {
      ...this.default.configure,
      ...(options && Object.keys(options).length > 0
        ? {
            ...this.default.configure,
            ...options
          }
        : {})
    };
    this.algoritm = opt.algoritm;
    this.password = opt.password;
    this.encrypt = crypto.createCipher(opt.algoritm, opt.password);
    this.decrypt = crypto.createDecipher(opt.algoritm, opt.password);
    this.init = true;
    return this;
  },
  cypher(data = null) {
    const validTypes = ["string", "object", "number"];
    if (
      this.init &&
      this.encrypt !== null &&
      (validTypes.includes(typeof data) ||
        Object.getPrototypeOf(data) === Object.prototype)
    ) {
      const thisValue =
        Object.getPrototypeOf(data) === Object.prototype || Array.isArray(data)
          ? JSON.stringify(data)
          : data;
      let mystr = this.encrypt.update(
        thisValue,
        this.inputEncoding,
        this.outputEncoding
      );
      mystr += this.encrypt.final(this.outputEncoding);
      const body = {
        encrypted: mystr,
        id: uuidv4()
      };
      this.data.push(body);
      this.val = body;
      return this;
    }
    return this;
  },
  get getLast() {
    return this.data.length > 0 && this.init
      ? this.data[this.data.length - 1]
      : null;
  },
  get getFirst() {
    if (!this.init) return this;
    return this.data.length > 0 && this.init ? this.data[0] : null;
  },
  decypher(txtCypher = "") {
    var mystr = this.decrypt.update(
      txtCypher,
      this.outputEncoding,
      this.inputEncoding
    );
    mystr += this.decrypt.final(this.inputEncoding);
    const body = {
      decrypted: mystr,
      id: uuidv4()
    };
    this.data.push(body);
    this.val = body;
    return this;
  },
  get value() {
    return this.val;
  }
};

const useCyptoExample = (data = null, options = {}) => {
  const encrypt = encrypter.configure();
  const { encrypted } = encrypt.cypher(obj).getLast;
  const { decrypted } = encrypt.decypher(encrypted).value;
  console.log("Encrypted", encrypter);
  console.log("Decrypted", JSON.parse(decrypted));
  let objPersona = JSON.parse(decrypted);
  objPersona = Object.assign({}, objPersona.persona, {
    website: decodeURIComponent(objPersona.persona.website)
  });
  console.log("Objeto decifrado y url formateada!", objPersona);
};

const useCryptoJSExample = () => {
  const newObj = produce(obj, (draft) => {
    // const formatedUrl = draft.persona.website;
    draft.persona.website = encodeURIComponent(draft.persona.website)
  })
  const password = 'P4swO0rd!';
  const hash = AES.encrypt(JSON.stringify(JSONData, null, 2), password)

  console.log('Crypto-JS AES.encrypt hash', hash)
  const { decrypted } = encrypter.configure().decypher(hash).value;
}

export default function App() {
  useCyptoExample();
  useCryptoJSExample();
  return (
    <div className="App">
      <h2>Objeto sin encriptar</h2>
      <pre>{JSON.stringify(obj, null, 2)}</pre>
      <h4>Elemento encryptado</h4>
    </div>
  );
}
