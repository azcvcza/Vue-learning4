<template>
	
	<v-form v-model="valid" ref="form" lazy-validation="">
		<h2>Login Page</h2>
		<v-textarea label="Email" v-model="email" :rules="emailRules" required="required"></v-textarea>
		<v-textarea label="Password" v-model="password" required="required"></v-textarea>
		<v-btn @click="submit" :disabled="!valid">submit</v-btn>
		<v-btn @click="clear">clear</v-btn>

	</v-form>
</template>
<script>
import axios from 'axios';
export default {
	data:()=>({
		valid:true,
		password:'',
		email:'',
		emailRules:[
			v=>!!v || 'E-mail is required',
			v=> /\S+@\S+\.\S+/.test(v) || 'Email must be valid'
		]
	}),
	methods:{
		async submit(){
			return axios({
				method:'post',
				data:{
					email:this.email,
					password:this.password,
				},
				url:'/users/login',
				headers:{
					'Content-Type':'application/json',
				}
			})
			.then((response)=>{
				window.localStorage.setItem('auth',response.data.token);
				this.$swal('great','you are ready to start!','success');
				this.$router.push({name:'Home'})
			})
			.catch((error)=>{
				const msg = error;
				console.log("in login.vue error:",error,error.response);
				this.$swal('Oh oo!',`${msg}`,'error');
				this.$router.push({name:'Login'})
			})
		},
		clear(){
			this.$refs.form.reset();
		}
	}
}
</script>
