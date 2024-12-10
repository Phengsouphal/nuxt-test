<template>
  <div class="w-full h-full relative bg-primary">
    <div
      class="w-fit flex flex-col justify-center items-center absolute z-10 top-6 left-4 gap-y-4"
    >
      <btn-game title="hello" @click="playAudio">
        <div class="relative">
          <Icon name="solar:music-note-3-linear" size="1.5em" />
          <Icon
            v-if="!playMusic"
            class="text-red-400 absolute -bottom-1 -right-3"
            name="solar:close-circle-bold"
            size="1em"
            color="red"
          />
        </div>
      </btn-game>
      <btn-game title="hello">
        <Icon name="solar:volume-loud-linear" size="1.5em" />
        <!-- solar:volume-cross-linear -->
      </btn-game>
    </div>

    <div v-if="user" class="w-full absolute flex justify-center items-center left-0 top-6">
        <p class="text-2xl font-semibold text-sky-100">Welcome Back {{ user?.displayName }}</p>
    </div>
    <!-- {{ user }} -->
    <div
      class="w-fit flex flex-col justify-center items-center absolute top-6 right-4 gap-y-4"
    >
      <template v-if="!user">
        <btn-game title="hello" @click="onSignIn">
          <Icon name="uil:google" size="1.5em" />
        </btn-game>
        <btn-game title="hello">
          <Icon name="uil:envelope-alt" size="1.5em" />
        </btn-game>
      </template>
      <template v-else>
        <btn-game title="hello" @click="onLogOut">
          <Icon name="solar:logout-2-bold" class="text-red-500" size="1.5em" />
        </btn-game>
      </template>
    </div>

    <div
      class="main-container flex flex-col justify-center items-center w-full h-full"
    >
      <!-- <h1 class="text-justify font-bold text-5xl"> </h1> -->
      <div class="wrapper">
        <span data-text="Let's Drink"></span>
        <span data-text="Muy Muy"></span>
      </div>
      <div class="flex justify-center items-center gap-x-6">
        <btn-game title="hello" class="mt-16" @click="show = true">
          <div class="flex justify-center items-center gap-x-3">
            <Icon name="solar:play-bold" size="1.5em" />
            <p class="text-3xl">Play</p>
          </div>
        </btn-game>
        <btn-game title="hello" class="mt-16">
          <div class="flex justify-center items-center gap-x-3">
            <Icon name="solar:users-group-rounded-bold-duotone" size="1.5em" />
            <p class="text-3xl">Create Group</p>
          </div>
        </btn-game>
      </div>

      <div class="w-full flex justify-center items-center gap-x-6 mt-6">
        <btn-game title="hello">
          <Icon name="solar:settings-linear" size="1.5em" />
        </btn-game>
        <btn-game title="hello">
          <Icon name="solar:gamepad-broken" size="1.5em" />
        </btn-game>
        <btn-game title="hello">
          <Icon name="solar:info-circle-linear" size="1.5em" />
        </btn-game>
      </div>
    </div>

    <van-dialog
      v-model:show="show"
      title=""
      :show-cancel-button="false"
      :show-confirm-button="false"
      :close-on-click-overlay="true"
    >
      <div class="flex flex-col gap-6 py-6 justify-center items-center">
        <btn-game title="hello" class="">
          <div class="flex justify-center items-center gap-x-3">
            <p class="text-3xl">Join Group</p>
          </div>
        </btn-game>
        <btn-game title="hello" class="" @click="$router.push('/play-alone')">
          <div class="flex justify-center items-center gap-x-3">
            <p class="text-3xl">Play Alone</p>
          </div>
        </btn-game>
      </div>
    </van-dialog>
  </div>

  <audio ref="audioRef" :src="mp3" controls hidden></audio>
</template>

<script setup lang="ts">
import mp3 from "~/assets/music.mp3";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useFirebaseAuth } from "vuefire";
import { useAppStore } from "~/store/app";
import { useGroupStore } from "~/store/group";

const auth = useFirebaseAuth();

const groupStore = useGroupStore();
const user = useCurrentUser();

const appStore = useAppStore();

const audioRef = ref(null) as any;

const show = ref(false);

const playMusic = ref(false);
const playAudio = () => {
  if (!playMusic.value) {
    audioRef.value?.play();
    playMusic.value = true;
  } else {
    audioRef.value?.pause();
    playMusic.value = false;
  }
};

const onSignIn = async () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

const onLogOut = () => {
  showConfirmDialog({
    title: "Logout",
    message: "Are you sure you want to log out?",
    cancelButtonText: "No",
    confirmButtonText: "Yes",
  })
    .then(async () => {
      await signOut(auth);
    })
    .catch(() => {
      // on cancel
    });
};
</script>

<style scoped>
.wrapper {
  font-size: 120px;
  height: 2em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  mix-blend-mode: screen;

  &.invert {
    span {
      color: black;

      &::before {
        -webkit-text-stroke: 0.1em var(--color);
      }
    }
  }

  span {
    --color: #ffba11;
    font-family: Impact, "Anton", Haettenschweiler, "Arial Narrow Bold",
      sans-serif;
    font-weight: 700;
    font-style: italic;
    display: block;
    position: absolute;
    color: var(--color);
    letter-spacing: -0.005em;

    &::before,
    &::after {
      content: attr(data-text);
      display: block;
      position: relative;
      padding: 0 0.1em;
      z-index: 1;
    }

    &::before {
      position: absolute;
      -webkit-text-stroke: 0.1em black;
      z-index: 0;
    }

    &:first-child {
      transform: translate(-0.255em, -0.25em);
    }

    &:last-child {
      --color: #b6acff;
      transform: translate(0.255em, 0.4em);
    }
  }
}
</style>
