/**
 * Created by try on 2016/8/31.
 */
$(function(){
    if(typeof localStorage.count=="undefined" || isNaN(localStorage.count)){
        localStorage.count=Number(60);
    }
    else {
        localStorage.count=Number(localStorage.count);
        if(Number(localStorage.count)!=60){
            settime(Number(localStorage.count));
        }
    }
    function settime(obj) {
         var element=document.getElementById("btn");
        if(obj<=0){
                element.removeAttribute("disabled");
                element.value="获取验证码";
                localStorage.count = 60;
                return;
            }
            else {
                element.setAttribute("disabled", true);
                element.value="重新发送(" + localStorage.count + ")";
                localStorage.count--;
            }
        setTimeout(function() {settime(Number(localStorage.count))},1000)
    }
    $("#btn").click(function(){
        settime(60)
    })
});
