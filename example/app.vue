<template>
  <div class="container">
    <transition name="fade" mode="out-in">
      <div class="stage" v-if="stage === 1" key="1">
        <button class="operation" @click="stage = 2">Take a path</button>
        <button class="operation">Find way home</button>
      </div>

      <div class="stage" v-if="stage === 2" key="2">
        <button
          class="operation"
          :class="{ 'active': path.method === item }"
          @click="handleMethodClick(item)"
          v-if="stage === 2"
          v-for="item in ['tint', 'shade', 'mix']">
          {{ item }}
        </button>
      </div>
      
      <div class="stage" v-if="stage === 3" key="3">
        <div class="item">
          <label for="source">source color</label>
          <input type="text" placeholder="#FFFFFF" id="source" v-model="path.source">
        </div>
        <div class="item" v-show="path.method === 'mix'">
          <label for="mixer">mix color</label>
          <input type="text" placeholder="#333333" id="mixer" v-model="path.mixer">
        </div>
        <div class="item">
          <label for="percent">percentage</label>
          <input type="text" placeholder="0.5" id="percent" v-model.number="path.percentage">
        </div>
        <button class="operation" @click="submit">Take me there!</button>
        <p>{{ result }}</p>
      </div>
      
      <div class="stage" v-if="stage === 4" key="4">
        <div class="block">
          <div class="color" :style="{ 'background-color': path.source }"></div>
          <p>{{ path.source }}</p>
        </div>
        <div class="block" v-show="path.method === 'mix'">
          <div class="color" :style="{ 'background-color': path.mixer }"></div>
          <p>{{ path.mixer }}</p>
        </div>
        <div class="block">
          <div class="color" :style="{ 'background-color': result }"></div>
          <p>{{ result }}</p>
        </div>
        <p class="css">{{ `${ path.method }(${ path.source }, ${ path.method === 'mix' ? `${ path.mixer }, ` : '' }${ path.percentage * 100 }%) = ${ result }` }}</p>
      </div>
    </transition>
    <p>
      <span @click="stage = 1">Restart</span>
      <span @click="stage > 1 && stage--">Back</span>
    </p>
  </div>
</template>

<style>
  @reset-global pc;
  html, body {
    font-family: "Comic Sans MS";
    font-size: 24px;
    color: #388E3C;
    height: 100%;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  .container {
    height: 100%;
    background: linear-gradient(35deg, rgba(255, 221, 0, 0.48), rgba(0, 255, 0, 0.28));
    position: relative;
  }
  .stage {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 50%;
    transition: .2s;
    transform: translateY(-50%);
  }
  .operation {
    margin: 20px auto;
    display: block;
    color: #FFD740;;
    font-size: 50px;
    background-color: #4CAF50;
    size: 450px 150px;
    border: solid 10px #FFD740;
    border-radius: 40px;
    transition: .4s;
    cursor: pointer;
    &:hover {
      transform: scale(1.07);
      background-color: #388E3C;
    }
    &:focus {
      outline: none;
    }
  }
  .item {
    margin: 10px auto;
    label {
      display: inline-block;
      width: 200px;
    }
  }
  .block {
    vertical-align: middle;
    display: inline-block;
    margin: 0 30px;
    position: relative;
    text-align: center;
    .color {
      size: 150px;
      border: solid 10px #FFD740;
      border-radius: 40px;
      box-sizing: border-box;
    }
    p {
      margin-top: 10px;
    }
  }
  .css {
    margin-top: 20px;
    font-size: 36px;
  }
</style>

<script>
  import convert from 'color-convert'
  export default {
    name: 'app',
    data() {
      return {
        stage: 1,
        path: {
          source: '',
          method: '',
          mixer: '',
          percentage: ''
        },
        result: ''
      }
    },
    watch: {
      stage(val, oldVal) {
        if (val < oldVal) this.result = ''
      }
    },
    methods: {
      handleMethodClick(item) {
        this.path.method = item
        this.stage = 3
      },
      submit() {
        if (this.path.method === 'mix') {
          this.result = window.clp[this.path.method](this.path.source, this.path.mixer, this.path.percentage)
        } else {
          this.result = window.clp[this.path.method](this.path.source, this.path.percentage)
        }
        this.result = `#${ convert.rgb.hex.apply(null, this.result) }`
        this.stage = 4
      }
    }
  }
</script>
