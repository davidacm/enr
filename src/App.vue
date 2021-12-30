<template>
  <div id="app"
      v-touch:swipe.left.stop.prevent="swipeLeft"
      v-touch:swipe.right.stop.prevent="swipeRight"
      >
    
<b-tabs v-model="tabIndex" justified>
  <b-tab title="Notas">
    <message-reader/>
  </b-tab>
  <b-tab title="Inicio" active>
    <home/>
  </b-tab>
  <b-tab title="Configuración">
    <Settings/>
  </b-tab>
</b-tabs>
  </div>
</template>
<script>
import Home from './views/Home.vue'
import MessageReader from './views/MessageReader.vue'
import Settings from './views/Settings.vue'

export default {
  data () {
    return {
      tabIndex: 0,
    }
  },
  methods: {
    swipeLeft() {
      if (this.tabIndex >1) return;
      ++this.tabIndex;
    },
    swipeRight() {
      if (this.tabIndex < 1) return;
      --this.tabIndex;
    },
  },
  watch: {
    tabIndex () {
      this.cancelSpeak();
    }
  },
  components: { Home, MessageReader, Settings},
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main-fixed {
  height: 100vh;
  position: fixed;
}

.full-size {
  height: 100vh;
  width: 100vw;
}
</style>