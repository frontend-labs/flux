describe('Mi Cuenta', function(){
    it('Mis Datos Personales',function(done) {
        var myForm = data.mi_cuenta.form_user_registration;
        client
            .url(data.url_base + '/mi-cuenta/mis-datos-personales')
            .getText(data.mi_cuenta.title).then(function(value){
                expect(value).to.equal('Datos Personales')
            })
            .click(myForm.btnSave)
            .isEnabled(myForm.btnSave).then(function(isEnabled){
                expect(isEnabled).to.be.false;
            })
            .waitForVisible(data.mi_cuenta.message_box, 50000)
            .getText(data.mi_cuenta.message_box).then(function(value){
                expect(value).to.equal('Los datos fueron actualizados correctamente')
            }) 
            .call(done);
    });

    it('Ubicación',function(done) {
        client
            .url(data.url_base + '/mi-cuenta/mi-ubicacion')
            .getText(data.mi_cuenta.title).then(function(value){
                expect(value).to.equal('Ubicación')
            })
            .setValue(data.form_login.txtUser, data.user.email)
            .click('#frmLocation .btn_save')
            .isEnabled('#frmUserRegistration .btn_save').then(function(isEnabled){
                expect(isEnabled).to.be.false;
            })
            .waitForVisible('.message_box span', 50000)
            .getText('.message_box span').then(function(value){
                expect(value).to.equal('Los datos fueron actualizados correctamente')
            }) 
            .call(done);
    });
/*
    it('Experiencia',function(done) {
        client
            .url(data.url_base + '/mi-cuenta/mis-experiencias')
            .getText(data.mi_cuenta.title).then(function(value){
                expect(value).to.equal('Experiencias')
            })
            .setValue(data.form_login.txtUser, data.user.email)
            .click('#frmLocation .btn_save')
            .isEnabled('#frmUserRegistration .btn_save').then(function(isEnabled){
                expect(isEnabled).to.be.false;
            })
            .waitForVisible('.message_box span', 50000)
            .getText('.message_box span').then(function(value){
                expect(value).to.equal('Los datos fueron actualizados correctamente')
            }) 
            .call(done);
    });

*/

});
