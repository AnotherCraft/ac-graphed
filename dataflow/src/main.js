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
	let statusText = document.querySelector("#status");

	let fileHandle = null;
	async function getFileHandle(saveMode, force = false) {
		if (typeof window.showSaveFilePicker === "undefined") {
			statusText.innerHTML = "Using this editor in Edge/Opera/Chrome will allow more comfortable saving.";
			return false;
		}

		if (fileHandle !== null && !force)
			return true;

		const options = {
			types: [
				{
					description: 'Json files',
					accept: {
						'text/plain': ['.json'],
					},
				},
			],
			multiple: false
		};

		if (saveMode)
			fileHandle = await window.showSaveFilePicker(options);
		else
			[fileHandle] = await window.showOpenFilePicker(options);

		return true;
	}

	document.querySelector("#new").addEventListener("click", function () {
		fileHandle = null;
		graph.configure({});
	});

	async function save(saveAs = false) {
		let fh = await getFileHandle(true, saveAs);
		if (fh) {
			const writable = await fileHandle.createWritable();
			await writable.write(JSON.stringify(graph.serialize()));
			await writable.close();
			statusText.innerHTML = "Saved";
			return;
		}

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
	}

	document.querySelector("#save").addEventListener("click", function () {
		save(false);
	});

	document.querySelector("#saveAs").addEventListener("click", function () {
		save(true);
	});

	let loadInput = document.querySelector("#loadInput");

	document.querySelector("#load").addEventListener("click", async function () {
		let fh = await getFileHandle(false, true);
		if (fh) {
			const file = await fileHandle.getFile();
			const data = await file.text();
			graph.configure(JSON.parse(data));
			return;
		}

		loadInput.value = null;
		loadInput.click();
	});

	loadInput.onchange = function () {
		let file = loadInput.files[0];

		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = function () {
			let content = reader.result;
			graph.configure(JSON.parse(content));
		};
	};

	document.addEventListener("keydown", function (e) {
		if (e.ctrlKey && e.key == "s") {
			e.preventDefault();
			document.querySelector("#save").click();
		}
		else if (e.ctrlKey && e.key == "o") {
			e.preventDefault();
			document.querySelector("#load").click();
		}
	}, false);
}