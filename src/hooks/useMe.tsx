import { Player } from "../interfaces";
import { useMeStore } from "../stores/meStore";
import { saveLocal } from "../utils/localstorage";

export function useMe() {
  const meStore = useMeStore();
  
  return {
    me: meStore.me,
    role: meStore.role,
    setRole: meStore.setRole,
    setMe: (myInformation: Player) => {
      meStore.setMe(myInformation)
      saveLocal('userData', myInformation)
    },
  }
}
