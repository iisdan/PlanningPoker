import { Player } from "../interfaces";
import { useMeStore } from "../stores/meStore";
import { saveLocal } from "../utils/localstorage";

export function useMe() {
  const meStore = useMeStore();

  function setMe(myInformation: Player) {
    saveLocal('me', myInformation);
    meStore.setMe(myInformation)
  }

  return {
    me: meStore.me,
    setMe,
  }
}
