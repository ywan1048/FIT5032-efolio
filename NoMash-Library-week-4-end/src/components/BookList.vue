<template>
  <div class="container mt-5">
    <h2>Books List</h2>
    <ul class="list-group">
      <li v-for="book in books" :key="book.id" class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <strong>{{ book.name }}</strong> - ISBN: {{ book.isbn }}
        </div>
        <div>
          
          <button class="btn btn-sm btn-warning me-2" @click="editBook(book)">Edit</button>
       
          <button class="btn btn-sm btn-danger" @click="deleteBook(book.id)">Delete</button>
        </div>
      </li>
    </ul>


    <div v-if="editingBook" class="mt-4">
      <h3>Edit Book</h3>
      <form @submit.prevent="updateBook">
        <div class="mb-3">
          <input type="number" v-model.number="editIsbn" class="form-control" />
        </div>
        <div class="mb-3">
          <input type="text" v-model="editName" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success">Save</button>
        <button type="button" class="btn btn-secondary ms-2" @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/init";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const books = ref([]);
const editingBook = ref(null);
const editIsbn = ref(null);
const editName = ref("");


const fetchBooks = async () => {
  const querySnapshot = await getDocs(collection(db, "books"));
  books.value = querySnapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};


const deleteBook = async (id) => {
  await deleteDoc(doc(db, "books", id));
  alert("Book deleted!");
  fetchBooks();
};


const editBook = (book) => {
  editingBook.value = book.id;
  editIsbn.value = book.isbn;
  editName.value = book.name;
};


const updateBook = async () => {
  await updateDoc(doc(db, "books", editingBook.value), {
    isbn: editIsbn.value,
    name: editName.value,
  });
  alert("Book updated!");
  editingBook.value = null;
  fetchBooks();
};


const cancelEdit = () => {
  editingBook.value = null;
};

onMounted(fetchBooks);
</script>
