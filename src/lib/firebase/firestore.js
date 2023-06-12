import { doc, collection, query, setDoc, orderBy, updateDoc, addDoc, getDoc, getDocs } from "firebase/firestore";

/**
 * firestoreのinit確認
 * @param db 
 * @returns 
 */
export const notInitFirestore = (db) => {
    if(!db){
        alert("Firestoreが初期化されていない可能性があります。正しく設定されているか確認してください。")
        return false;
    }
    return true
}

export const COLLECTION_NAME = {
    MEMBERS: 'members'
}

/**
 * firestoreのコレクションにデータを追加します。
 * @param db 
 * @param collectionName 
 * @param documentId 
 * @param data 
 */
export const setDocument = async (db, collectionName, documentId, data) => {
    if(!notInitFirestore(db)){
        return;
    }
    if(documentId){
        await setDoc(doc(db, collectionName, documentId), data);
    } else {
        await addDoc(collection(db, collectionName), data);
    }   
}

export const updateDocument = async (db, collectionName, documentId, data) => {
    if(!notInitFirestore(db)){
        return;
    }
    if(!documentId){
        return
    }
    await updateDoc(doc(db, collectionName, documentId), data);   
}

/**
 * コレクションから全てのドキュメントを取得します。
 * @param db 
 * @param collectionName 
 * @returns 
 */
export const getCollection = async (db, collectionName) => {
    if(!notInitFirestore(db)){
        return;
    }
    let res = []
    try {
        const q = query(collection(db, collectionName));
        const querySnapshot = await getDocs(q);
        
        querySnapshot?.forEach((item) => {
            const data = item.data()
            const member = {
                id: data.id,
                name: data.name,
                photoURL: '',
                isParticipation: data.isParticipation,
                answered: data.answered
            }

            res.push(member)
        })
    } catch(e){
        res = []
    } finally {
        return res
    }

}


/**
 * 指定コレクション内の指定ドキュメントを取得します
 * @param db 
 * @param collectionName 
 * @param documentId 
 * @returns 
 */
export const getDocument = async (db, collectionName, documentId) => {
    if(!notInitFirestore(db)){
        return;
    }
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        alert("No such document!");
        return {}
    }
}
