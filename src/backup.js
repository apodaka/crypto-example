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

const encrypter = {
  val: null,
  password: "CONTRASEÑA",
  algoritm: "sha256",
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
      ...this.defaults.configure,
      ...(options && Object.keys(options).length > 0 ? options : {})
    };
    this.algoritm = opt.algoritm;
    this.password = opt.password;
    this.encrypt = crypto.createCipher(options.algoritm, options.password);
    this.decrypt = crypto.createDecipher(options.algoritm, options.password);

    this.init = true;
    return {
      context: this
    };
  },
  cypher(data = null) {
    if (this.init) {
      const validTypes = ["string", "object", "number"];
      if (
        this.encrypt !== null &&
        (validTypes.includes(typeof data) ||
          Object.getPrototypeOf(data) === Object.prototype)
      ) {
        const thisValue = typeof val !== "string" ? JSON.stringify(data) : data;
        let mystr = this.encrypt.update(thisValue, "utf8", "hex");
        mystr += this.encrypt.final("hex");
        const body = {
          encrypted: mystr,
          id: "id_" + this.data.length
        };
        this.data.push(body);
        return body;
      }
    }
    return {
      context: this
    };
  },
  get getLast() {
    if (this.init) {
      if (this.data.length > 0 && this.configure !== null) {
        return this.data[this.data.length - 1];
      }
    }
    return {
      context: this
    };
  },
  get getFirst() {
    if (!this.init)
      return {
        context: this,
        message: "El cyfrado no se ha inicializado",
        data: null
      };
    return {
      context: this,
      data: this.data.length > 0 ? this.data[0] : []
    };
  },
  decypher(txtEncrypted = "") {
    if (typeof txtEncrypted === "string" && txtEncrypted.length > 0) {
      const encryptHashFounded = this.data.find(
        (item) => txtEncrypted === item.encrypted
      );
      if (typeof item === "undefined")
        return {
          context: tjhos
        };
      var mykey = crypto.createDecipher(this.algoritm, this.password);
      var mystr = mykey.update(
        encryptHashFounded.encrypted,
        this.outputEncoding,
        this.inputEncoding
      );
      mystr += mykey.final(this.outputEncoding);
      return mystr;
      // return cypherObjFound.encrypted
    }
  }
};

const useAlgoritm = (data = null, options = {}) => {
  encrypter.configure().cypher(obj).getLast();

  console.log("useAlgoritm:encrypter");
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
