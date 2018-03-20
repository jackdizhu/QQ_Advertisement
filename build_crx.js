const fs = require("fs")
const ChromeExtension = require("crx")

const crx = new ChromeExtension({
  codebase: "http://localhost:8000/jack_Chrome_AD.crx",
  privateKey: fs.readFileSync("./jack_Chrome_AD_crx/jack_Chrome_AD.pem")
})

crx.load("./jack_Chrome_AD")
  .then(crx => crx.pack())
  .then(crxBuffer => {
    const updateXML = crx.generateUpdateXML()
    fs.writeFile(("./update.xml"), updateXML)
    fs.writeFile(("./jack_Chrome_AD/jack_Chrome_AD.crx"), crxBuffer)
  })
