<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app>
    <v-list dense>
      
      <router-link v-bind:to="{name:'Home'}" class="side_bar_link">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Home</v-list-tile-content>
        </v-list-tile>
      </router-link>
      <router-link v-bind:to="{name:'Contact'}" class="side_bar_link">
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Contact</v-list-tile-content>
        </v-list-tile>
      </router-link>
    </v-list>
</v-navigation-drawer>
<v-toolbar color="indigo" dark fixed app>
  <v-toolbar-side-icon @click.stop="drawer=!drawer"></v-toolbar-side-icon>
  <v-toolbar-title>Home</v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items class="hiddem-sm-and-down">
    <v-btn id="user_email" falt v-if="current_user">{{current_user.email}}</v-btn>
    <v-btn flat v-bind:to="{name:'Register'}" v-if="!current_user" id="register_btn">Register</v-btn>
    <v-btn flat v-bind:to="{name:'Login'}" v-if="!current_user" id="login_btn">Login</v-btn>
    <v-btn id="logout_btn" flat="" v-if="current_user" @click="logout">Logout</v-btn>
    <v-btn flat v-bind:to="{name:'AddMovie'}" v-if="current_user">AddMovie</v-btn>
  </v-toolbar-items>
</v-toolbar>
<v-content>
  <v-container fluid>
    <div id="app">
      <router-view></router-view>
    </div>
  </v-container>
</v-content>
<v-footer color="indigo" app>
  <span class="white--text">&copy;2018</span>
</v-footer>
  </v-app>
</template>
<script>
import './assets/stylesheets/main.css';
import bus from './bus.js';
import Axios from 'axios';
export default {
  
  data:()=>({
    drawer:null,
    current_user:null
  }),
  props:{
    source:String,
  },
  mounted() {
    this.fetchUser();
    this.listenToEvents();
  },
  methods:{
    listenToEvents(){
      bus.$on('refreshUser',()=>{
        this.fetchUser();
      })
    },
    async fetchUser(){
      return Axios({
        method:'get',
        url:'/api/current_user',
      })
      .then((response)=>{
        this.current_user = response.data.current_user;
        this.$router.push({name:'Home'});
      })
      .catch((e)=>{
        console.log("in app.vue,fetchUser,e:",e);
      })
    },
    logout(){
      return Axios({
        method:'get',
        url:'/api/logout',
      })
      .then(()=>{
        bus.$emit('refreshUser');
        this.$router.push({name:'Home'});
      })
      .catch((e)=>{
        console.log("in app.vue,logout e:",e)
      })
    }
  }
}
</script>
