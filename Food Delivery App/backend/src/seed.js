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
  // Spice Garden
  {
    restaurantName: "Spice Garden",
    name: "Chicken Biryani",
    price: 180,
    description:
      "Aromatic basmati rice with tender chicken.",
  },
  {
    restaurantName: "Spice Garden",
    name: "Paneer Butter Masala",
    price: 160,
    description:
      "Paneer cooked in a creamy tomato gravy.",
  },
  {
    restaurantName: "Spice Garden",
    name: "Garlic Naan",
    price: 50,
    description:
      "Soft naan topped with garlic and butter.",
  },

  // Pizza House
  {
    restaurantName: "Pizza House",
    name: "Margherita Pizza",
    price: 220,
    description:
      "Classic pizza with tomato, mozzarella and basil.",
  },
  {
    restaurantName: "Pizza House",
    name: "Farmhouse Pizza",
    price: 280,
    description:
      "Pizza loaded with fresh vegetables.",
  },

  // Dragon Bowl
  {
    restaurantName: "Dragon Bowl",
    name: "Chicken Fried Rice",
    price: 180,
    description:
      "Fried rice tossed with chicken and fresh vegetables.",
  },
  {
    restaurantName: "Dragon Bowl",
    name: "Chicken Noodles",
    price: 160,
    description:
      "Stir-fried noodles with chicken and vegetables.",
  },
  {
    restaurantName: "Dragon Bowl",
    name: "Dragon Chicken",
    price: 220,
    description:
      "Crispy chicken tossed in a spicy Asian sauce.",
  },
  {
    restaurantName: "Dragon Bowl",
    name: "Veg Manchurian",
    price: 140,
    description:
      "Crispy vegetable balls in a flavorful Manchurian sauce.",
  },

  // Burger Point
  {
    restaurantName: "Burger Point",
    name: "Classic Chicken Burger",
    price: 150,
    description:
      "Juicy chicken patty with lettuce and special sauce.",
  },
  {
    restaurantName: "Burger Point",
    name: "Cheese Burger",
    price: 170,
    description:
      "Classic burger topped with melted cheese.",
  },
  {
    restaurantName: "Burger Point",
    name: "Double Chicken Burger",
    price: 220,
    description:
      "Two juicy chicken patties with fresh toppings.",
  },
  {
    restaurantName: "Burger Point",
    name: "French Fries",
    price: 100,
    description:
      "Crispy golden french fries.",
  },
];

async function seed() {
  try {
    await sequelize.authenticate();

    console.log("Database connected.");

    // Create restaurants only if they don't already exist
    for (const restaurantData of restaurants) {
      const [restaurant, created] =
        await Restaurant.findOrCreate({
          where: {
            name: restaurantData.name,
          },
          defaults: restaurantData,
        });

      console.log(
        created
          ? `Created restaurant: ${restaurant.name}`
          : `Restaurant already exists: ${restaurant.name}`,
      );
    }

    // Add menu items without deleting existing data
    for (const item of menuItems) {
      const restaurant =
        await Restaurant.findOne({
          where: {
            name: item.restaurantName,
          },
        });

      if (!restaurant) {
        console.log(
          `Restaurant not found: ${item.restaurantName}`,
        );
        continue;
      }

      const [menuItem, created] =
        await MenuItem.findOrCreate({
          where: {
            restaurantId: restaurant.id,
            name: item.name,
          },
          defaults: {
            restaurantId: restaurant.id,
            name: item.name,
            price: item.price,
            description: item.description,
          },
        });

      console.log(
        created
          ? `Created menu item: ${menuItem.name} → ${restaurant.name}`
          : `Menu item already exists: ${menuItem.name}`,
      );
    }

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await sequelize.close();
  }
}

seed();