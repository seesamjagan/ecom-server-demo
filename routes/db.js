
let pNames = [
    "hen",
    "arrow",
    "peacock",
    "bulb",
    "fan",
    "laptop",
    "desktop",
    "mobile phone",
    "cell phone",
    "charger",
    "raspburry pi",
    "light",
    "toys",
    "gun",
    "bomb",
    "tanker",
    "rpg",
    "granide",
    "ump 9",
    "sun glass"
  ];
  let cos = ["kumaran", "kandan", "velan", "murugan"];
  let products = [];
  
  let pnl = pNames.length;
  let cl = cos.length;
  let name;
  for (let i = 0; i < 100; i++) {
    name = cos[i % cl] + " " + pNames[i % pnl];
    products.push({
      id: i,
      name: name,
      desc: `This is "Product ${name}"'s description`,
      unitPrice: Number((Math.random() * 2500 + 500).toFixed(2)),
      stock: Number((Math.random() * 90 + 10).toFixed(0)),
      url: [
        "https://picsum.photos/150?image=" + i,
        "https://picsum.photos/150?blur&image=" + i,
        "https://picsum.photos/150?gravity=east&image=" + i
      ]
    });
  }

  module.exports = products;