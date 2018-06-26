 /* UI *******************************************/
 (function() {

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
