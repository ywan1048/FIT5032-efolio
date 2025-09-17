<template>
  <div class="container mt-5">
    <h2>Add a New Book</h2>
    <form @submit.prevent="addBook">
      <div class="mb-3">
        <input
          type="number"
          placeholder="ISBN"
          v-model.number="isbn"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          placeholder="Book Name"
          v-model="name"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Add Book</button>
    </form>

 
    <hr />
    <BookList />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { db } from "@/firebase/init"; 
import { collection, addDoc } from "firebase/firestore";
import BookList from "../components/BookList.vue"; 

const isbn = ref(null);
const name = ref("");

const addBook = async () => {
  try {
    await addDoc(collection(db, "books"), {
      isbn: isbn.value,
      name: name.value,
    });

    alert("Book added successfully!");
    isbn.value = null;
    name.value = "";

  
    window.dispatchEvent(new Event("book-added"));

  } catch (e) {
    console.error("Error adding book: ", e);
  }
};
</script>
