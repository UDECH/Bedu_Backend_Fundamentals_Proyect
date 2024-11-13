import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bedu_Poryecto_Backend_Fundamentals",
      version: "1.0.0",
      description: "Documentacion Api Bedu",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

export default swaggerJsDoc(swaggerOptions);
