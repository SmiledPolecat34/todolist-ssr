<template>
  <div class="todo-list">
    <ul v-if="todos.length">
      <li v-for="todo in todos" :key="todo.id" class="todo-item">
        <div class="todo-checkbox">
          <input type="checkbox" v-model="todo.completed" @change="updateStatus(todo.id, todo.completed)" />
        </div>
        <div class="todo-info">
          <span class="todo-title">{{ todo.title }}</span>
          <button @click="deleteTodo(todo.id)" class="delete-button">Supprimer</button>
        </div>
      </li>
    </ul>
    <p v-else class="empty-message">La liste est vide. Ajoutez une tâche pour commencer.</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'; //mapState sert à importer les données du store et mapActions les actions

export default {
  computed: { // computed est un objet qui contient les propriétés calculées
    ...mapState(['todos']), // Import des todos
  },
  methods: {
    ...mapActions(['fetchTodos', 'updateTodoStatus', 'deleteTodo']),
    updateStatus(id, completed) {
      this.updateTodoStatus({ id, completed });
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.todo-list {
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}
.todo-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.todo-item:hover {
  background-color: #12a38b;
}
.todo-item:hover .todo-title {
  color: #fff;
}
.todo-checkbox input[type="checkbox"] {
  transform: scale(1.5);
}
.todo-checkbox {
  flex: 0 0 30px;
  margin-right: 10px;
}
.todo-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-title {
  font-size: 16px;
  color: #555;
}
.delete-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}
.delete-button:hover {
  background-color: #c0392b;
}
.empty-message {
  color: #888;
  font-size: 16px;
}
</style>
