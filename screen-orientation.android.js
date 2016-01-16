var application=require("application"),
    timer=require("timer");

var callback=null,
    orientationConstants={
        "landscape":"SCREEN_ORIENTATION_SENSOR_LANDSCAPE",
        "portrait":"SCREEN_ORIENTATION_SENSOR_PORTRAIT",
        "all":"SCREEN_ORIENTATION_FULL_USER"
    };

function setOrientation(type,callback){
    var type=type.toLowerCase(),
        requestedOrientationConstant=orientationConstants[type],
        interval=null;

    if(undefined!==requestedOrientationConstant){
        if(undefined!==application.android.foregroundActivity){
            application.android.foregroundActivity.setRequestedOrientation(android.content.pm.ActivityInfo[requestedOrientationConstant]);
            if(callback){
                callback();
            }

        }else {
            interval = timer.setInterval(function () {
                if (undefined !== application.android.foregroundActivity) {
                    application.android.foregroundActivity.setRequestedOrientation(android.content.pm.ActivityInfo[requestedOrientationConstant]);
                    timer.clearInterval(interval);
                    if(callback){
                        callback();
                    }
                }

            }, 1);
        }
    }
}

exports.setCurrentOrientation=setOrientation;

exports.orientationCleanup=function(){
    setOrientation("all");
};