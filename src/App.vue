<template>
  <div id="app">
    <router-view />
    <div id="nav">
      <h2>- Menu -</h2>
      <router-link to="/">Home</router-link> |
      <router-link to="/sound">Sound</router-link> |
      <router-link to="/weather">Weather</router-link> |
      <router-link to="/bookmark">BookMark</router-link> |
    </div>
  </div>
</template>

<style>
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
