$(function () {
    var base = "";
    //本地上传
    $(".imgs").click(function () {
        $("#upload").click();
    })
    $('#upload').change(function () {
        $filePath = URL.createObjectURL(this.files[0]);
        file = $filePath;
        options.imgSrc = $filePath;
        //注册裁剪组件
        cropper = $('#main__photo').cropbox(options);
        var onloadFn = cropper.image.onload;
        cropper.image.onload = function () {
            onloadFn();
            //初始化头像
            imgHtml();
        }
    })


    // 完成上传   图片为base64
    $("#main__submit").click(function () {
        if (base === "") {
            base ==="";
            var formData = new FormData();
            formData.append('photo', document.getElementById('upload').files[0]);
            $.ajax({
                url: "/file/upload",
                contentType: "multipart/form-data",
                type: 'POST',
                cache: false, //不必须
                data: {formData,"userId":$("#userInfoId").val()},
                processData: false,//必须
                contentType: false,//必须
                success: function (data) {
                    $(".titleImg img").attr("src", data)
                    $(".clear-list img").attr("src", data)
                }
            });
        }else {
            base ==="";
            $.ajax({
                url: "/file/uploads",
                type: 'POST',
                cache: false, //不必须
                data: {"base": base,"userId":$("#userInfoId").val()},
                success: function (data) {
                    $(".titleImg img").attr("src", data)
                    $(".clear-list img").attr("src", data)
                }
            })
        }
        var ahis = $(this);
        ahis.hide();
        // $.post("/url", {data: cropper.getDataURL()}, function(data) {
        ahis.show();
        ahis.html("OK");
        // });
    })

    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach('#open-power');


    const options = {
        thumbBox: '.main__upload-left--thumbBox',
        spinner: '.main__upload-left--spinner',
        imgSrc: ''
    }
    let cropper = null;

    $("#main__confirm").click(function () {
        Webcam.freeze();
        Webcam.snap(function (data_uri) {
            options.imgSrc = data_uri;
            //注册裁剪组件
            cropper = $('#main__photo').cropbox(options);
            var onloadFn = cropper.image.onload;
            cropper.image.onload = function () {
                onloadFn();
                //初始化头像
                imgHtml();
            }
        });
    })

    $("#main__rop").on('click', function () {
        imgHtml();
    })

    $('#main__boost').on('click', function () {
        cropper.zoomIn();
    })

    $('#main__lessen').on('click', function () {
        cropper.zoomOut();
    })

    function imgHtml() {
        //加载右侧图像
        var img = cropper.getDataURL();
        base = img;
        var imgObj = $('.main__upload-right');
        imgObj.html('');
        imgObj.append('<img class="main__lager-photo" src="' + img + '" align="absmiddle"><p>180px*180px</p>');
        imgObj.append('<img class="main__small-photo" src="' + img + '" align="absmiddle"><p>128px*128px</p>');
        imgObj.append('<img class="main__mini-photo" src="' + img + '" align="absmiddle"><p>64px*64px</p>');
        $('#main__submit').show();
    }

    //默认加载
    options.imgSrc = $(".titleImg img").attr("src");
    //注册裁剪组件
    cropper = $('#main__photo').cropbox(options);
    var onloadFn = cropper.image.onload;
    cropper.image.onload = function () {
        onloadFn();
        //初始化头像
        imgHtml();
    }
});