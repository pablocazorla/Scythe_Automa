 /* UI *******************************************/
 (function() {

 		(function(){
 			var container = document.getElementById('scythe-container'),
 				width = 420,
				height = 560,
				mod = width/height,
 				resizeContainer = function(){
 					var w_width = window.innerWidth,
 						w_height = window.innerHeight;
 					if(w_width < width || w_height < height){
 						var modWin = w_width/w_height;
 						var scal = 1;
 						if(modWin < mod){
 							scal = w_width / width;
 							container.style.transformOrigin = '0 0';						
 						}else{
 							scal = w_height / height;
 							container.style.transformOrigin = '50% 0';	
 						}
 						container.style.transform = 'scale(' + scal + ',' + scal + ')';
 					}
 				};
 			resizeContainer();
 			window.addEventListener('resize',resizeContainer);
 		})();



 		/* LANGUAGE *****************************/
 		var language = {
 				'name': 'English',
 				'texts': {}
 			},
 			setLanguage = function(langName) {
 				if (window.scytheLanguages) {
 					var foundLang = false;
 					window.scytheLanguages.forEach(function(lang) {
 						if (lang.name === langName) {
 							language = cloneObject(lang);
 							foundLang = true;
 						}
 					});
 					if(!foundLang){
 						language = {
			 				'name': 'English',
			 				'texts': {}
			 			}
 					}
 				};
 			},
 			_i = function(str) {
 				return language.texts[str] || str;
 			};
 		/* END LANGUAGE *****************************/

 		/* CURRENT VIEW *****************************/

 		var currentView = ko.observable();
 		currentView.extend({ notify: 'always' });


 		var goTo = function(viewName,parameters){
 			currentView(viewName);
 		};

 		/* END CURRENT VIEW *****************************/

 		/* VIEW MODELS *****************************/

 		var viewModels = [];

 		var bindAllModels = function(){
 			viewModels.forEach(function(vm){
 				vm();
 			});
 		};

 		/* END VIEW MODELS *****************************/
