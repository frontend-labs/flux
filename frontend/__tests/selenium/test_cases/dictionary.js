data = {}
data.url_base = 'http://local.aptitus.pe/'
data.user = {
	name: 'Carlo',
	email: 'carlos@gmail.com',
	password: '123465'
}
data.form_login = {
	txtUser: '#frmUserLogIn #txtUser',
	txtPassword: '#frmUserLogIn #txtPasswordLogin'
}
data.mi_cuenta = {
	message_box: '.message_box span',
	title: 'h2.skill_category'
}
data.mi_cuenta.form_user_registration = {
	btnSave: '#frmUserRegistration .btn_save',
}
module.exports = data