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
                    console.log("response in store.js", response)
                    context.commit("MOVIES", response.data.movies);
                })
                .catch((e) => {
                    console.log("in store.js e:", e);
                })
        },
        addMovie: (context, payload) => {
            console.log(this.$swal)
            return axios({
                method: 'post',
                data: payload,
                url: '/movies',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                context.commit("ADD_MOVIE", response.data);
                this.$swal(
                    'great!',
                    'movie added successfully',
                    'success',
                )

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
            console.log("get movies", state.movies, payload)
            state.movies = payload
        },
        ADD_MOVIE: (state, payload) => {
            console.log("add,movies", state.movies)
            state.movies.unshift(payload);
        }
    },
    getters: {
        fetchMovies: state => {
            console.log("geeters", state.movies)
            return state.movies;
        }
    }
})