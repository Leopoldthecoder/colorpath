<template>
  <div>
    <p>Wonder how to generate a desired color from a source color?</p>
    <form @submit.prevent="handleSubmit">
      <label for="source">Source color: #</label>
      <input type="text" id="source" v-model="source">
      <label for="target">Target color: #</label>
      <input type="text" id="target" v-model="target">
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
      <div class="block" :style="{ 'background-color': `#${ target }` }">
        <p>{{ `#${ target }` }}</p>
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
  import convert from 'color-convert';
  import color from './color';
  export default {
    name: 'app',
    data() {
      return {
        source: '',
        target: '',
        r: '',
        g: '',
        b: '',
        p: '',
        hex: '',
        hasResult: false
      };
    },
    methods: {
      handleSubmit() {
        let s = convert.hex.rgb(this.source);
        let t = convert.hex.rgb(this.target);
        [this.r, this.g, this.b, this.p] = color(s, t);
        this.p = `${ this.p * 100 }%`;
        this.hex = convert.rgb.hex.apply(null, [this.r, this.g, this.b]);
        this.hasResult = true;
      }
    }
  };
</script>
