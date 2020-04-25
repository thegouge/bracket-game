<template>
  <div class="container">
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
    return { isModal: false, image: blankImage };
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
        this.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
}

span {
  box-sizing: border-box;
  border-radius: 50%;
}
span:hover {
  border: 2px solid orange;
}

.player-img {
  width: 3rem;
  border-radius: 50%;
}
</style>
