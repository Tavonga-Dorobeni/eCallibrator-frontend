<template>
  <div class="space-y-5 profile-page">
    <div
      class="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]"
    >
      <div
        class="bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"
      ></div>
      <div class="profile-box flex-none md:text-start text-center">
        <div class="md:flex items-end md:space-x-6">
          <div class="flex-none">
            <div
              class="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative"
            >
              <img
                v-if="!currentUser.Image"
                src="@/assets/images/avatar/avatar.png"
                alt=""
                class="w-full h-full object-cover rounded-full"
              />
              <img
                v-else
                :src="`data:image/png;base64,${currentUser.Image}`"
                alt=""
                class="w-full h-full object-cover rounded-full"
              />

              <!-- <Button
                icon="heroicons-outline:pencil-square"
                btnClass="btn-primary  p-0 h-12 w-12 flex items-center justify-center rounded-full"
                class="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
              /> -->
              <Modal
                title=" "
                label="📷"
                labelClass="btn-primary p-0 h-12 w-12 flex items-center justify-center rounded-full absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                ref="modal1"
                centered
              >
                <h4 class="font-medium text-lg mb-3 text-slate-900">
                  Upload Profile Picture
                </h4>
                <div class="text-base text-slate-600 dark:text-slate-300">
                  <Fileinput class="mt-3" label="Upload" name="Image" placeholder="Profile Picture" @change="uploadImage" ></Fileinput>
                </div>
              </Modal>
              <!-- <router-link
                to=""
                class="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                ><Icon icon="heroicons:pencil-square" />
              </router-link> -->
            </div>
          </div>
          <div class="flex-1">
            <div
              class="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]"
            >
              {{ currentUser.FirstName + " " }} {{ currentUser.LastName }}
            </div>
            <div class="text-sm font-light text-slate-600 dark:text-slate-400">
              {{ currentUser.Profession }}
            </div>
          </div>
        </div>
      </div>
      <!-- end profile box -->
      <div
        class="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4"
      >
        <div class="flex-1">
          <div
            class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
          >
            32,400
          </div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300">
            Total Applications
          </div>
        </div>
        <!-- end single -->
        <div class="flex-1">
          <div
            class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
          >
            200
          </div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300">
            Pending Applications
          </div>
        </div>
        <!-- end single -->
        <div class="flex-1">
          <div
            class="text-base text-slate-900 dark:text-slate-300 font-medium mb-1"
          >
            3200
          </div>
          <div class="text-sm text-slate-600 font-light dark:text-slate-300">
            Accepted Applications
          </div>
        </div>
        <!-- end single -->
      </div>
      <!-- profile info-500 -->
    </div>
    <div>
      <Card>
        <h4 class="text-slate-900 dark:text-white text-xl mb-4">Details</h4>
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <!-- <div
              class="lg:col-span-2 col-span-1 text-slate-600 dark:text-slate-300 text-xs font-medium"
            >
              Recipient info-500
            </div> -->
            <!-- <FromGroup label="Issued date" name="d1">
              <flat-pickr
                v-model="dateDefault"
                class="form-control"
                id="d1"
                placeholder="yyyy, dd M"
              />
            </FromGroup> -->
            <Textinput label="First Name" v-model="currentUser.FirstName" type="text" placeholder="Add your first name" />
            <Textinput label="Last Name" v-model="currentUser.LastName" type="text" placeholder="Add your last name" />
            <Textinput label="Profession" v-model="currentUser.Profession" type="text" placeholder="Add your profession" />
            <Textinput label="Phone Number" v-model="currentUser.Phone" type="text" placeholder="Add your phone number" />
            <div class="lg:col-span-2 col-span-1">
              <Textinput label="Email" v-model="currentUser.Email" type="email" placeholder="Add your email" />
            </div>
            <div class="lg:col-span-2 col-span-1">
              <Fileinput class="mt-3" label="Upload" name="Resume" placeholder="Resume/CV" @change="uploadResume" ></Fileinput>
              <Button text="View Resume" @click="readDoc('Resume')" btnClass="mt-3 btn btn-dark block w-full text-center" />
            </div>
          </div>
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
            <!-- <div
              class="lg:col-span-2 col-span-1 text-slate-600 dark:text-slate-300 text-xs font-medium"
            >
              Owner info-500
            </div> -->
            <div class="lg:col-span-2 col-span-1">
              <Textarea
                label="Address"
                type="email"
                v-model="currentUser.Address"
                placeholder="address"
                rows="6"
              />
            </div>
            <Textinput label="City" v-model="currentUser.City" type="text" placeholder="Add your city" />
            <Textinput label="Country" v-model="currentUser.Country" type="text" placeholder="Add your county" />
            <div class="lg:col-span-2 col-span-1">
              <Fileinput class="mt-3" label="Upload" name="Other" placeholder="Additional document" @change="uploadOther" ></Fileinput>
              <Button text="View Additional Doc" @click="readDoc('OtherDocs')" btnClass="mt-3 btn btn-dark block w-full text-center" />
            </div>
          </div>
        </div>
        <div class="mt-3 lg:col-span-2 col-span-1">
          <Textarea
            label="About"
            type="text"
            v-model="currentUser.About"
            placeholder="Write about yourself"
            rows="5"
          />
        </div>
        <div class="mt-3 lg:col-span-2 col-span-1">
          <Textarea
            label="Experience"
            type="text"
            v-model="currentUser.Experience"
            placeholder="Write about your experience"
            rows="5"
          />
        </div>
        <div class="mt-4 text-right space-x-3">
          <Button text="Save" @click="updateProfile" btnClass="btn-dark" />
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
import FromGroup from "@/components/FromGroup";
import Textarea from "@/components/Textarea";
import Textinput from "@/components/Textinput";
import Fileinput from "@/components/Fileinput";
import Modal from '@/components/Modal/Modal';
import avartar from '@/assets/images/avatar/avatar.png';
import UserService from "@/services/user.service";
import { useToast } from "vue-toastification";
import { basicArea, basicAreaDark } from "@/constant/appex-chart.js";
import {mapGetters, mapActions} from "vuex";

export default {
  components: {
    Card,
    Icon,
    Button,
    Textinput,
    FromGroup,
    Textarea,
    Fileinput,
    Modal
  },
  data() {
    return {
      basicArea,
      basicAreaDark,
      currentFile: undefined,
      FormData: {
        file: null
      }
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    ...mapActions([
    ]),

    // selectFile(file) {
    //   this.currentFile = file;
    // },

    updateProfile(){
      const toast = useToast();
      UserService.update(this.currentUser.id, this.currentUser)
      .then(data =>{
        console.log(data)
        toast.success(data.data.message, {
            timeout: 3000,
          });          
      },
      error => {
        toast.error(error.message, {
            timeout: 3000,
          });   
      })
    },
  }
};
</script>
<style lang="scss" scoped></style>
