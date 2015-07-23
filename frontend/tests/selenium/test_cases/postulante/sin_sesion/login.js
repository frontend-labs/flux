it('Inicio de Session',function(done) {
    client
        .url(data.url_base)
        .click('.login_init')
        .getCssProperty('#modalLoginUser', 'display').then(function(display){
            expect(display.value).to.equal('block')
        })
        .setValue(data.form_login.txtUser, data.user.email)
        .getValue(data.form_login.txtUser).then(function(email) {
            expect(email).to.equal(data.user.email)
        })
        .setValue(data.form_login.txtPassword, data.user.password)
        .getValue(data.form_login.txtPassword).then(function(password) {
            expect(password).to.equal(data.user.password)
        })
        .click('#frmUserLogIn .btn_tertiary')
        .waitForExist('.profile_wrapper', 50000)
        .getText('.name_profile').then(function(value){
            expect(value).to.equal(data.user.name + ',')
        })            
        .call(done);
});