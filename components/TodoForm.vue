<template>
  <form class="todo-form" @submit.prevent="addNewTodo"> <!-- @submit.prevent pr éviter le rechargement de la page -->
    <input v-model="newTodoTitle" placeholder="Nouvelle tâche" required />
    <button type="submit">Ajouter</button>
  </form>
</template>

<script>
export default { 
  data() { // data est une fct qui retunr un objet
    return {
      newTodoTitle: '' // Init de la prop newTodoTitle dc un string vide pr le title
    };
  },
  methods: {
    addNewTodo() {
      if (this.newTodoTitle.trim()) {
        this.$store.dispatch('addTodo', { title: this.newTodoTitle, completed: false }); //dispatch pr déclencher une action dans le store
        this.newTodoTitle = '';
      }
    }
  }
};
</script>

<style scoped>
.todo-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
input {
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: calc(100% - 20px);
}
button {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}
button:hover {
  background-color: #2980b9;
}
</style>
