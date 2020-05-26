<template>
  <div>Inloggad
    <div>
      <ul>
        <li><input type="text" placeholder="From.."></li>
        <li>
          <select v-model="transportation">
          <option selected disabled>Transportation</option>
          <option value="airplane">Airplane</option>
          <option value="train">Train</option>
          <option value="boat">Boat</option>
          <option value="car">Car</option>
        </select>
        </li>
        <li><input type="text" placeholder="To.."></li>
        <li><input type="number" placeholder="Estimated travel cost"></li>
        </ul>
    </div>

  </div>

</template>

<script>
export default {
  data(){
    return{
      transportation: "Transportation"
    }
  }
}
</script>

<style>

</style>