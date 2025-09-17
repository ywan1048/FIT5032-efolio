<template>
  <div class="container mt-5">
    <h2>Query Books</h2>

    <!-- Query Buttons -->
    <div class="mb-3">
      <button class="btn btn-primary me-2" @click="queryByAuthor">
        Query Author = "cat"
      </button>
      <button class="btn btn-success me-2" @click="queryOrdered">
        Order by Book Name (limit 5)
      </button>
      <button class="btn btn-warning" @click="queryByIsbn">
        ISBN > 1000
      </button>
    </div>

    <!-- Query Results -->
    <ul class="list-group mt-3">
      <li
        v-for="book in books"
        :key="book.id"
        class="list-group-item"
      >
        <strong>{{ book.name }}</strong> - ISBN: {{ book.isbn }}
      </li>
    </ul>

    <div v-if="books.length === 0" class="alert alert-info mt-3">
      No results found.
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// ✅ Named import (not default import)
import { db } from "@/firebase/init";

import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";

const books = ref([]);

// Query 1: Filter by author
const queryByAuthor = async () => {
  const q = query(
    collection(db, "books"),
    where("name", "==", "cat")
  );
  const snapshot = await getDocs(q);
  books.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Query 2: Order by name + limit
const queryOrdered = async () => {
  const q = query(
    collection(db, "books"),
    orderBy("name"),
    limit(5)
  );
  const snapshot = await getDocs(q);
  books.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Query 3: ISBN > 1000
const queryByIsbn = async () => {
  const q = query(
    collection(db, "books"),
    where("isbn", ">", 1000),
    orderBy("isbn"), // Firestore requires ordering
    limit(5)
  );
  const snapshot = await getDocs(q);
  books.value = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
</script>
