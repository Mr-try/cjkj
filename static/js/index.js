/**
 * Created by try on 2016/8/31.
 */
//选择文件
function fileSelected() {
    file = document.getElementById('fileToUpload').files[0];
    if (file) {
        var fileSize = 0;
        if(file.size < 1024 * 1024 * 6){
            if (file.size > 1024 * 1024){
                fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB';
            }
            else{
                fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
            }
        }
        else {
            alert("您的文件过大")
        }
        document.getElementById('fileName').innerHTML =  file.name;
        //document.getElementById('fileSize').innerHTML = 'Size: ' + fileSize;
        //document.getElementById('fileType').innerHTML = 'Type: ' + file.type;
    }
}
//开始上传文件

function uploadFile() {
    if (file) {
        if(file.size < 1024 * 1024 * 6){
            var fd = new FormData();
            fd.append("fileToUpload", document.getElementById('fileToUpload').files[0]);
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", uploadProgress, false);
            xhr.addEventListener("load", uploadComplete, false);
            xhr.addEventListener("error", uploadFailed, false);
            xhr.addEventListener("abort", uploadCanceled, false);
            xhr.addEventListener("loadend", uploadEnd, false);
            xhr.open("POST", "");//修改成自己的接口
            xhr.send(fd);
        }
        else {
            alert("您的文件过大")
        }
    }
}
//上传文件进行中
function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        console.log(percentComplete)
        document.getElementById('progressNumber').innerHTML ='<div class="progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: '+percentComplete.toString()+'%";">'+percentComplete.toString()+'%</div></div>';
    }
    else {
        document.getElementById('progressNumber').innerHTML = '上传失败';
    }
}
//上传完成
function uploadEnd(evt) {
    document.getElementById('progressNumber').innerHTML ='<div class="progress"><div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:100%";">完成</div></div>';
}
//完成上传
function uploadComplete(evt) {
    /* 服务器端返回响应时候触发event事件*/
    console.log(evt);
}
function uploadFailed(evt) {
    alert("上传失败");
}
function uploadCanceled(evt) {
    alert("取消上传");
}