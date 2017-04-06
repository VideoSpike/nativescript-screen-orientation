

A plugin to force change the orientation of a page programmatically in NativeScript. Supports both Android and iOS. **V2.0 works on iOS10.x, angular, xcode 8 and  webpack.**

---------------------------

Code Sample (VanillaJS)
===========

  
   

    var orientationModule = require("nativescript-screen-orientation");
        
      function pageLoaded(){
            orientationModule.setCurrentOrientation("landscape",function(){
                    console.log("landscape orientation set");
                });
            }
           
       function onNavigatingFrom(){
            orientationModule.orientationCleanup();
            }
    exports.pageLoad=pageLoaded;
    exports.onNavigatingFrom=onNavigatingFrom;


----------

---------------------------

Code Sample (Angular)
===========

  
   

    import {setCurrentOrientation , orientationCleanup} from 'nativescript-screen-orientation';
    
     @Component({moduleId:module.id,selector:"sample",templateUrl:"./sample.component.html"})
        
     export class SampleComponent{
      constructor(page:Page){
         page.on("navigatedTo",function(){
            setCurrentOrientation("portrait",function(){
            console.log("portrait orientation");
            });
         });
         page.on("navigatingFrom",function(){
       orientationCleanup();
            });
         });
      }
     }
          
      




----------


Motivation
-------------
 To allow force setting of orientation at  page - level programmatically.



Installation
-------------------

    tns plugin add nativescript-screen-orientation

----------


API Reference
-------------
Allowed orientations are 'portrait', 'landscape' and 'all'.

In order to force an orientation, hook the respective `setCurrentOrientation`  methods at the **pageLoad/navigatedTo** event of page, while make sure the method `orientationCleanup` is called at the **navigatingFrom** event of the page.

 

 - `setCurrentOrientation(orientation,callback)`

      
      `orientation` is a string with possible values 'landscape' , 'portrait' and  'all' . Parameter `callback`  is a function to call once the orientation is set, can be null.

 - `orientationCleanup()`

      should be called on the **navigatingFrom** event if `setCurrentOrientation` is called, if this method is not called, can lead to inconsistent behavior.
          

Troubleshooting
=============

In iOS , on iPad, if the plugin is not working, it is due to changes in the features supported by iPad. It is required for latest iOS to support multiple apps at the same time by screen sharing, which discourages locking of orientation in a particular mode. In order to make it work on iPad, set the key **'Requires Fullscreen'** in xCode under app settings.

