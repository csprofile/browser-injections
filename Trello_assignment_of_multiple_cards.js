var cardContains = "text";
var memberEl = "Name (name)";

var controlEl = 0;

var elements = $(".list-card.js-member-droppable.ui-droppable");


function rec(){
	var el = elements[controlEl];
	$(el).click();
	setTimeout(openCardMembers,100);
}

function openCardMembers(){
	$(".button-link.js-change-card-members").first().click();
	setTimeout(changeMember,100);
}

function changeMember(){
	var name = $(".mod-card-back-title.js-card-detail-title-input").first().val();
	
	if (name != null){
		if (name.indexOf(cardContains) > -1) {
			setTimeout(clickToChange, 100);
		} else {
			close();
		}
	} else {
		close();
	}
}

function clickToChange(){
	$(".name.js-select-member" + "[title='" + memberEl + "']").first().click();
	close();
}

function close(){
	$(".icon-lg.icon-close.dialog-close-button.js-close-window").click();
	controlEl ++;
	
	if (controlEl < elements.length) {
		rec();
	}
};

rec();
