<template>
  <div>
    <transition name="fade">
      <!-- <div v-if="modelValue">
        <p>hello</p>
        <button @click="hideModal">关闭</button>
      </div> -->
      <div v-if="show">
        <p>hello</p>
        <button @click="hideModal">关闭</button>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onRenderTriggered,
  onActivated,
  onDeactivated,
  onErrorCaptured
} from "vue";

export default defineComponent({
  //   props: {
  //     modelValue: Boolean
  //   },
  //   emit: ["update:modelValue"],
  //   setup(props, context) {
  //     const hideModal = () => {
  //       context.emit("update:modelValue", false);
  //     };

  //     return {
  //       hideModal
  //     };
  //   }
  props: {
    show: Boolean
  },
  emits: ["update:show"],
  renderTriggered() {
    console.log(21321312);
  },
  setup(props, context) {
    const hideModal = () => {
      context.emit("update:show", false);
    };
    onErrorCaptured(() => {
      console.log("onErrorCaptured");
    });
    onRenderTriggered(() => {
      console.log("onRenderTriggered");
    });
    onActivated(() => {
      console.log("onActivated");
    });
    onDeactivated(() => {
      console.log("onDeactivated");
    });
    return {
      hideModal
    };
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>