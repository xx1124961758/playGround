<script>
// export default {
//   data() {
//     return {
//       count: 0,
//     };
//   },
//   methods: {
//     increment() {
//       this.count++;
//     },
//   },

//   mounted() {
//     console.log(`The initial count is ${this.count}.`);
//   },
// };

console.log("hello");
</script>

<template>
  <div>
    <button @click="increment">Count is: {{ count }}</button>
    <h1 class="title">hello,world!!</h1>
  </div>
</template>

<style scoped>
.title {
  color: red;
}
</style>


<style>
.title {
  font-weight: 700;
}
</style>