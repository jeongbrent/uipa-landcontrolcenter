import { ref } from 'vue'
import { useAlertStore } from '@/stores/alertStore'
import { storeToRefs } from 'pinia'

export function useToast() {
  const { isShow, resMessage } = storeToRefs(useAlertStore())
  const { showResMsg } = useAlertStore()
  return {
    isShow,
    resMessage,
    showResMsg
  }
}
