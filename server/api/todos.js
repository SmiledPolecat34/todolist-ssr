import fs from 'fs';
import path from 'path';

const filePath = path.resolve('server/data/todos.json'); //Chemin absolu

// Fct pour s'assurer que le fichier des tâches existe
const ensureTodosFileExists = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
};

// Fct pour read les tâches
const readTodos = () => {
  ensureTodosFileExists();
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Fct pour write les tâches ds le JSON
const writeTodos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

export default function (req, res, next) {
  ensureTodosFileExists();

  if (req.method === 'GET') {
    console.log('[GET] requête reçue');
    const todos = readTodos();
    console.log('[GET] Todos actuelles:', todos);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json'); 
    res.end(JSON.stringify(todos));
  } else if (req.method === 'POST') {
    console.log('[POST] requête reçue');
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // Convertir le buffer en string
      // chunk: un morceau de buffer
      // buffer: une suite d'octets
    });
    req.on('end', () => {
      console.log('[POST] Requête reçue:', body);
      const todos = readTodos();
      const newTodo = { id: todos.length + 1, ...JSON.parse(body) };
      todos.push(newTodo);
      writeTodos(todos);
      console.log('[POST] Todos mis à jour:', todos);
      res.statusCode = 201; // 201: Created
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(newTodo));
    });
  } else if (req.method === 'DELETE') {
    console.log('[DELETE] requête reçue');
    const id = parseInt(req.url.split('/').pop(), 10);
    console.log('[DELETE] ID à supprimer:', id);
    let todos = readTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    console.log('[DELETE] Index de la tâche à supprimer:', todoIndex);
    if (todoIndex !== -1) { // -1 si l'élément n'est pas trouvé
      todos.splice(todoIndex, 1);
      todos = todos.map((todo, index) => ({ ...todo, id: index + 1 }));
      writeTodos(todos);
      console.log('[DELETE] mise à jour des todos:', todos);
      res.statusCode = 204; // 204: No Content
    } else {
      console.log('[DELETE] Todo non trouvée');
      res.statusCode = 404; // 404: Not Found
      res.end('Todo non trouvée');
    }
    res.end();
  } else if (req.method === 'PATCH') {
    console.log('[PATCH] requête reçue');
    const id = parseInt(req.url.split('/').pop(), 10); // Extraire l'ID correctement
    // ParseInt pour convertir l'ID en nombre
    // Split pour obtenir la dernière partie de l'URL
    // Pop pour extraire l'ID de l'URL
    console.log('[PATCH] ID à mettre à jour:', id);
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const updatedData = JSON.parse(body);
      let todos = readTodos();
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], ...updatedData };
        writeTodos(todos);
        console.log('[PATCH] Todos mis à jour:', todos);
        res.statusCode = 200; // 200: OK
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(todos[todoIndex]));
      } else {
        console.log('[PATCH] Todo non trouvée');
        res.statusCode = 404;
        res.end('Todo non trouvée');
      }
    });
  } else {
    res.statusCode = 405; // 405: Method Not Allowed
    res.end('Methode non autorisée');
  }
}
