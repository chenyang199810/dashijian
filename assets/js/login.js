$(function () {
    // 让注册盒子显示 让登录盒子隐藏
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
   // 让注册盒子隐藏 让登录盒子显示
    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
   
// 从layui获取form对象
    var form=layui.form

    var layer=layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个 pwd 的校验规则
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,

     repwd: function(value){
var pwd=$('.reg-box [name=password]').val()

if(pwd !==value ){
    return '两次输入的密码不一致'
}

  }


    })
    // 校验两次密码是否一致
// 监听注册表单的提交事件
$('#form-reg').on('submit',function(e){
e.preventDefault()
$.ajax({
method:'post',
url:'/api/reguser',
data:{
    username:$('#reg-name').val(),
    password:$('#reg-pw').val()
},
success:function(res){
    if(res.status!==0){
      return layer.msg(res.message);
    }else{
        layer.msg('注册成功，请登录！');

        $('#link-login').click()
    } 

}


})

})

// 监听登录表单的提交事件
$('#form-login').on('submit',function(e){
    // 组织默认提交
    e.preventDefault()
$.ajax({
    url:'/api/login',
    method:'post',
    // 快速获取表单数据
    data:$(this).serialize(),
   success:function(res){
if(res.status!==0){
    return layer.msg('登录失败');
}else{
    layer.msg('登录成功')
    // localStorage.setItem('token',res.token)
// console.log(res.token);
    // 登录成功后跳转到后台
 location.href='/index.html'
}
}

})

})



})