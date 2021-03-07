<template>
	<div class="login-register">
		<div class="contain">
			<div class="big-box" :class="{active:isLogin}">
				<div class="big-contain" v-if="isLogin">
					<div class="btitle">账户登录</div>
					<el-form :model="form"   ref="LoginForm" :rules="ruleLoginForm"  class="bform" label-width="100px">
						<el-form-item label="账号" prop="account">
							<el-input v-model="form.account"  ></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input type="password" v-model="form.password"></el-input>
						</el-form-item>
					</el-form>
					<button class="bbutton" @click="userLogin">登录</button>
				</div>
				<div class="big-contain" v-else>
					<div class="btitle">创建账户</div>
					<el-form :model="registerForm"   ref="RegisterForm" :rules="registerFormRules"  class="bform" label-width="100px">
						<el-form-item label="账号" prop="account">
							<el-input v-model="registerForm.account"  ></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="registerForm.password"  ></el-input>
						</el-form-item>
						<el-form-item label="昵称" prop="nickname">
							<el-input v-model="registerForm.nickname"  ></el-input>
						</el-form-item>

					</el-form>
					<button class="bbutton" @click="register">注册</button>
				</div>
			</div>
			<div class="small-box" :class="{active:isLogin}">
				<div class="small-contain" v-if="isLogin">
					<div class="stitle">你好，朋友!</div>
					<p class="scontent">开始注册，和我们一起旅行</p>
					<button class="sbutton" @click="changeType">注册</button>
				</div>
				<div class="small-contain" v-else>
					<div class="stitle">欢迎回来!</div>
					<p class="scontent">与我们保持联系，请登录你的账户</p>
					<button class="sbutton" @click="changeType">登录</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {getUserList, login, registerUser} from "../apis/user";
	import {setStorage} from "../utils/storage";
	export default{
		name:'login-register',
		data(){
			return {
				isLogin:false,
				emailError: false,
				passwordError: false,
				existed: false,
				form:{
					account:'',
					password:'',
				},
				ruleLoginForm:{
					account:[
						{ required: true, message: '请输入账号', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
					]
				},
				registerForm:{
					account:"",
					password:"",
					nickname:"",
					avatar:"",
				},
				registerFormRules:{
					account:[
						{ required: true, message: '请输入账号', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
					nickname:[
						{ required: true, message: '请输入昵称', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
				}
			}
		},
		methods:{
			changeType() {
				this.isLogin = !this.isLogin

			},
			userLogin() {
				this.$refs["LoginForm"].validate((valid) => {
					if (!valid) {
						this.$message.error('请按提示输入!')
						return
					}
					console.log(this.form.account)
					login(this.form.account, this.form.password)
							.then(res => {
								//储存token
								if (res.data.status != 200) {
									this.$message.error(res.data.message)
								} else {
									setStorage("token", res.data.token)
									setStorage("user", JSON.stringify(res.data.user))
									this.$store.dispatch('asyncUpdateUser', res.data.user)
									this.$router.push({path:'/index'})
								}
							}).catch(err=>{
						this.$message.error("服务器错误!")
					})
				})


			},
			register(){
				this.$refs["RegisterForm"].validate((valid) => {
					if (!valid) {
						this.$message.error('请按提示输入!')
						return
					}
					registerUser(this.registerForm).then(res => {
						if (res.data.status != 200) {
							this.$message.error(res.data.message)
							return
						}
						this.$message.success("注册成功！")
						this.changeType()
					}).catch(err=> {
						this.$message.error("服务器错误!")
					})
				})

			},
			handleAvatarSuccess() {

			}
		}
	}
</script>

<style  scoped="scoped">
	.login-register{
		position: fixed;
		width: 100vw;
		height: 100vh;
		box-sizing: border-box;
	}
	.contain{
		width: 60%;
		height: 60%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 0 0 3px #f0f0f0,
					0 0 6px #f0f0f0;
	}
	.big-box{
		width: 70%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 30%;
		transform: translateX(0%);
		transition: all 1s;
	}
	.big-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btitle{
		font-size: 1.5em;
		font-weight: bold;
		color: rgb(57,167,176);
	}
	.bform{
		width: 100%;
		height: 40%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.bform .errTips{
		display: block;
		width: 50%;
		text-align: left;
		color: red;
		font-size: 0.7em;
		margin-left: 1em;
	}
	.bform input{
		width: 50%;
		height: 30px;
		border: none;
		outline: none;
		border-radius: 10px;
		padding-left: 2em;
		background-color: #f0f0f0;
	}
	.bbutton{
		width: 20%;
		height: 40px;
		border-radius: 24px;
		border: none;
		outline: none;
		background-color: rgb(57,167,176);
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	.small-box{
		width: 30%;
		height: 100%;
		background: linear-gradient(135deg,rgb(57,167,176),rgb(56,183,145));
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(0%);
		transition: all 1s;
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
	}
	.small-contain{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.stitle{
		font-size: 1.5em;
		font-weight: bold;
		color: #fff;
	}
	.scontent{
		font-size: 0.8em;
		color: #fff;
		text-align: center;
		padding: 2em 4em;
		line-height: 1.7em;
	}
	.sbutton{
		width: 60%;
		height: 40px;
		border-radius: 24px;
		border: 1px solid #fff;
		outline: none;
		background-color: transparent;
		color: #fff;
		font-size: 0.9em;
		cursor: pointer;
	}
	
	.big-box.active{
		left: 0;
		transition: all 0.5s;
	}
	.small-box.active{
		left: 100%;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-top-right-radius: inherit;
		border-bottom-right-radius: inherit;
		transform: translateX(-100%);
		transition: all 1s;
	}
</style>
