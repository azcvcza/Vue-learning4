<template>
	<v-form v-model="valid" ref="form" lazy-validation>
		<v-textarea label="Name" v-model="name" required="required"></v-textarea>
		<v-textarea label="Email" v-model="email" :rules="emailRules" required="required"></v-textarea>
		<v-textarea label="Password" v-model="password" required="required"></v-textarea>
		<v-textarea name="input-7-1" label="confirm_password"></v-textarea>
		<v-btn @click="submit" :disabled="!valid">submit</v-btn>
		<v-btn @click="clear">clear</v-btn>
	</v-form>
</template>