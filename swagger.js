import swaggerJSDoc from "swagger-jsdoc"

const opcoes = {
    definition: {
        openapi: "3.0.0",
        info: { title: "API de livros", version: "1.0.0" },
    },
    apis: ["./app.js"],
}

export default swaggerJSDoc(opcoes)