import request from "supertest"
import app from "../app.js"

test("POST /livros cria um novo livro", async () => {
    const resposta = await request(app).post("/livros").send({ nome: "Alice no país das maravilhas", autor: "Lewis Carroll" })
    expect(resposta.status).toBe(201)
    expect(resposta.body.nome).toBe("Alice no país das maravilhas")
})

test("POST /livros retorna erro ao não informar o autor", async () => {
    const resposta = await request(app).post("/livros").send({ nome: "Alice no país das maravilhas" })
    expect(resposta.status).toBe(400)
    expect(resposta.body.erro).toBe("Autor é obrigatório!")
})

test("GET /livros retorna todos os livros", async () => {

    const livros = [
        {
            id: 1,
            nome: "Alice no país das maravilhas",
            autor: "Lewis Carroll"
        },
        {
            id: 2,
            nome: "A hipótese do amor",
            autor: "Ali Hazelwood"
        }
    ]

    const resposta = await request(app).get("/livros").send()
    expect(resposta.status).toBe(200)
    expect(resposta.body[0]).toEqual(livros[0])
    expect(resposta.body[1]).toEqual(livros[1])
})

test("GET /livros/:id retorna um livro", async () => {
    const resposta = await request(app).get("/livros/1").send()
    expect(resposta.status).toBe(200)
    expect(resposta.body.nome).toBe("Alice no país das maravilhas")
})

test("GET /livros/:id retorna erro ao não encontrar um livro", async () => {
    const resposta = await request(app).get("/livros/999").send()
    expect(resposta.status).toBe(404)
    expect(resposta.body.erro).toBe("Livro não encontrado!")
})

test("PUT /livros/:id altera um livro", async () => {
    const resposta = await request(app).put("/livros/3").send({ nome: "Alice no país das maravilhas", autor: "Lewis Carroll" })
    expect(resposta.status).toBe(200)
    expect(resposta.body.nome).toBe("Alice no país das maravilhas")
})

test("PUT /livros/:id erro ao alterar um livro", async () => {
    const resposta = await request(app).put("/livros/77").send({ nome: "Alice no país das maravilhas", autor: "Lewis Carroll" })
    expect(resposta.status).toBe(200)
    expect(resposta.body.nome).toBe("Livro não encontrado!")
})