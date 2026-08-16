require("dotenv").config();

const sequelize = require("./config/database");
const { Restaurant, MenuItem } = require("./models");

const restaurants = [
  {
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "25-30 min",
  },
  {
    name: "Pizza House",
    cuisine: "Pizza",
    rating: 4.3,
    deliveryTime: "30-35 min",
  },
  {
    name: "Dragon Bowl",
    cuisine: "Chinese",
    rating: 4.6,
    deliveryTime: "20-25 min",
  },
  {
    name: "Burger Point",
    cuisine: "Burgers",
    rating: 4.4,
    deliveryTime: "25-30 min",
  },
];

const menuItems = [
  {
    restaurantId: 1,
    name: "Chicken Biryani",
    price: 180,
    description: "Aromatic basmati rice with tender chicken.",
  },
  {
    restaurantId: 1,
    name: "Paneer Butter Masala",
    price: 160,
    description: "Paneer cooked in a creamy tomato gravy.",
  },
  {
    restaurantId: 1,
    name: "Garlic Naan",
    price: 50,
    description: "Soft naan topped with garlic and butter.",
  },
  {
    restaurantId: 2,
    name: "Margherita Pizza",
    price: 220,
    description: "Classic pizza with tomato, mozzarella and basil.",
  },
  {
    restaurantId: 2,
    name: "Farmhouse Pizza",
    price: 280,
    description: "Pizza loaded with fresh vegetables.",
  },
];

async function seed() {
  try {
    await sequelize.authenticate();

    console.log("Database connected.");

    await Restaurant.destroy({
      where: {},
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });

    const createdRestaurants =
      await Restaurant.bulkCreate(restaurants);

    console.log(
      `${createdRestaurants.length} restaurants created.`,
    );

    await MenuItem.bulkCreate(menuItems);

    console.log("Menu items created.");

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await sequelize.close();
  }
}

seed();