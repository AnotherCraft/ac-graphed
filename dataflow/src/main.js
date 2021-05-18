{
	let canvas = document.getElementById("canvas");

	window.addEventListener('resize', resizeCanvas, false);
	function resizeCanvas() {
		if (window.orientation !== undefined)// if mobile
		{
			canvas.width = document.documentElement.clientWidth;
			canvas.height = document.documentElement.clientHeight;
		}
		else { // if pc
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
	}
	resizeCanvas();
}

let graph = new LGraph();

{
	let canvas = new LGraphCanvas("#canvas", graph);
	graph.start();
}

{
	document.querySelector("#save").addEventListener("click", function () {
		var data = JSON.stringify(graph.serialize());
		var file = new Blob([data]);
		var url = URL.createObjectURL(file);
		var element = document.createElement("a");
		element.setAttribute('href', url);
		element.setAttribute('download', "graph.json");
		element.style.display = 'none';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
		setTimeout(function () { URL.revokeObjectURL(url); }, 1000 * 60); //wait one minute to revoke url	
	});

	let loadInput = document.querySelector("#loadInput");

	document.querySelector("#load").addEventListener("click", function () {
		loadInput.value = null;
		loadInput.click();
	});

	loadInput.onchange = function() {
		let file = loadInput.files[0];

		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function() {
			let content = reader.result;
			graph.configure(JSON.parse(content));
		};
	};
}