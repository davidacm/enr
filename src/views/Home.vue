<template>
  <help v-if="showInstructions" @onclose="showInstructions = false"></help>
  <div class="vh-100" v-else>
    <b-container fluid>
      <b-row>
        <b-col>
          <b-button @click="install" v-if="deferredPrompt"
            >Instalar app</b-button
          >
        </b-col>
        <b-col>
          <b-button @click="showInstructions = true">Instrucciones</b-button>
        </b-col>
        <b-col>
          <b-link href="https://davidacm.github.io/donations/" role="button">
            ¡Donar al proyecto!
          </b-link>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <label for="fileLoad" aria-live="assertive"
            >Seleccione el archivo con las anotaciones</label
          >
          <b-form-file id="fileLoad" v-model="selectedFile" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <label for="textInput">O introduzca las notas aquí</label>
          <b-form-textarea id="textInput" v-model="textFile"></b-form-textarea>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Help from "./Help.vue";
import { computedHelper } from "../store";

export default {
  name: "Home",
  data() {
    return {
      showInstructions: false,
      selectedFile: null,
      deferredPrompt: null,
    };
  },
  created() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e;
    });
    window.addEventListener("appinstalled", () => {
      this.deferredPrompt = null;
    });
  },
  methods: {
    async install() {
      this.deferredPrompt.prompt();
    },
  },
  watch: {
    selectedFile(v) {
      if (!v || v.type !== "text/plain") return;
      let reader = new FileReader();
      reader.readAsText(v, "UTF-8");
      reader.onload = (e) => {
        this.textFile = e.target.result;
      };
      reader.onerror = (e) => {
        console.error(e);
      };
    },
  },
  computed: {
    ...computedHelper(["textFile"], "realtimePersistentFields"),
  },
  components: {
    Help,
  },
};
</script>
