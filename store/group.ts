
import { collection, addDoc } from 'firebase/firestore';

export const useGroupStore = defineStore(
  "group-store",
  () => {

    const firestore = useFirestore()

    const onCreateGroup = async (body:any) => {


      const { name, passcode, userId } = body;
 
      console.log(name, passcode, userId)
      console.log(firestore, 'firestore firestore')
      const groupsRef = collection(firestore, 'groups');
      const docRef = await addDoc(groupsRef, {
        name,
        passcode,
        members: [userId]
      });

      console.log(docRef)
      return { id: docRef.id };
    }

    return {
      onCreateGroup,
    };
  },
  {
    persist: {
      pick: ['count'],
    },
  }
);
