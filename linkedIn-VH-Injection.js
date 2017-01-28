//INSTRUCTIONS:
//Access your account in https://www.linkedin.com/
//Copy the content from this file to your chrome developer console
//Press enter
//If the login screen appear, check the last url to be processed, remove from the list, refresh the page, and start again



console.clear();
var profileListControl = 0;
var cnt = 0;

var profileList = [
	'https://br.linkedin.com/in/darlan-dos-santos-barros-junior-84582461',
	'https://br.linkedin.com/in/dsgjacqueline',
	'https://linkedin.com/in/luissergiomoura',
	'https://linkedin.com/in/murilopontes',
	'https://linkedin.com/in/cassio-hideki-matsumoto-8b23644a',
	'https://br.linkedin.com/in/maviteixeira',
	'https://br.linkedin.com/in/douglascamata/en',
	'https://www.linkedin.com/in/atharh',
	'https://ca.linkedin.com/in/marcelo-moretti-42684918',
	'http://br.linkedin.com/in/csdeveloper/en',
	'https://ca.linkedin.com/in/guilhermepmaia/en',
	'https://www.linkedin.com/in/elenizioo',
	'https://www.linkedin.com/in/thpoiani',
	'https://www.linkedin.com/in/analistamarcio',
	'https://br.linkedin.com/in/thiagovelho/en',
	'https://br.linkedin.com/in/renatacrisostomo/en',
	'https://www.linkedin.com/in/jenseralmeida',
	'https://www.linkedin.com/in/psmorandi',
	'https://www.linkedin.com/in/franciscobbraga',
	'https://www.linkedin.com/in/alexandreolivadias',
	'http://www.linkedin.com/in/rodrigoxavierfelippe',
	'https://br.linkedin.com/in/nelson-assis-07603894',
	'https://www.linkedin.com/in/plinioalmeida',
	'https://www.linkedin.com/in/marcosgrimm',
	'https://ie.linkedin.com/in/mathias-grimm-533ab250',
	'https://www.linkedin.com/in/wagneryukio',
	'https://br.linkedin.com/in/alexandre-moraes-2a6743105',
]



function log(text){
	console.log('%c ' + text, 'background: green; color: white; display: block;');
}

log('STARTING PROCCESS');


function injectProfile(){

	if(typeof profileList[profileListControl] !== 'undefined') {
		//Replace with REGEX
		var profileUrl = profileList[profileListControl]
			profileUrl = profileUrl.replace('http://','https://')
			profileUrl = profileUrl.replace('br.linkedin','www.linkedin')
			profileUrl = profileUrl.replace('ca.linkedin','www.linkedin');
			profileUrl = profileUrl.replace('ie.linkedin','www.linkedin');
			profileUrl = profileUrl.replace('https://linkedin','https://www.linkedin');
			
			
		if(profileUrl.indexOf('https') == -1){
			profileUrl = 'https://'+profileUrl;
		}
		
		log('PROCCESSING ' + profileUrl);
		
		var iFrameProfileComplete = false;
		var iFrameInviteComlete = false;
		var refreshIntervalId;


		var injDiv = $('<div>')
			.attr('id','injDiv')
			.css({
				position:'absolute',
				width:'100%',
				height:'100%',
				left:'0px',
				top:'0px',
				background:'white',
				'z-index':1000
			});

		$('body').append(injDiv);
		log('DIV INJECTED');
		
		var iFrameProfile = $('<iframe>')
			.attr('src',profileUrl)
			.width('100%')
			.height('100%')
			.on('load',function(){
				iFrameProfileComplete = true;
			});
			injDiv.append(iFrameProfile);
			
		function injectIframe2(){		
			if(iFrameProfileComplete){
				
				log('IFRAME 1 LOADED');
				clearInterval(refreshIntervalId);
				
				var preventLogin = iFrameProfile.contents().find('#login').find('input[type="submit"]').first();
				if(preventLogin.length > 0){
					preventLogin.click();
					log('PREVENTING LOGOFF');
					log('LOADING NEXT');
					iFrameInviteComlete = true;
					iFrameProfile.remove();
					injDiv.remove();
					injectProfile();
				}else{
				
					var link = iFrameProfile.contents().find(".connect-menu").first().find('dd:eq(1)').find('a').first().attr('href');
					if(link){
						if(link.indexOf('ngroups/ajax') > -1){
							link = iFrameProfile.contents().find(".profile-actions").first().find("a").attr("href");
						}
					}
					log('INVITE LINK ACHIEVED');
					log('LINK' + link);
					
					var inviteIframe = $('<iframe>')
						.attr('src',link)
						.width('100%')
						.height('100%')
						.on('load',function(){
							log('IFRAME 2 LOADED');
							$( inviteIframe )
								.contents()
								.find( "#main-options" )
								.first()
								.find('li:eq( 3 )')
								.first()
								.find('input')
								.click();
									
							$( inviteIframe )
								.contents()
								.find( "#iwe-form" )
								.find('textarea')
								.first()
								.val("Hi, I'm from Vanhack community!");
									
									
							var inviteButton = $( inviteIframe ).contents().find( ".iwrite-in" ).first().find( 'input[name=iweReconnectSubmit]');
							var alreadyInvited = false;
							
							if(inviteButton.length > 0){
								inviteButton.click();
								cnt++;
								log('INVITED');
							}else{
								alreadyInvited = true;
								log('ALREADY INVITED');
							}
							
							var checkReload = setInterval(function(){
								inviteButton = $( inviteIframe ).contents().find( ".iwrite-in" ).first().find( 'input[name=iweReconnectSubmit]');
								if((inviteButton.length == 0 && !iFrameInviteComlete) || alreadyInvited){
									log('LOADING NEXT');
									clearInterval(checkReload);
									iFrameInviteComlete = true;
									inviteIframe.remove();
									iFrameProfile.remove();
									injDiv.remove();
									profileListControl++;
									log(profileUrl + ' DONE');
									injectProfile();
								}
							},100);
						});
					
					injDiv.empty();
					injDiv.append(inviteIframe);
				}
				
			}
		}

		refreshIntervalId = setInterval(injectIframe2, 100);
	}else{
		log('PROCCESS FINISHED WITH ' + cnt + ' INVITES');
		log('WELLCOME TO VANHACK TEAM');
	}
}

if($('#preventReinject').length == 0){
	$('body').append("<div id='preventReinject'>");
	injectProfile();
}else{
	log('SCRIPT ALREADY INJECTED, REFRESH THE PAGE AND INJECT AGAIN');
}
