var frameModule=require("ui/frame"),
    application=require("application");

var orientationType=null,
    completionCallback=null;

function setOrientationsForViewControllers(){
    var preferred;


    var navigationController=frameModule.topmost().ios.controller,
        visibleViewController=navigationController.visibleViewController;


    var visibleViewControllerPrototype=getPrototypeForPreferredInterfaceOrientationForPresentation(visibleViewController),
        navigationControllerPrototype=getPrototypeForPreferredInterfaceOrientationForPresentation(navigationController);


    if(false==visibleViewControllerPrototype.hasOwnProperty("preferredInterfaceOrientationForPresentation")){
        console.log("visible view controller prototype preferredInterfaceOrientationForPresentation missing!");
    }

    if(false==visibleViewControllerPrototype.hasOwnProperty("supportedInterfaceOrientations")){
        console.log("visible view controller prototype supportedInterfaceOrientations missing!");
    }


    if(false==navigationControllerPrototype.hasOwnProperty("preferredInterfaceOrientationForPresentation")){
        console.log("navigation controller prototype preferredInterfaceOrientationForPresentation missing!");
    }

    if(false==navigationControllerPrototype.hasOwnProperty("supportedInterfaceOrientations")){
        console.log("navigation controller prototype supportedInterfaceOrientations missing!");
    }

    visibleViewControllerPrototype.preferredInterfaceOrientationForPresentation=function() {
        console.log("preferred interface orientation : visible view controller!");
        if("landscape"==orientationType){
            return UIInterfaceOrientationLandscapeLeft;
        }
        if("portrait"==orientationType){
            return UIInterfaceOrientationPortrait;
        }


        return UIInterfaceOrientationUnknown;
    };


    navigationControllerPrototype.preferredInterfaceOrientationForPresentation=function(){
        console.log("preferred interface orientation : navigation view controller!");
        if("landscape"==orientationType){
            return UIInterfaceOrientationLandscapeLeft;
        }
        if("portrait"==orientationType){
            return UIInterfaceOrientationPortrait;
        }


        return UIInterfaceOrientationUnknown;
    };


    visibleViewControllerPrototype.supportedInterfaceOrientations=function(){


        if("landscape"==orientationType){
            return UIInterfaceOrientationMaskLandscape;
        }
        if("portrait"==orientationType){
            return UIInterfaceOrientationMaskPortrait;
        }if("all"==orientationType){
            return UIInterfaceOrientationMaskAll;
        }if("allbutupsidedown"==orientationType){
            return UIInterfaceOrientationMaskAllButUpsideDown;
        }

        return UIInterfaceOrientationMaskAll;


    };


    navigationControllerPrototype.supportedInterfaceOrientations=function(){


        if("landscape"==orientationType){
            return UIInterfaceOrientationMaskLandscape;
        }
        if("portrait"==orientationType){
            return UIInterfaceOrientationMaskPortrait;
        }if("all"==orientationType){
            return UIInterfaceOrientationMaskAll;
        }if("allbutupsidedown"==orientationType){
            return UIInterfaceOrientationMaskAllButUpsideDown;
        }

        return UIInterfaceOrientationMaskAll;

    };


    var window=UIApplication.sharedApplication().windows.objectAtIndex(0),
        rootController=window.rootViewController,
        tempmodal=UIViewController.alloc().init();

    rootController.presentViewControllerAnimatedCompletion(tempmodal,false,null);
    rootController.dismissViewControllerAnimatedCompletion(false,completionCallback);

    //if(completionCallback){
    //    completionCallback();
   // }


}



function getPrototypeForSupportedInterfaceOrientations(controller){
    var prototype=Object.getPrototypeOf(controller);

    while(true){
         console.log("looping the loop!!");
        if(prototype.hasOwnProperty("supportedInterfaceOrientations")){
            return prototype;
        }
        prototype=Object.getPrototypeOf(prototype);
    }
}

function getPrototypeForPreferredInterfaceOrientationForPresentation(controller){
    var prototype=Object.getPrototypeOf(controller);
    while(true){
        if(prototype.hasOwnProperty("preferredInterfaceOrientationForPresentation")){
            return prototype;
        }
        prototype=Object.getPrototypeOf(prototype);
    }
}



exports.setCurrentOrientation=function(currentOrientation,callback){
  orientationType=currentOrientation.toLowerCase();
    completionCallback=null;
    completionCallback=callback;
  setOrientationsForViewControllers();
};

exports.orientationCleanup=function(){
    orientationType="all";
    completionCallback=null;
    setOrientationsForViewControllers();
};