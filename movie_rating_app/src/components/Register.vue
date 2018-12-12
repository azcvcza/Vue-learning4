<template>
	<v-form v-model="valid" ref="form" lazy-validation>
		<h2>Register Page</h2>
		<v-textarea label="Name" v-model="name" required="required"></v-textarea>
		<v-textarea label="Email" v-model="email" :rules="emailRules" required="required"></v-textarea>
		<v-textarea label="Password" v-model="password" required="required"></v-textarea>
		<v-textarea name="input-7-1" label="confirm_password"></v-textarea>
		<v-btn @click="submit" :disabled="!valid">submit</v-btn>
		<v-btn @click="clear">clear</v-btn>
	</v-form>
</template>
<script>
import axios from 'axios';
export default{
	data:()=>({
		valid:true,
		name:'',
		email:'',
		password:'',
		confirm_password:'',
		emailRules:[
			v=>!!v || 'Email is required',
			v=>/\S+@\S+\.\S+/.test(v) || 'Email is required'
		],
	}),
	methods:{
		async submit(){
			if(this.$refs.form.validate()){
				//todo
				return axios({
					method:'post',
					data:{
						name:this.name,
						email:this.email,
						password:this.password,
					},
					url:'/users/register',
					headers:{
						'Content-Type':'application/json',
					}
				})
				.then(()=>{
					this.$swal('Great!','You have regiester','success')
					this.$router.push({name:"Login"})
				})
				.catch((error)=>{
					const msg = error;
					//const meg = error.response.data.message;
					this.$swal('oh oo',`${msg}`);
				})
			}
		},
		clear(){
			this.$refs.form.reset();
		}
	}
}
</script>