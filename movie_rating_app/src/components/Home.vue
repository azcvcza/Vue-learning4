<template>
	<v-layout row wrap>
		<v-flex xs4>
			<v-card>
				<v-card-title primary-title>
					<div>
						<div class="headline">Batmav vs superman</div>
						<span class="grey--text">2016 * Science fiction film/Action fiction * 3h,3m</span>
					</div>
				</v-card-title>
				<v-card-text>Lorem Ipsum，也称乱数假文或者哑元文本， 是印刷及排版领域所常用的虚拟文字。由于曾经一台匿名的打印机刻意打乱了一盒印刷字体从而造出一本字体样品书，Lorem Ipsum从西元15世纪起就被作为此领域的标准文本使用。它不仅延续了五个世纪，还通过了电子排版的挑战，其雏形却依然保存至今。在1960年代，”Leatraset”公司发布了印刷着Lorem Ipsum段落的纸张，从而广泛普及了它的使用。最近，计算机桌面出版软件”Aldus PageMaker”也通过同样的方式使Lorem Ipsum落入大众的视野。</v-card-text>
			</v-card>
		</v-flex>
		<v-flex xs4 v-for="movie in movies" :key="movie._id">
			<v-card>
				<v-card-title primary-title>
					<div>
						<div class="headline">
							<v-btn flat v-bind:to="`/movies/${movie._id}`"><h2>{{movie.name}}</h2></v-btn>
						</div>
						<span class="grey--text">{{movie.release_year}}*{{movie.genre}}</span>
					</div>
				</v-card-title>
				<v-card-text>{{movie.description}}</v-card-text>
			</v-card>
		</v-flex>

		<v-flex xs12>
			<div>{{message}}</div>
		</v-flex>
		<v-flex xs12>
			<v-btn color="primary" v-on:click="reply">Reply</v-btn>
		</v-flex>
	</v-layout>
</template>
<script>
	import axios from "axios";
	export default {
		name: "Movies",
		data() {
			return {
				message: "Hello there,fuck you",
				movies: []
			};
		},
		methods: {
			reply() {
				this.message = "I'm doing great, thank you!";
			},
			async fetchMovies() {
				return axios({
					method: "get",
					url: "/movies",
					headers: {
						"Access-Control-Allow-Origin": "*"
					}
				})
					.then(response => {
						console.log("response in fetch:", response);
						this.movies = response.data.movies;
					})
					.catch(e => {
						console.log("error in fetch", JSON.stringify(e));
					});
			}
		},
		mounted() {
			this.fetchMovies();
		}
	};
</script>



