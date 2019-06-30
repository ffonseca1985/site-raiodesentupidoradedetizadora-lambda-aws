//teste 
//teste 2
var enviarEmail = function(){

    if ($("#name").val() == ""){
        alert("Favor informar seu Nome.")
        return;
    }

    if ($("#email").val() == "" && $("#tel").val() == ""){
        alert("Favor informar seu E-mail ou um telefone para contato.")
        return;
    }

    var json = 
    {
        name: $("#name").val(),
        email: $("#email").val(),
        tel: $("#tel").val(),
        message: $("#mensagem").val()
    }

    $("#btnEnvio").val("Processando..");

    var url = "https://732s5mkqbe.execute-api.sa-east-1.amazonaws.com/envioemail/raiodesentupidora/";

    var post = $.post(url, JSON.stringify(json), function(){
        alert("Obrigado por escolher nossos serviços - Em breve entraremos em contato!")
        $("#btnEnvio").val("Enviar");
    });

    post.fail(function(ex){
        console.log(ex)
        alert("Erro ao enviar e-mail, por favor tente mais tarde")
        $("#btnEnvio").val("Enviar");
    });


    
}
