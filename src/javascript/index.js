const Parse = require("parse/node");

// Inicialize o Parse com suas credenciais do Back4App
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");
Parse.serverURL = "https://parseapi.back4app.com";

// Defina a classe que será usada para teste
const TestClass = Parse.Object.extend("TestClass");
const testObject = new TestClass();

// Adicione um valor ao objeto
testObject.set("testField", "Funcionando!");

// Salve o objeto no banco de dados
testObject
  .save()
  .then((object) => {
    console.log("Objeto salvo com sucesso:", object);
  })
  .catch((error) => {
    console.error("Erro ao salvar o objeto:", error);
  });






// Inicializando o Parse
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");
Parse.serverURL = 'https://parseapi.back4app.com/';

document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;

    const Comment = Parse.Object.extend('Comments');
    const newComment = new Comment();

    newComment.set('username', username);
    newComment.set('comment', comment);

    try {
        await newComment.save();
        document.getElementById('comment-form').reset();
        loadComments();  // Carrega os comentários após salvar um novo
    } catch (error) {
        console.error('Erro ao salvar comentário:', error);
    }
});

async function loadComments() {
    const Comment = Parse.Object.extend('Comments');
    const query = new Parse.Query(Comment);
    query.descending('createdAt');

    try {
        const results = await query.find();
        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = '';

        results.forEach((comment) => {
            const commentItem = document.createElement('li');
            commentItem.textContent = `${comment.get('username')}: ${comment.get('comment')}`;
            commentsList.appendChild(commentItem);
        });
    } catch (error) {
        console.error('Erro ao carregar comentários:', error);
    }
}

// Carregar comentários ao iniciar a página
loadComments();
