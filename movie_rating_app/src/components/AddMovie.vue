<template>
	<v-form v-model="valid" ref="form" lazy-validation>
		<v-textarea label="Movie Name" v-model="name" :rules="nameRules" required></v-textarea>
		<v-textarea name="input-7-1" label="Movie Description" v-model="description" multi-line></v-textarea>
		<v-select label="Movie Release Year" v-model="release_year" :items="years"></v-select>
		<v-textarea label="Movie Genre" v-model="genre"></v-textarea>
		<v-btn @click="submit" :disabled="!valid">submit</v-btn>
		<v-btn @click="clear">clear</v-btn>
	</v-form>
</template>
<script>
import axios from 'axios';
export default {
	data:()=>({
		valid:true,
		name:'',
		description:'',
		genre:'',
		release_year:'',
		nameRules:[
			v=>!!v || 'Movie name is required'
		],
		select:null,
		years:['2018','2017','2016','2015'],
	}),
	methods:{
		submit(){
			if(this.$refs.form.validate()){
				const movie = {
					name:this.name,
					description:this.description,
					release_year:this.release_year,
					genre:this.genre,
				}
				this.$store.dispatch("addMovie",movie);
				this.$refs.form.reset();
				this.$router.push({name:'Home'});
				
			}
			return true;
		},
		clear(){
			this.$refs.form.reset();
		}
	}

}
</script>
