<template>
  <div class="w-full h-full  bg-primary">
    <div class="text-red-500">
      Home
      {{ user }}

      {{ $t("welcome") }}
    </div>

    <btn-game title="hello">
        <Icon name="uil:github" />
    </btn-game>

    <van-button type="primary" @click="onSignIn">sign with google</van-button>
    <van-button type="danger" @click="onSignOut">sign out</van-button>



    <div class="flex flex-col justify-start items-center">
      <van-field
        v-model="email"
        label="email"
        placeholder="enter email"
      ></van-field>
      <van-field
        v-model="password"
        label="password"
        placeholder="enter password"
      ></van-field>
      <van-button type="primary" @click="signEmailPassword">sign in</van-button>
    </div>

    <div class="flex flex-col justify-start items-center">
      <van-field
        v-model="name"
        label="name"
        placeholder="enter name"
      ></van-field>
      <van-field
        v-model="passcode"
        label="passcode"
        placeholder="enter passcode"
      ></van-field>
      <van-button type="primary" @click="createGroup">button</van-button>
    </div>

    <button @click="onCount(false)">-</button>

    {{ appStore.count }}

    <button @click="onCount(true)">+</button>
  </div>
</template>

<script setup lang="ts">
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

const name = ref("");
const passcode = ref("");

const email = ref("");
const password = ref("");

const onCount = (bool: boolean) => {
  if (bool) {
    appStore.count = 1 + appStore.count;
  } else {
    appStore.count = appStore.count - 1;
  }
};

const createGroup = async () => {
  await groupStore.onCreateGroup({
    name: name.value,
    passcode: passcode.value,
    userId: user.value?.uid,
  });
};

const onSignIn = async () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

const onSignOut = async () => { 
    await signOut(auth)
}

const signEmailPassword = async () => {
  await createUserWithEmailAndPassword(auth, email.value, password.value);
};
</script>

<style scoped></style>
