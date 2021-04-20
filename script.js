var cpt =0;

function display(a)
{
	console.log(txt)
	if (cpt >= txt.length) return;
	++cpt;
	var elt=document.getElementById("txt");
	var car = (txt.charCodeAt(cpt)==10) ? '<br />' : txt.substr(cpt,1);

	elt.innerHTML=elt.innerHTML+car;

	setTimeout("display()",80+Math.round(Math.random()*20));
}

function go()
{
	--cpt
	document.getElementById("txt").innerHTML="";
	setTimeout("display()",100);
}

function afterWrite(a,t) {
	setTimeout(function () {
		document.getElementById("txt").innerHTML=a;
	}, t);

}

go()