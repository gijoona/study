// Full spec-compliant TodoMVC with localStorage persistence
// and hash-based routing in ~120 effective lines of JavaScript.

// localStorage persistence
var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

// visibility filters
var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}

// todo-input-new component
Vue.component('todo-input-new', {
  template: `
    <input class="new-todo" autofocus autocomplete="off" placeholder="해야 할 일" v-model="todoStr" @keyup.enter="onEnter($event.target.value)">
  `,
  data: function(){
    return {
      todoStr: ''
    }
  },
  methods: {
    onEnter: function(value){
      this.todoStr = '';
      this.$emit('enter', value);
    }
  }
});

/* components */
// todo-item components
Vue.component('todo-item', {
  props: ['todo'],
  template: `
    <div class="view">
      <input class="toggle" type="checkbox" v-model="todoItem.completed">
      <label @dblclick="editTodo(todoItem)">{{ todoItem.title }}</label>
      <button class="destroy" @click="removeTodo(todoItem)"></button>
    </div>
  `,
  data: function(){
    return { todoItem: this.todo }
  },
  methods: {
    editTodo: function(todoItem){
      this.$emit('edit', todoItem);
    },
    removeTodo: function(todoItem){
      this.$emit('remove', todoItem);
    }
  }
});

// todo-input-edit components
Vue.component('todo-input-edit', {
  props: ['todo', 'editedTodo'],
  template: `
    <input class="edit" type="text"
      v-model="todoItem.title"
      v-todo-focus="isFocus"
      @blur="doneEdit(todoItem)"
      @keyup.enter="doneEdit(todoItem)"
      @keyup.esc="cancelEdit(todoItem)">`,
  data: function(){
    return { todoItem: this.todo }
  },
  methods: {
    doneEdit: function(todoItem){
      this.$emit('done', todoItem);
    },
    cancelEdit: function(todoItem){
      this.$emit('cancel', todoItem);
    }
  },
  computed: {
    isFocus: function(){
      return this.todo == this.editedTodo;
    }
  },
  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
});

// todo-list components
Vue.component('todo-list', {
  props: ['todos', 'editedTodo'],
  template: `
    <ul class="todo-list">
      <li v-for="todo in todoList"
        class="todo"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo == editedTodo }">
        <todo-item :todo="todo" @edit="editTodo(todo)" @remove="removeTodo(todo)"></todo-item>
        <todo-input-edit :todo="todo" :edited-todo="editedTodo" @done="doneEdit(todo)"  @cancel="cancelEdit(todo)"></todo-input-edit>
      </li>
    </ul>`,
  data: function(){
    return { todoList: this.todos }
  },
  methods: {
    editTodo: function(todo){
      this.$emit('todo-edit', todo);
    },
    removeTodo: function(todo){
      this.$emit('todo-remove', todo);
    },
    doneEdit: function(todo){
      this.$emit('todo-edit-done', todo);
    },
    cancelEdit: function(todo){
      this.$emit('todo-edit-cancel', todo);
    }
  }
});
/* components */

// app Vue instance
var app = new Vue({
  // app initial state
  data: {
    todos: todoStorage.fetch(),
    newTodo: '',
    editedTodo: null,
    visibility: 'all'
  },

  // watch todos change for localStorage persistence
  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },
  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    },
    remaining: function () {
      return filters.active(this.todos).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    }
  },

  filters: {
    pluralize: function (n) {
      return n === 1 ? 'item' : 'items'
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    addTodo: function (todo) {
      this.newTodo = todo;
      var value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
      this.newTodo = ''
    },

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },

    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    }
  }
})

// handle routing
function onHashChange () {
  var visibility = window.location.hash.replace(/#\/?/, '')
  if (filters[visibility]) {
    app.visibility = visibility
  } else {
    window.location.hash = ''
    app.visibility = 'all'
  }
}

window.addEventListener('hashchange', onHashChange)
onHashChange()

// mount
app.$mount('.todoapp')
