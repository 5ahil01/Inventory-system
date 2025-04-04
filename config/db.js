import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    // SSL config can be removed if not needed
  },
  retry: {
    max: 3, // retry on failure
  },
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
};

connectDB();

export default sequelize;

// import { Sequelize } from "sequelize";
// import dotenv from "dotenv";

// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: "localhost",
//     port: 3306,
//     dialect: "mysql",
//   }
// );

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });

// export default sequelize;
