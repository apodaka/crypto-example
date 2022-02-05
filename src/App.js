import "./styles.css";
// import CryptoJS from 'crypto-js/aes';
import crypto from "crypto";

const obj = {
  persona: {
    nombre: "Erubiel",
    apellido: "Apodaca",
    website: "http://localhost/MainPage?var=1&var=2"
  }
};

const def_options = {
  algoritm: "aes-128-cbc",
  password: "P4swO0rd!"
};

const encripter = {
  val: null,
  password: "CONTRASEÑA",
  algoritm: "sha256",
  encrypt: null,
  decrypt: null,
  data: [],
  configure(options = {}) {
    const opt = {
      ...def_options,
      ...(options && Object.keys(options).length > 0 ? options : {})
    };
    this.algoritm = opt.algoritm;
    this.password = opt.password;
    this.encrypt = crypto.createCipher(options.algoritm, options.password);
    this.decrypt = crypto.createDecipher(options.algoritm, options.password);
    return this;
  },
  cypher(data = null) {
    const validTypes = ["string", "object", "number"];
    if (
      this.encrypt !== null &&
      (validTypes.includes(typeof data) || Object.is)
    ) {
      const thisValue = typeof val !== "string" ? JSON.stringify(data) : data;
      const mystr = this.encrypt.update(thisValue, "utf8", "hex");
      const final = this.encrypt.final("hex");
      this.data.push({
        initial: mystr,
        final: final,
        hash: "" + mystr + final
      });
      return this;
    }
  },
  get getLast() {
    if (this.data.length > 0) {
      return this.data[this.data.length - 1];
    }
    return null;
  },
  get getFirst() {
    if (this.data.length > 0) {
      return this.data[0];
    }
    return null;
  },
  decypher(txtEncrypted = "") {},
  set update(val) {
    let thisValue = typeof val !== "string" ? JSON.stringify(val) : val;
    // this.crypt.update(val, 'utf8', 'hex')
  }
};
const useAlgoritm = (data = null, options = {}) => {
  const mykey = crypto.createCipher(options.algoritm, "mypassword");
  let mystr = mykey.update("abc", "utf8", "hex");
  mystr += mykey.final("hex");
  return mystr;
};

export default function App() {
  return (
    <div className="App">
      <h2>Objeto sin encriptar</h2>
      <pre>{JSON.stringify(obj, null, 2)}</pre>
      <h4>Encriptar con cypher</h4>
      <div></div>
    </div>
  );
}
