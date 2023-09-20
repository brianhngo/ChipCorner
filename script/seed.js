"use strict";

const {
  db,
  models: { User },
} = require("../server/db");
const Chips = require("../server/db/models/Chips");

//title, description,size,baked or not baked, ingrediants,nutrional

const chips = [
  //lays brand chips
  {
    price: 4.98,
    title: `LAY'S Classic Potato Chips`,
    description: `It all starts with farm-grown potatoes, cooked and seasoned to perfection. So every LAY'S potato chip is perfectly crispy and full of fresh potato taste. Happiness in Every Bite.`,
    brand: `LAY'S`,
    size: 15,
    baked: false,
    ingredients: `Potatoes, Vegetable Oil (Canola, Corn, Soybean, and/or Sunflower Oil), and Salt.`,
    imageUrl: `https://www.lays.com/sites/lays.com/files/2020-11/lays-Classic-small.jpg`,
  },
  {
    price: 4.98,
    title: `LAY'S BBQ Flavored Potato Chips`,
    description: `It all starts with farm-grown potatoes, cooked and seasoned to perfection. Then we add the spicy sweetness of BBQ sauce. So every LAY'S potato chip is perfectly crispy and delicious. Happiness in Every Bite.`,
    brand: `LAY'S`,
    size: 15,
    baked: false,
    ingredients: `Potatoes, Vegetable Oil (Canola, Corn, Soybean, and/or Sunflower Oil), and Salt, Barbecue Seasoning (Sugar, Dextrose, Salt, Maltodextrin [Made From Corn], Molasses, Torula Yeast, Onion Powder, Spices, Tomato Powder, Paprika, Natural Flavors, Corn Starch, Caramel Color, Yeast Extract, Paprika Extract, Garlic Powder, and Mustard Seed Oil).`,
    imageUrl: `https://www.lays.com/sites/lays.com/files/2020-11/lays-bbq.jpg`,
  },
  {
    price: 4.98,
    title: `LAY'S Baked Original Potato Crisps`,
    description: `Light, crispy, crunch sprinkled with sea salt. 65% less fat. Say hello to crunchy goodness.`,
    brand: `LAY'S`,
    size: 15,
    baked: true,
    ingredients: `Dried Potatoes, Corn Starch, Corn Oil, Sugar, Sea Salt, Soy Lecithin, Dextrose, And Annatto Extracts. Contains Soy Ingredients.`,
    imageUrl: `https://www.lays.com/sites/lays.com/files/2022-08/0.01%20LAYS%20BAKED%20ORIGINAL%20%281%29.png`,
  },
  {
    price: 4.98,
    title: `LAY'S Baked BBQ Flavored Potato Crisps`,
    description: `Smoky BBQ Taste? Oh yeah! Made with all the tasty BBQ flavor you love and 65% less fat. Consider it a win-win for BBQ fans everywhere.`,
    brand: `LAY'S`,
    size: 15,
    baked: true,
    ingredients: `Dried Potatoes, Corn Starch, Corn Oil, Sugar, Salt, Soy Lecithin, Onion Powder, Maltodextrin (Made From Corn), Dextrose, Brown Sugar, Molasses, Spices, Fructose, Tomato Powder, Garlic Powder, Yeast, Soybean Oil, Natural Flavors (Contains Milk), Sunflower Oil, Paprika, Acacia Gum, Paprika Extracts, Annatto Extracts, And Caramel Color. Contains Milk And Soy Ingredients.`,
    imageUrl: `https://www.lays.com/sites/lays.com/files/2022-08/0.02%20BAKED%20BBQ%20%281%29.png`,
  },
  {
    price: 4.98,
    title: `LAY'S Sour Cream & Onion Flavored Potato Chips`,
    description: `It all starts with farm-grown potatoes, cooked and seasoned to perfection. Then we add the tang of sour cream and mild onions. So every LAY'S potato chip is perfectly crispy and delicious. Happiness in Every Bite.`,
    brand: `LAY'S`,
    size: 15,
    baked: false,
    ingredients: `Potatoes, Vegetable Oil (Sunflower, Corn and/or Canola Oil), Sour Cream & Onion Seasoning (Skim Milk, Salt, Maltodextrin[Made from Corn], Onion Powder, Whey, Sour Cream[Cultured Cream, Skim Milk], Canola Oil, Parsley, Natural Flavor, Lactose, Sunflower Oil, Citric Acid, Whey Protein Concentrate and Buttermilk). Contains Milk Ingredients.`,
    imageUrl: `https://www.lays.com/sites/lays.com/files/2020-11/sour-cream.jpg`,
  },

  // doritos
  {
    price: 5.38,
    title: `DORITOS Nacho Cheese `,
    description: `Whether you're looking to dive into this snacking experience on its own, or go ahead & own your snack-time by dipping them into a salsa or dip flavor of your choice. Snack on fun boldly with this shareable bag from Doritos; where there's a flavor filled crunchy experience that's in store for everyone!`,
    brand: `Doritos`,
    size: 15,
    baked: false,
    ingredients: `Corn, Vegetable Oil (Corn, Canola, And/or Sunflower Oil), Maltodextrin (Made From Corn), Salt, Cheddar Cheese (Milk, Cheese Cultures, Salt, Enzymes), Whey, Monosodium Glutamate, Buttermilk, Romano Cheese (Part-skim Cow's Milk, Cheese Cultures, Salt, Enzymes), Whey Protein Concentrate, Onion Powder, Corn Flour, Natural And Artificial Flavor, Dextrose, Tomato Powder, Lactose, Spices, Artificial Color (Yellow 6, Yellow 5, And Red 40), Lactic Acid, Citric Acid, Sugar, Garlic Powder, Skim Milk, Red And Green Bell Pepper Powder, Disodium Inosinate, And Disodium Guanylate.`,
    imageUrl: `https://www.doritos.com/sites/doritos.com/files/2018-08/new-nacho-cheese.png`,
  },
  {
    price: 5.38,
    title: `DORITOS COOL RANCH`,
    description: `Doritos Cool Ranch flavored tortilla chips are packed with big, bold flavor. Experience a burst of tanginess with hints of onion, garlic, tomato and spice merging together in a bold creamy, cool ranch blend. Doritos Tortilla Chips are the universal language of awesome, grab a bag and stock up on bold taste.`,
    brand: `Doritos`,
    size: 15,
    baked: false,
    ingredients: `Corn, Vegetable Oil (Corn, Canola, And/or Sunflower Oil), Maltodextrin (Made From Corn), Salt, Tomato Powder, Lactose, Whey, Skim Milk, Onion Powder, Sugar, Garlic Powder, Monosodium Glutamate, Maltodextrin (Made From Corn), Cheddar Cheese (Milk, Cheese Cultures, Salt, Enzymes), Dextrose, Malic Acid, Corn Syrup Solids, Buttermilk, Natural and Artificial Flavors, Sodium Acetate, Artificial Color (Red 40, Blue 1, Yellow 5), Spice, Citric Acid, Disodium Inosinate, and Disodium Guanylate.`,
    imageUrl: `https://www.doritos.com/sites/doritos.com/files/2020-06/%28medium%29%20Cool%20Ranch%20XXL%20no%20background.png`,
  },
  {
    price: 5.38,
    title: `DORITOS Spicy Sweet Chili`,
    description: `Add a bold, delicious crunch to snack time with Doritos Sweet Chili Chips. Whether you're having a family barbecue or watching a movie, you'll love the sweet and spicy taste these Dorito chips bring to your taste buds. Enjoy with French onion dip or your other favorite dip for a little extra flavor.`,
    brand: `Doritos`,
    size: 15,
    baked: false,
    ingredients: `Corn, Vegetable Oil (Corn, Canola, and/or Sunflower Oil), Salt, Sugar, Monosodium Glutamate, Fructose, Sodium Diacetate, Soy Sauce (Soybean, Wheat, Salt), Onion Powder, Maltodextrin (Made from Corn), Hydrolyzed Soy Protein, Hydrolyzed Corn Protein, Garlic Powder, Torula Yeast, Malic Acid, Extractives of Paprika, Spices, Caramel Color, Disodium Inosinate, Disodium Guanylate, Dextrose, and Natural Flavor.`,
    imageUrl: `https://www.doritos.com/sites/doritos.com/files/2018-08/new-sweet-chili.png`,
  },
  {
    price: 5.38,
    title: `DORITOS Spicy Nacho`,
    description: `If you're up to the challenge, grab a bag of DORITOS tortilla chips and get ready to make some memories you won't soon forget. Bursting with a rich blend of spices and cheese, Doritos Spicy Nacho flavored tortilla chips create a bold snacking experience. Doritos Spicy Nacho chips pack a unique blend of cheesiness and hit of spice that combine for an unforgettable kick-in-the-mouth flavor.`,
    brand: `Doritos`,
    size: 15,
    baked: false,
    ingredients: `Corn, Vegetable Oil (Sunflower, Corn, and/or Canola Oil), Maltodextrin (Made from Corn), Salt, Whey, Monosodium Glutamate, Buttermilk, Romano Cheese (Cow's Milk, Cheese Cultures, Salt, Enzymes), Corn Starch, Onion Powder, Garlic Powder, Dextrose, Natural and Artificial Flavor, Spices, Lactose, Sodium Caseinate, Artificial Color (Including Yellow 6 Lake, Red 40 Lake, Yellow 6, Red 40, Yellow 5, Blue 1), Citric Acid, Sugar, Lactic Acid, Skim Milk, Disodium Inosinate and Disodium Guanylate.`,
    imageUrl: `https://www.doritos.com/sites/doritos.com/files/2018-08/new-spicy-nacho.png`,
  },
  {
    price: 5.38,
    title: `NEW! DORITOS SWEET & TANGY BBQ`,
    description: `Introducing NEW DORITOS Tangy Sweet BBQ, a bold flavor experience that amplifies traditional BBQ sauce with sweetness, complex spices and tanginess for a bold twist on a classic. You've tried BBQ chips but none like this.`,
    brand: `Doritos`,
    size: 15,
    baked: false,
    ingredients: `Corn, Vegetable Oil (Corn, Canola, and/or Sunflower Oil), Sugar, Sodium Diacetate, Tomato Powder, Salt, Dextrose, Onion Powder, Spices, Monosodium Glutamate, Molasses, Yeast Extract, Paprika, Sodium Acetate, Maltodextrin (Made from Corn), Corn Syrup Solids, Artificial Color (Yellow 6 Lake, Red 40 Lake, Blue 2 Lake), Garlic Powder, Malic Acid, Natural Flavors (Including Milk), Disodium Inosinate, and Disodium Guanylate.`,
    imageUrl: `https://www.doritos.com/sites/doritos.com/files/2023-02/DORITOS%20BBQ%20%281%29.png`,
  },

  //Pringles
  {
    price: 2.24,
    title: `PRINGLES ORIGINAL CRISPS`,
    description: `When you're an original, you set the standard for how it’s done. And with the tantalizing taste of potato you'll be taking this gold standard all the way to the flavor bank. It's the one salty snack that hits the spot every time.`,
    brand: `Pringles`,
    size: 5,
    baked: false,
    ingredients: `Dried potatoes, vegetable oil (corn, cottonseed, high oleic soybean, and/or sunflower oil), degerminated yellow corn flour, cornstarch, rice flour, maltodextrin, mono- and diglycerides, salt, wheat starch.`,
    imageUrl: `https://images.kglobalservices.com/www.pringles.com_us/en_us/product/product_1896199/prod_img-1380142_favs-orig.png`,
  },
  {
    price: 2.24,
    title: `PRINGLES HARVEST BLENDS SWEET POTATO SMOKY BBQ`,
    description: `Smoky BBQ flavor blends with the sweetness from the sweet potato infused base to create a smoky savory flavor worthy of a backyard barbeque.`,
    brand: `Pringles`,
    size: 5,
    baked: false,
    ingredients: `Dried potatoes, vegetable oil (corn, cottonseed, high oleic soybean, and/or sunflower oil), degerminated yellow corn flour, cornstarch, rice flour, maltodextrin, sugar, mono- and diglycerides. Contains 2% or less of salt, tomato powder, monosodium glutamate, citric acid, onion powder, spice, garlic powder, yeast extract, hydrolyzed corn protein, malted barley flour, malic acid, disodium inosinate, disodium guanylate, paprika extract color, natural flavors, whey, wheat starch.`,
    imageUrl: `https://images.kglobalservices.com/www.pringles.com_us/en_us/product/product_2289454/prod_img-3270327_smokeybbq.png`,
  },
  {
    price: 2.24,
    title: `PRINGLES SOUR CREAM & ONION CRISPS`,
    description: `The awesomeness of sour cream, onion and potato together can’t be measured by modern science. We’ve decided it’s simply a flavor combination nature intended and man perfected. We don’t question it. We’ll just keep making ’em, as long as you keep nomming ’em. `,
    brand: `Pringles`,
    size: 5,
    baked: false,
    ingredients: `Dried potatoes, vegetable oil (corn, cottonseed, high oleic soybean, and/or sunflower oil), degerminated yellow corn flour, cornstarch, rice flour, maltodextrin, mono- and diglycerides. Contains 2% or less of salt, whey, sour cream (cream, nonfat milk, cultures), monosodium glutamate, onion powder, coconut oil, dextrose, sugar, natural flavors, nonfat milk, citric acid, sodium caseinate, lactic acid, yeast extract, disodium inosinate, disodium guanylate, buttermilk, malic acid, invert sugar, cultured nonfat milk, cream, wheat starch.`,
    imageUrl: `https://images.kglobalservices.com/www.pringles.com_us/en_us/product/kic-32074/prod_img-1395490_favs-sco.png`,
  },
  {
    price: 2.24,
    title: `PRINGLES BBQ CRISPS`,
    description: `Snacking gets awesomer when you add the taste of BBQ to the mix. It’s the flavor that brings an outdoorsy vibe to any gathering, whether you're at home, picnicking or road tripping. Also, any chance to haul out your Australian accent and use the word “barbie” is a good thing. `,
    brand: `Pringles`,
    size: 5,
    baked: false,
    ingredients: `Dried potatoes, vegetable oil (corn, cottonseed, high oleic soybean, and/or sunflower oil), degerminated yellow corn flour, cornstarch, rice flour, maltodextrin, sugar, mono- and diglycerides. Contains 2% or less of salt, tomato powder, monosodium glutamate, citric acid, onion powder, spice, garlic powder, yeast extract, hydrolyzed corn protein, malted barley flour, malic acid, disodium inosinate, disodium guanylate, paprika extract color, natural flavors, whey, wheat starch.`,
    imageUrl: `https://images.kglobalservices.com/www.pringles.com_us/en_us/product/kic-32075/prod_img-1349541_favs-bbq.png`,
  },
  {
    price: 2.24,
    title: `PRINGLES SALT & VINEGAR CRISPS`,
    description: `The pucker factor is just one of the many reasons to love these crisps. We took a little vinegar, a touch of salt and lots of crunch to make a flavor explosion in your mouth. And when you're done puckering, you can make duck lips out of them, a Pringles® Salt & Vinegar bonus.`,
    brand: `Pringles`,
    size: 5,
    baked: false,
    ingredients: `Dried potatoes, vegetable oil (corn, cottonseed, high oleic soybean and/or sunflower oil), degerminated yellow corn flour, cornstarch, rice flour, maltodextrin, mono- and diglycerides, lactose. Contains 2% or less of salt, sodium diacetate, vinegar, dextrose, malic acid, turmeric color, wheat starch.`,
    imageUrl: `https://images.kglobalservices.com/www.pringles.com_us/en_us/product/kic-32076/prod_img-1395486_favs-salt-vinegar.png`,
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "cody135",
      email: "cody135@gmail.com",
      password: "123",
      admin: false,
      firstname : null,
      lastname : null,
      phone: null,
      address: null,
      zipcode: null,
      city : null,
      state : null,
      country: null,
    }),
    User.create({
      username: "murphy246",
      email: "murphy246@gmail.com",
      password: "123",
      admin: true,
      firstname : null,
      lastname : null,
      phone: null,
      address: null,
      zipcode: null,
      city : null,
      state : null,
      country: null,
    }),
  ]);

  // Creating Product
  const createdChips = await Promise.all(
    chips.map((chips) => {
      return Chips.create(chips);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
