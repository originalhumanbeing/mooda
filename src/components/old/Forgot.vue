<template>
  <div class="forgot">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'forgot',
  data () {
    return {
      msg: '이게 벌써 몇 번째냐'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
