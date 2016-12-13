<template>
  <div>
    <p>Wonder how to generate a desired color from a source color?</p>
    <form @submit.prevent="handleSubmit">
      <label for="source">Source color: </label>
      <input type="text" id="source" v-model="source">
      <label for="destination">Target color: </label>
      <input type="text" id="destination" v-model="destination">
      <button>Submit</button>
    </form>
    <div v-show="hasResult">
      <div class="block" :style="{ 'background-color': `#${ source }` }">
        <p>{{ `#${ source }` }}</p>
      </div>
      <span class="mark">+</span>
      <div class="block" :style="{ 'background-color': `#${ hex }` }">
        <p>{{ `#${ hex }` }}</p>
      </div>
      <span class="mark">*</span>
      <span class="mark">{{ p }}</span>
      <span class="mark">=</span>
      <div class="block" :style="{ 'background-color': `#${ destination }` }">
        <p>{{ `#${ destination }` }}</p>
      </div>
      <p class="expr">CSS: {{ `mix(#${ source }, #${ hex }, ${ p })` }}</p>
    </div>
  </div>
</template>

<style>
  form {
    margin-bottom: 50px;
  }
  .block {
    vertical-align: middle;
    display: inline-block;
    size: 100px;
    margin: 0 10px;
    position: relative;
    text-align: center;
    p {
      width: 100%;
      position: absolute;
      bottom: -25px;
      margin: 0;
    }
  }
  .mark {
    padding: 10px;
  }
  .expr {
    margin-top: 60px;
  }
</style>

<script>
  import convert from 'color-convert'
  import colorPath from '../src/index'
  export default {
    name: 'app',
    data() {
      return {
        source: '',
        destination: '',
        r: '',
        g: '',
        b: '',
        p: '',
        hex: '',
        hasResult: false
      }
    },
    methods: {
      handleSubmit() {
        const result = colorPath.findMixer(this.source, this.destination)
        this.p = result.percentage
        ;[this.r, this.g, this.b] = result.mixer
        this.p = `${ parseFloat((this.p * 100).toPrecision(4)) }%`
        this.hex = convert.rgb.hex.apply(null, [this.r, this.g, this.b])
        this.hasResult = true
      }
    }
  }
</script>
