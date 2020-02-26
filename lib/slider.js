var photoWrap;
var photo;

////////////////////////////////////////////////////////////////

window.onload = function(){
    photoWrap = new PhotoWrap("photoPanelWrap");
    photoWrap.ChangeSize(window.innerHeight,window.innerWidth);

    photo = new Photo("photo1");
    LoopSleep(8000,photo.ChangePhoto);
};

window.onresize = function(){
    photoWrap.ChangeSize(window.innerHeight,window.innerWidth);
}

////////////////////////////////////////////////////////////////
var PhotoWrap = function(id){
    this.element = document.getElementById(id);
}

/// 
PhotoWrap.prototype.ChangeSize = function(h,w){
    this.element.style.width = w + "px";
    this.element.style.height = h + "px";
}
////////////////////////////////////////////////////////////////
var Photo = function(id){
    this.nowElement = document.getElementById(id);
}

Photo.prototype.ChangePhoto = function(){
    var photoList = document.getElementsByClassName("photo-panel");
    photoList = Array.from(photoList);
    var nowShowEle = photoList.find(e=>e.style.visibility == "visible");

    /*後で消す*/
    console.log(nowShowEle);

    /* 初回 */
    if(nowShowEle == null){
        photoList[1].style.visibility = "visible";
        nowShowEle = photoList[0];
        Change(photoList[0],photoList[1]);        
        return;
    }

    /* 最後の要素だったら最初に戻る */
    photoList = Array.prototype.slice.call(photoList);
    var findFlg = false;
    var nextEle = null;

    // findindex使えないから    
    photoList.forEach(element => {
        if(findFlg)
        {
             nextEle = element;
             // breakできない,後で調べる
             findFlg = false;
        }
        if(element == nowShowEle){ findFlg = true;}
    });
    if(nextEle == null){ nextEle = photoList[0]; }
     
    nextEle.style.visibility = "visible";
    Change(nowShowEle,nextEle);
}

var Change = function(prev,next){

    if(prev.style.opacity == ""){ prev.style.opacity = 1;}
    if(next.style.opacity == ""){ next.style.opacity = 0;}

    LoopSleepLimit(100,100,function(){
        prev.style.opacity = (Number(prev.style.opacity) - 0.02).toString();
        next.style.opacity = (Number(next.style.opacity) + 0.02).toString();

        console.log("prev:" + prev.style.opacity);
        console.log("next" + next.style.opacity);
        
        if(next.style.opacity == "1"){
            prev.style.visibility = "hidden";
            return true;
        }
        });

        return false;
}

// 無限ループ
function LoopSleep(_interval, _mainFunc){
    var interval = _interval;
    var mainFunc = _mainFunc;
    var loopFunc = function () {
        setTimeout(loopFunc, interval);
        mainFunc();
    }
    loopFunc();
  }

// 有限ループ
function LoopSleepLimit(_loopLimit,_interval, _mainFunc){
    var interval = _interval;
    var mainFunc = _mainFunc;
    var loopLimit = _loopLimit;
    var i = 0;

    var loopFunc = function () {
        var ret = mainFunc();
        if(ret) { return; }
        i = i + 1;
        if (i < loopLimit) {
            setTimeout(loopFunc, interval);
        }
    }
    loopFunc();
 }