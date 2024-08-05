// Définition de l'état initial du module Vuex
export const state = () => ({
  todos: [], // Un tableau vide pour stocker les tâches (todos)
});

// Définition des mutations pour modifier l'état de manière synchrone
export const mutations = {
  // Mutation pour définir les tâches
  SET_TODOS(state, todos) {
    state.todos = todos; // Remplace le tableau de tâches existant par un nouveau
  },
  // Mutation pour ajouter une nouvelle tâche
  ADD_TODO(state, todo) {
    state.todos.push(todo); // Ajoute une nouvelle tâche à la fin du tableau
  },
  // Mutation pour mettre à jour le statut d'une tâche
  UPDATE_TODO_STATUS(state, { id, completed }) {
    const todo = state.todos.find(todo => todo.id === id); // Trouve la tâche par son ID
    if (todo) {
      todo.completed = completed; // Met à jour le statut de la tâche si elle est trouvée
    }
  },
  // Mutation pour supprimer une tâche
  DELETE_TODO(state, id) {
    state.todos = state.todos.filter(todo => todo.id !== id); // Filtre les tâches pour exclure celle avec l'ID donné
  },
};

// Définition des actions pour effectuer des opérations asynchrones
export const actions = {
  // Action pour récupérer les tâches depuis une API
  async fetchTodos({ commit }) {
    try {
      const response = await this.$axios.get('/api/todos'); // Effectue une requête GET à l'API
      commit('SET_TODOS', response.data); // Commit la mutation SET_TODOS avec les données reçues
    } catch (error) {
      console.error('Failed to fetch todos:', error); // Log l'erreur en cas d'échec
    }
  },
  // Action pour ajouter une nouvelle tâche en utilisant une API
  async addTodo({ commit }, todo) {
    try {
      const response = await this.$axios.post('/api/todos', todo); // Effectue une requête POST à l'API
      commit('ADD_TODO', response.data); // Commit la mutation ADD_TODO avec les données reçues
    } catch (error) {
      console.error('Failed to add todo:', error); // Log l'erreur en cas d'échec
    }
  },
  // Action pour mettre à jour le statut d'une tâche via une API
  async updateTodoStatus({ commit }, { id, completed }) {
    try {
      await this.$axios.put(`/api/todos/${id}`, { completed }); // Effectue une requête PUT à l'API
      commit('UPDATE_TODO_STATUS', { id, completed }); // Commit la mutation UPDATE_TODO_STATUS avec l'ID et le statut mis à jour
    } catch (error) {
      console.error('Failed to update todo status:', error); // Log l'erreur en cas d'échec
    }
  },
  // Action pour supprimer une tâche via une API
  async deleteTodo({ commit }, id) {
    try {
      await this.$axios.delete(`/api/todos/${id}`); // Effectue une requête DELETE à l'API
      commit('DELETE_TODO', id); // Commit la mutation DELETE_TODO avec l'ID de la tâche supprimée
    } catch (error) {
      console.error('Failed to delete todo:', error); // Log l'erreur en cas d'échec
    }
  },
};
