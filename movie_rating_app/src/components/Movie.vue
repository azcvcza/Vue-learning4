<template>
	<v-layout row wrap>
		<v-flex xs4="">
			<v-card>
				<v-card-title primary-title>
					<div>
						<div class="headline">
							{{movie.name}}
						</div>
						<span class="grey--text">{{movie.release_year}}*{{movie.genre}}</span>
						
					</div>
					<span class="yellow--text">Rating:::>{{rate}}</span>
				</v-card-title>
			
				<v-btn class="card-title"  primary @click="rate">Rate the Movie</v-btn>
				<v-card-text>{{movie.description}}</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>
<script>
//v-if="current_user" use in v-btn
	import axios from 'axios';
	import Vue from 'vue';
	import StarRating from 'vue-star-rating';
	const wrapper = document.createElement('div');
	const state = {
		note:0,
	};
	const RatingComponent = Vue.extend({
		data(){
			return {rating:0};
		},
		watch:{
			rating(newVal){state.note = newVal}
		},
		template:`<div class="rating">
							How was your experience getting help with this issues
							<star-rating v-model="rating":show-rating = "false"></star-rating>
							</div>`,
		components:{'star-rating':StarRating}
	});
	const component = new RatingComponent().$mount(wrapper);
	export default{
		name:'Movie',
		data(){
			return{
				movie:[],
				rates:0,
			}
		},
		mounted(){
			this.fetchMovie();
		},
		methods:{
			async fetchMovie(){
				return axios({
					method:'get',
					url:`http://localhost:8081/api/movies/${this.$route.params.id}`,
				})
				.then((response)=>{
					console.log("in Movie.vue",response)
					this.movie = response.data;
				})
				.catch((e)=>{
					console.log("in movie.vue e:",e,e.response);
				})
			},
			async rate(){
				this.$swal({
					content:component.$el,
					buttons:{
						confirm:{
							value:0,
						}
					}
				})
				.then(()=>{
					const movieId = this.$route.params.id;
					return axios({
						method:'post',
						data:{
							rate:state.note,
						},
						url:`http://localhost:8081/movies/rate/${movieId}`,
						headers:{
							'Content-Type':'application/json'
						}
					})
					.then(()=>{
						this.$swal(`Thank you for rating! ${state.note}`,'success')
				
						
					})
					.catch((error)=>{
						const message = error.response.data.message;
						console.log("in movie.vue, rate e:",message);
						this.$swal('oh oo!',`${message}`,'error');
					})
				})
			}
		}
	}
</script>