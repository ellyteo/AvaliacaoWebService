# AvaliacaoWebService

#### Gabriélly Teodoro da Silva
Técnico em informática para Internet;  
U.C. - Desenvolver Web Service;

---
### Descrição

Serviço web em Node.js/Express que executa operações CRUD (GET, POST, PUT E DELETE), com entrada e saída de informações em JSON.

### Endpoints

- "/livros" (POST) - Endpoint para a criação de um novo livro.

- "/livros/:id" (GET) - Endpoint para usca de um livro por meio do ID registrado.

- "/livros" (GET) - Endpoint para filtrar a busca de livros registrados por meio do nome e/ou autor.

- "/livros/:id" (PUT) - Endpoint para alterar informações (nome/autor) de um livro já criado (a busca do livro para alteração é por meio do ID registrado).

- "/livros/:id" (DELETE) - Endpoint que deleta um livro por meio do ID registrado.

### Decisões técnicas

- Endpoints - Escritos para deixar as ações que serão realizadas explicitas para facilitar na hora dos testes, localização para correções/mudanças no código e visibilidade.

- Status - Utilizados para dar uma resposta de acordo com a ação realizada para evitar erros e notificar se existem.

### Como instalar/rodar

1. Clonar o repositório do GitHub na sua máquina localmente;
2. Abrir o terminal Git Bash dentro repositório já clonado e executar `npm install` para instalar.
3. Para rodar deve abrir o terminal Git Bash dentro repositório e executar `npm run dev` para iniciar a executá-lo.
4. Para utilizar os endpoints, abra o Postman e de acordo com cada ação o configure. Exemplo: "/livros/buscar/:id" (GET) -
coloque para rodar como GET e na URL `http://localhost:3000/livros/buscar/1` (se o livro estiver registrado ele deve ser retornado juntamente com o status 200 de sucesso). Caso o id/livro buscado não exista será retornado o erro 404 (erro do usuário).
