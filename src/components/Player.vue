<template>
  <div class="player">
    <span @click="toggleModal" title="edit this player's icon">
      <img class="player-img" :src="image" alt="PlayerIcon" />
    </span>
    <input type="text" v-model="player.name" />
    <div class="modal" :style="`display: ${ isModal ? 'block' : 'none' }`">
      <input type="file" @change="onFileChange" />
    </div>
  </div>
</template>

<script>
import { store } from "../store";

export default {
  name: "Player",
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data() {
    return { isModal: false };
  },
  computed: {
    image() {
      return this.player.icon;
    }
  },
  methods: {
    toggleModal() {
      this.isModal = !this.isModal;
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();

      reader.onload = e => {
        store.updatePlayerImage(this.player.id, e.target.result);
      };
      reader.readAsDataURL(file);
      this.toggleModal();
    }
  }
};
</script>

<style scoped>
.player {
  border: 1px solid red;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
}

span {
  box-sizing: border-box;
  border-radius: 50%;
  margin: 2px;
}
span:hover {
  border: 2px solid orange;
  margin: 0;
}

.modal {
  position: absolute;
  top: 10px;
  background: black;
  color: white;
  width: 10rem;
}

.player-img {
  width: 3rem;
  border-radius: 50%;
}
</style>
