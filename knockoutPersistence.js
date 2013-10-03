(function(ko){
	if (!window.localStorage){
        return;
    } else {
		  var methods = ['observable','observableArray'];
		
		  ko.utils.arrayForEach(methods, function(method){
		    var saved = ko[method];
		    
		    ko[method] = function(initialValue, options){
		      options = options || {};
		
		      var key = options.persist;
		
		      if(key && localStorage.hasOwnProperty(key)){
		        try{
	        		var obj = JSON.parse(localStorage.getItem(key));
		        	if(typeof obj === 'object' && obj != null && typeof obj !== 'boolean'){
		        		if(Array.isArray(obj)){
		        			var arrayTmp = [];
		        			for(var i = 0; i < obj.length; i++){
		        				arrayTmp.push((obj[i].objectNameID != null && typeof window[obj[i].objectNameID] === 'function') ? new window[obj[i].objectNameID](obj[i],obj[i].orderNumberID) : obj[i]);
		        			}
		        			initialValue = arrayTmp;
		        		} else {
		        			initialValue = (obj.objectNameID != null && typeof window[obj.objectNameID] === 'function') ? new window[obj.objectNameID](obj,obj.orderNumberID) : obj;
		        		}
		        	} else {
		            	initialValue = obj;
		        	}        	        	
		        }catch(e){
		        	console.log("ERROR: "+e);
		        };
		      }
		
		      var observable = saved(initialValue);
		
		      if(key){
		        observable.subscribe(function(newValue){
		    		localStorage.setItem(key, ko.toJSON(newValue));
		        });
		      };
		
		      return observable;
		    };
		  });
    }
})(ko);
