<template>
  <div class="player">
    <img
      :class="`player-img ${readonly ? 'ro' : ''}`"
      :src="image"
      alt="PlayerIcon"
      @click="readonly ? '' : toggleModal"
      title="edit this player's icon"
    />

    <input
      :class="`player-name ${readonly ? 'ro' : ''}`"
      type="text"
      v-model="player.name"
      :readonly="readonly"
    />
    <div class="modal" :style="`display: ${ isModal ? 'block' : 'none' }`">
      <input type="file" @change="onFileChange" />
    </div>
  </div>
</template>

<script>
import { store } from "../store";

import blankImage from "../assets/blank.jpg";

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
      return this.player.icon || blankImage;
    },
    readonly() {
      return this.player.id < 0;
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
  },
  beforeUpdate() {
    console.log("updating Player!");
  }
};
</script>

<style scoped>
.player {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 0.5rem;
}

.modal {
  position: absolute;
  top: 10px;
  background: black;
  color: white;
  width: 10rem;
}

.player-img {
  width: 2rem;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.player-img:hover {
  border: 2px solid orange;
}

.player-name {
  padding: 0.1rem;
}
.ro {
  user-select: none;
  cursor: default;
}
.ro:hover {
  border: 2px solid transparent;
}
</style>
