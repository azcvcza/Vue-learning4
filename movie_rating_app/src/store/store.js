import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);
export const store = new Vuex.Store({
    state: {
        movies: []
    },
    actions: {
        fetchMovies: (context, payload) => {
            axios({
                    method: 'get',
                    url: '/movies',
                })
                .then((response) => {
                    context.commit("MOVIES", response.data.movies);
                })
                .catch((e) => {
                    console.log("in store.js e:", e);
                })
        },
        addMovie: (context, payload) => {
            return axios({
                method: 'post',
                data: payload,
                url: '/movies',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                this.$swal(
                    'great!',
                    'movie added successfully',
                    'success',
                )
                this.$router.push({ name: 'Home' });
                this.$refs.form.reset();
            }).catch((e) => {
                console.log("error in addmovie submit:", e);
                this.$swal(
                    'oh oo!',
                    'could not add the movie',
                    'error',
                )
            })
        }

    },
    mutations: {
        MOVIES: (state, payload) => {
            state.movies = payload
        },
        ADD_MOVIE: (state, payload) => {
            state.movies.unshift(payload);
        }
    },
    getters: {
        fetchMovies: state => state.movies,
    }
})