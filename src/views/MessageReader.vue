<template>
  <div id="MessageReader" class="main-fixed">
    <b-container
      class="full-size"
      v-touch:swipe.prevent="onSwipe"
    >
      <b-row>
        <b-col>
          <b-form-checkbox v-model="numAnnotations">
            Enumerar notas
          </b-form-checkbox>
        </b-col>
        <b-col>
          <b-form-checkbox v-model="useTts" :disabled="!isSynthAvailable">
            Usar síntesis de voz del sistema (use esta opción si no cuenta con lector de pantallas)
          </b-form-checkbox>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p aria-live="assertive">{{ message }}</p>
        </b-col>
      </b-row>

      <b-container
        style="position: fixed; bottom: 0%; width: 100%; height: 40%;"
      >
        <b-row style="height:30%;">
          <b-col>
            <b-button @click="toggleRunAnnotations">
              {{ running? "detener": "iniciar" }}
            </b-button>
          </b-col>
        </b-row>
        <b-row style="height:70%;">
          <b-col v-if="useSlider">
            <b-form-input v-model="slider" type="range" min="0" max="100" step="1" @update="onSlider"/>
          </b-col>
          <template v-else>
            <b-col>
              <b-button @click="prevMessage">anterior</b-button>
            </b-col>
            <b-col>
              <b-button @click="nextMessage">siguiente</b-button>
            </b-col>
          </template>
        </b-row>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import NoSleep from 'nosleep.js';
import { computedHelper } from '../store';
import { isSynthAvailable } from '../speak';
var noSleep = new NoSleep();
var df = false;

export default {
  name: "MessageReader",
  data() {
    return {
      curMsg: 0,
      isSynthAvailable: isSynthAvailable,
      slider: 5,
      oldSlider: 5,
      running: false,
    };
  },
  methods: {
    nextMessage() {
      ++this.curMsg;
      if (this.curMsg == this.msgs.length) this.curMsg = 0;
      this.speakMessage();
    },
    prevMessage() {
      --this.curMsg;
      if (this.curMsg < 0) this.curMsg = this.msgs.length - 1;
      this.speakMessage();
    },
    speakMessage() {
      if (isSynthAvailable && this.useTts) this.speak(this.message);
    },
    onSlider() {
      if (this.slider > this.oldSlider) this.nextMessage();
      else if (this.slider < this.oldSlider) this.prevMessage();
      if (this.slider >95) this.slider = 5;
      else if (this.slider < 5) this.slider = 95;
      this.oldSlider = this.slider;
    },
    toggleRunAnnotations() {
      this.running = !this.running;
      df = this.running;
      if (this.running) noSleep.enable();
      else noSleep.disable();
    },
    onSwipe(d, e) {
      if (d == "left" && !df) return;
      e.stopPropagation();
      switch (d) {
        case "right":
          this.nextMessage();
          break;
        case "top":
          this.prevMessage();
          break;
        case "bottom":
          this.nextMessage();
          break;
      }
    }
  },
  computed: {
    message() {
      let num = this.numAnnotations == true? (this.curMsg +1) +". ": "";
      return num +this.msgs[this.curMsg];
    },
    ...computedHelper(['numAnnotations', 'useTts', 'useSlider'], 'realtimePersistentFields'),
    ...computedHelper(['textFile', 'vLang', 'vVoice', 'rate', 'pitch'], 'commonFields'),
    msgs () {
      if (this.textFile) return this.textFile.split("\n");
      return ['no hay notas', 'prueba2', 'prueba3', 'prueba4'];
    }
  },
  watch: {
    textFile () {
      this.curMsg = 0;
    }
  }
};
</script>

<style scoped>
#MessageReader button {
  height: 100%;
  width: 100%;
}
</style>