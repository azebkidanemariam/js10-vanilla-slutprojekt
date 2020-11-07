let maltLiContent = `Name: ${malt.name} Amount: ${malt.amount.value} ${malt.amount.unit}`
let ingridients = {
  malt: [
    {
      name: "Extra Pale",
      amount: {
        value: 3,
        unit: "kilograms",
      },
    },
    {
      name: "Wheat",
      amount: {
        value: 2,
        unit: "kilograms",
      },
    },
    {
      name: "Dark Crystal",
      amount: {
        value: 0.08,
        unit: "kilograms",
      },
    },
  ],
  hops: [
    {
      name: "Cascade",
      amount: {
        value: 6,
        unit: "grams",
      },
      add: "start",
      attribute: "bitter",
    },
    {
      name: "Cascade",
      amount: {
        value: 6,
        unit: "grams",
      },
      add: "middle",
      attribute: "flavour",
    },
    {
      name: "Saaz",
      amount: {
        value: 12.5,
        unit: "grams",
      },
      add: "middle",
      attribute: "flavour",
    },
    {
      name: "Hersbrucker",
      amount: {
        value: 12.5,
        unit: "grams",
      },
      add: "middle",
      attribute: "flavour",
    },
  ],
  yeast: "Wyeast 3638 - Bavarian Wheat™",
};

