import firebase from "@firebase/app";

export const normalizeDocumentSnapshot = documentSnapshot => ({
	[documentSnapshot.id]: {
		id: documentSnapshot.id,
		...documentSnapshot.data()
	}
});
export const getCollectionReference = path =>
	firebase.firestore().collection(path);

const getItemById = path => id => getCollectionReference(path).doc(id);

export const serverTimestamp = () =>
	firebase.firestore.FieldValue.serverTimestamp();
export const deleteItemInCollectionById = path => id =>
	getItemById(path)(id).delete();
export const updateItemInCollectionById = path => (id, newData) =>
	getItemById(path)(id).update({
		...newData,
		modified: serverTimestamp()
	});
export const addItemToCollection = path => data =>
	getCollectionReference(path)
		.add({
			...data,
			created: serverTimestamp(),
			modified: serverTimestamp()
		})
		.then(documentReference => documentReference.get())
		.then(normalizeDocumentSnapshot);
