<script setup lang="ts">
import { AppBarItems, getChildrenForDisplay} from "../../../config/config";
</script>

<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Eighth navbar example">
      <div class="container">

        <div class="collapse navbar-collapse" id="appBar">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown" v-for="parent in AppBarItems" :key="parent.id">
              <a class="nav-link dropdown-toggle" href="#" :id="'appBarDropdown' + parent.id" data-bs-toggle="dropdown" aria-expanded="false">{{ parent.title }}</a>
              <ul class="dropdown-menu" :aria-labelledby="'appBarDropdown' + parent.id">
                <li><router-link v-for="child in getChildrenForDisplay(parent.children)" :key="child.id" class="dropdown-item" :to="child.url">{{ child.title}}</router-link></li>
              </ul>
            </li>
          </ul>

          <ul class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="#">Храмов Сергей Иванович</a>
              <ul class="dropdown-menu">
                <li><router-link class="dropdown-item" to="/account">Аккаунт</router-link></li>
                <li><router-link class="dropdown-item" to="/logout">Выйти</router-link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>