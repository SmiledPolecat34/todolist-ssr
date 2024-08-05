<template>
  <div class="container">
    <h1>Ma Todolist</h1>
    <TodoList />
    <TodoForm @add-todo="addTodo" />
  </div>
</template>

<script>
import TodoForm from '~/components/TodoForm.vue';
import TodoList from '~/components/TodoList.vue';
import { mapActions } from 'vuex'; // Import de la mét mapActions qui sert à import les actions du store

export default {
  components: { // Import des composants TodoForm et TodoList
    TodoForm,
    TodoList,
  },
  methods: {
    ...mapActions(['addTodo']), // Ajout de la méthode addTodo
  },
};
</script>

<style>
.container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 50px;
  text-align: center;
}
h1 {
  margin-bottom: 20px;
}
</style>
