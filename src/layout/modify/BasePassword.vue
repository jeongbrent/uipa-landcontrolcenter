<template>
  <BaseChangeForm>
    <template #title>
      <div>비밀번호 변경</div>
    </template>
    <template #content>
      <v-form @submit.prevent v-model="editStatus">
        <div class="mb-2">현재 비밀번호 입력</div>
        <i-input v-model="passwordInfo.currentPassword" :type="isShowPassword ? 'text' : 'password'"
          :append-inner-icon="isShowPassword ? 'mdi-eye' : 'mdi-eye-off'" password :hide-details="false"
          @click:append-inner="isShowPassword = !isShowPassword" placeholder="현재의 비밀번호를 입력하여 주십시오" required></i-input>

        <div class="mb-2">새 비밀번호 입력</div>
        <i-input v-model="passwordInfo.newPassword" :type="isShowNewPassword ? 'text' : 'password'"
          :append-inner-icon="isShowNewPassword ? 'mdi-eye' : 'mdi-eye-off'" newPassword :hide-details="false"
          @click:append-inner="isShowNewPassword = !isShowNewPassword" placeholder="새 비밀번호를 입력하여 주십시오" required></i-input>

        <div class="mb-2">새 비밀번호 입력 확인</div>
        <i-input v-model="passwordInfo.newPasswordCheck" :type="isShowNewPasswordCheck ? 'text' : 'password'"
          :append-inner-icon="isShowNewPasswordCheck ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append-inner="isShowNewPasswordCheck = !isShowNewPasswordCheck" newPassword
          :rules="[rePasswordRules.check]" placeholder="새 비밀번호를 다시 입력하여 주십시오" :hide-details="false" required></i-input>
      </v-form>
    </template>
    <template #actions>
      <div class="d-flex justify-space-between">
        <i-btn text="변경 취소" @click="resetComponent" color="#5E616A" width="48%"></i-btn>
        <i-btn text="비밀번호 변경" @click="changePassword" :disabled="!editStatus" width="48%"></i-btn>
      </div>
      <!-- <i-btnGroup class="d-flex justify-space-between" :btnGroup="btnGroup" @cancle="resetComponent" @edit="changePassword"></i-btnGroup> -->
    </template>
  </BaseChangeForm>
</template>

<script setup>
import { ref, inject, reactive, onMounted, onBeforeMount } from 'vue'
import { goPage } from '@/composables/util.js'
import { storeToRefs } from 'pinia'
import BaseChangeForm from '@/layout/modify/BaseChangeForm.vue'
import { useAuthStore } from '../../stores/authStore'
import ResponseModal from '../../components/modal/responseModal.vue'

const authStore = useAuthStore()
const passwordInfo = ref({
  username: '',
  currentPassword: '',
  newPassword: '',
  newPasswordCheck: ''
})

const isShowPassword = ref(false)
const isShowNewPassword = ref(false)
const isShowNewPasswordCheck = ref(false)

const tf = reactive({
  result: false
})

onBeforeMount(() => {
  tf.result = false
})

const editStatus = ref(false)

const rePasswordRules = reactive({
  check: value => {
    if (value && passwordInfo.value.newPassword
              && value === passwordInfo.value.newPassword){
      return true
    }
    return '비밀번호가 일치하지않습니다'
  }
})

const changePassword = async () => {
  passwordInfo.value.username = authStore.userInfo.username;
  const result = await authStore.changeUserPassword(passwordInfo.value)

  if(result == 200){
    setTimeout(() => {
      resetComponent();
    }, 500)
  }
}

const changeComponent = inject('changeComponent', 'DefaultText')

const resetComponent = (e) => {
  changeComponent(e, 'DefaultText')
}

const message = ref('')
const dialogStatus = ref(true)
</script>

<style></style>
