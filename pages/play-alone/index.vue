<template>
  <div
    class="w-full h-full flex flex-col justify-start py-8 items-center relative bg-primary"
  >
    <div class="w-full px-6 flex justify-between items-center mb-8">
      <btn-game title="Back" @click="$router.go(-1)"> </btn-game>

      <div class="flex justify-end items-center gap-x-4">
        <btn-game title="Reset" @click="randomize">
          <Icon name="solar:refresh-circle-outline" size="1.5em" />
        </btn-game>
        <btn-game title="Reset" @click="randomize">
          <Icon name="solar:settings-linear" size="1.5em" />
        </btn-game>
      </div>
    </div>
 
    <div class="w-full example boxes-example px-4">
      <div class="boxes" v-auto-animate="{ duration: 500 }">
        <div
          class="box cursor-pointer"
          v-for="(item, index) in numbers"
          :key="item.number"
          :class="[item.isCheck ? 'box-check' : 'box-uncheck']"
          @click="onCheck(index)"
        >
          <div class="flip-card-inner w-full h-full block bg-yellow-200">
            <div class="flip-card-front">
              <p>{{ item.number }}</p>
            </div>
            <div class="flip-card-back">
              <img
                :src="bay"
                alt=""
                width="100%"
                height="100%"
                class="object-cover"
              />
            </div>
          </div>
          <!-- <div class="flip-card-inner">
            <div class="flip-card-front"> -->
          <!-- <p>{{ number }}</p> -->
          <!-- </div>
            <div class="flip-card-back">
              <p>{{ number }}</p>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bay from "~/assets/images/bay.png";
const numbers = ref<{ number: number; isCheck: boolean }[]>(
  new Array(50).fill("").map((_, i) => {
    return {
      number: i,
      isCheck: false,
    };
  })
);

const keyItem = ref(new Date().getTime());

const onCheck = (index: number) => {
  numbers.value[index].isCheck = true;
};

const randomize = () => {
  keyItem.value = new Date().getTime();
  const newArr = numbers.value.map((i) => {
    return { number:i.number, isCheck: false };
  });
  numbers.value = newArr
  console.log(newArr)
  numbers.value.sort(() => (Math.random() > 0.5 ? 1 : -1));
};

onMounted(() => {
  
})
</script>

<style scoped>
.boxes {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.box {
  background-color: red;
  perspective: 700px;
  box-sizing: border-box;
  width: calc(10% - 1em);
  margin: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875em;
  font-weight: 300;
  aspect-ratio: 1;
  border: 1px solid #f2f2f2;
}

.flip-card-inner {
  /* position: relative; */
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.box-check .flip-card-inner {
  transform: rotateY(180deg);
}

.box-uncheck .flip-card-inner {
  transform: rotateY(0deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
}
</style>
