<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Username"
      type="text"
      placeholder="Username"
      name="name"
      v-model="username"
      :error="nameError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      name="emil"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Password"
      type="password"
      placeholder="8+ characters, 1 capitat letter "
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />

    <label class="cursor-pointer flex items-start">
      <input
        type="checkbox"
        class="hidden"
        @change="() => (checkbox = !checkbox)"
      />
      <span
        class="h-4 w-4 border rounded inline-flex mr-3 relative flex-none top-1 transition-all duration-150"
        :class="
          checkbox
            ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
            : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
        "
      >
        <img
          src="@/assets/images/icon/ck-white.svg"
          alt=""
          class="h-[10px] w-[10px] block m-auto"
          v-if="checkbox"
        />
      </span>
      <span class="text-slate-500 dark:text-slate-400 text-sm leading-6"
        >You accept our Terms and Conditions and Privacy Policy</span
      >
    </label>

    <button type="submit" class="btn btn-dark block w-full text-center">
      Create an account
    </button>
  </form>
</template>
<script>
import Textinput from "@/components/Textinput";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";

import { inject } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useStore } from "vuex";

export default {
  components: {
    Textinput,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required(" Email is required").email(),
      password: yup.string().required("Password is  required").min(8),
      username: yup.string().required("Username is required"),
    });
    const swal = inject("$swal");
    const toast = useToast();
    const router = useRouter();

    const store = useStore();
    // const register = () => {
    //   store.dispatch("register");
    // };
    // Create a form context with the validation schema
    const users = [];
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields

    const { value: email, errorMessage: emailError } = useField("email");
    const { value: username, errorMessage: nameError } = useField("username");
    const { value: password, errorMessage: passwordError } =
      useField("password");

    const onSubmit = handleSubmit((values) => {
      // add value into user array if same email not found
      if (!users.find((user) => user.email === values.email)) {
        store.dispatch("auth/register", values)
        .then(data =>{
          users.push(values);
          localStorage.setItem("users", JSON.stringify(users));
          router.push("/");
          // use vue-toast-notification app use
          toast.success(data.message, {
              timeout: 2000,
            });          
        },
        error => {
          toast.error((error.response && error.response.data) ||
                error.message ||
                error.toString(), {
              timeout: 2000,
            });   
        })

      } else {
        // use sweetalert 2
        swal.fire({
          title: "Email already exists",
          text: "Please try another email",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    });

    return {
      email,
      username,
      nameError,
      emailError,
      password,
      passwordError,
      onSubmit,
    };
  },
};
</script>
<style lang="scss"></style>
