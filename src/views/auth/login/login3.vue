<template>
  <div
    class="loginwrapper bg-cover bg-no-repeat bg-center"
    :style="{
      backgroundImage:
        'url(' + require('@/assets/images/all-img/background.jpg') + ')',
    }"
  >
    <div class="lg-inner-column">
      <div class="left-columns lg:w-1/2 lg:block hidden">
        <div class="logo-box-3">
          <router-link to="/" class="">
            <img src="@/assets/images/logo/logo.png" alt="" />
          </router-link>
        </div>
      </div>
      <div class="lg:w-1/2 w-full flex flex-col items-center justify-center">
        <div class="auth-box-3">
          <div class="mobile-logo text-center mb-6 lg:hidden block">
            <router-link to="/"
              ><img src="@/assets/images/logo/logo.png"
width="138" height="32" alt="" class="mx-auto"
            /></router-link>
          </div>
          <div class="text-center 2xl:mb-10 mb-5">
            <h4 class="font-medium">Sign In</h4>
            <div class="text-slate-500 dark:text-slate-400 text-base">
              Sign in to your account to start using
              <br/>
              Eddy.t Callibration Management System
            </div>
          </div>
          <Signin />
          <div
            className=" relative border-b-[#9AA2AF] border-opacity-[16%] border-b pt-6"
          >
            <div
              className=" absolute inline-block  bg-white dark:bg-slate-800 dark:text-slate-400 left-1/2 top-1/2 transform -translate-x-1/2 px-4 min-w-max text-sm  text-slate-500  dark:text-slate-400font-normal "
            >
              Or continue with
            </div>
          </div>
          <div class="max-w-[242px] mx-auto mt-8 w-full">
            <Social />
          </div>
          <!-- <div
            class="mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm text-center"
          >
            Dont have an account?
            <router-link
              to="/register3"
              class="text-slate-900 dark:text-white font-medium hover:underline"
            >
              Sign Up</router-link
            >
          </div> -->
        </div>
      </div>
      <div class="auth-footer3 text-white py-5 px-5 text-xl w-full">
        Optimize your Callibration process
      </div>
    </div>
  </div>
</template>
<script>
import Signin from "../common/Signin";
import Social from "../common/Social";

export default {
  components: {
    Social,
    Signin,
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
<style lang="scss"></style>
