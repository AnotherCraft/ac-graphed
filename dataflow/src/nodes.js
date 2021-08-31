function registerInputNode(type, defaultValue) {
	function node() {
		this.addOutput("v", type);
		this.addProperty("name", defaultValue);
		this.addWidget("text", "name", defaultValue, "name");
	}
	node.title = "Input (" + type + ")";
	LiteGraph.registerNodeType(type + "/input", node);
}
function registerOutputNode(type, defaultValue) {
	function node() {
		this.addInput("v", type);
		this.addProperty("name", defaultValue);
		this.addWidget("text", "name", defaultValue, "name");
	}
	node.title = "Output (" + type + ")";
	LiteGraph.registerNodeType(type + "/output", node);
}
function registerConstantNode(type, defaultValue, widgetType) {
	function node() {
		this.addOutput("v", type);
		this.addProperty("value", defaultValue);
		this.addWidget(widgetType, "value", defaultValue, "value");
	}
	node.title = "Constant (" + type + ")";
	LiteGraph.registerNodeType(type + "/constant", node);
}
function registerUnaryNode(name, type) {
	function node() {
		this.addOutput("v", type);
		this.addInput("a", type);
	}
	node.title = name[0].toUpperCase() + name.slice(1) + " (" + type + ")";
	LiteGraph.registerNodeType(type + "/" + name, node);
}
function registerBinaryNode(name, type, aDef, bDef, widgetType = null) {
	function node() {
		this.addOutput("v", type);
		this.addInput("a", type);
		this.addInput("b", type);

		if (widgetType) {
			this.addProperty("a", aDef);
			this.addProperty("b", bDef);

			this.addWidget(widgetType, "a", aDef, "a");
			this.addWidget(widgetType, "b", bDef, "b");
		}
	}
	node.title = name[0].toUpperCase() + name.slice(1) + " (" + type + ")";
	LiteGraph.registerNodeType(type + "/" + name, node);
}

// num
{
	registerInputNode("num", "time");
	registerOutputNode("num", "");
	registerConstantNode("num", 0, "number");

	registerBinaryNode("add", "num", 0, 0, "number");
	registerBinaryNode("sub", "num", 0, 0, "number");
	registerBinaryNode("mult", "num", 0, 1, "number");
	registerBinaryNode("div", "num", 0, 1, "number");

	registerUnaryNode("abs", "num");

	{
		function node() {
			this.addOutput("v", "num");
			this.addInput("a", "num");
			this.addInput("b", "num");
			this.addInput("t", "num");

			this.addProperty("a", 0);
			this.addProperty("b", 0);
			this.addProperty("t", 0);

			this.addWidget("number", "a", 0, "a");
			this.addWidget("number", "b", 0, "b");
			this.addWidget("number", "t", 0, "t");
		}
		node.title = "Mix (num)";
		LiteGraph.registerNodeType("num/mix", node);
	}

	{
		function node() {
			this.addOutput("eq", "num");
			this.addOutput("neq", "num");
			this.addOutput("lt", "num");
			this.addOutput("gt", "num");
			this.addInput("a", "num");
			this.addInput("b", "num");

			this.addProperty("a", 0);
			this.addProperty("b", 0);

			this.addWidget("number", "a", 0, "a");
			this.addWidget("number", "b", 0, "b");
		}
		node.title = "Compare (num)";
		LiteGraph.registerNodeType("num/compare", node);
	}

	{
		function node() {
			this.addOutput("v", "num");
			this.addInput("a", "num");
			this.addInput("min", "num");
			this.addInput("max", "num");

			this.addProperty("min", 0);
			this.addProperty("max", 1);

			this.addWidget("number", "min", 0, "min");
			this.addWidget("number", "max", 1, "max");
		}
		node.title = "Clamp (num)";
		LiteGraph.registerNodeType("num/clamp", node);
	}

	{
		function node() {
			this.addOutput("v", "num");
			this.addInput("a", "num");
			this.addInput("srcMin", "num");
			this.addInput("srcMax", "num");
			this.addInput("tgtMin", "num");
			this.addInput("tgtMax", "num");

			this.addProperty("srcMin", 0);
			this.addProperty("srcMax", 1);
			this.addProperty("tgtMin", 0);
			this.addProperty("tgtMax", 1);
			this.addProperty("clamp", true);

			this.addWidget("number", "srcMin", 0, "srcMin");
			this.addWidget("number", "srcMax", 1, "srcMax");
			this.addWidget("number", "tgtMin", 0, "tgtMin");
			this.addWidget("number", "tgtMax", 1, "tgtMax");
			this.addWidget("toggle", "clamp", true, "clamp");
		}
		node.title = "Map (num)";
		LiteGraph.registerNodeType("num/map", node);
	}

	{
		function node() {
			this.addOutput("v", "num");
			this.addInput("a", "num");
		}
		node.title = "Zig-zag";
		node.desc = "Similar to modulo 1, but goes to v=1 at a=0.5 and back to v=0 at a=1 (and repeating)";
		LiteGraph.registerNodeType("num/zigzag", node);
	}

	{
		function node() {
			this.addOutput("v", "num");
			this.addInput("a", "num");
		}
		node.title = "Smoothstep";
		LiteGraph.registerNodeType("num/smoothstep", node);
	}
}

// vec
{
	registerInputNode("vec", "");
	registerOutputNode("vec", "");

	{
		function node() {
			this.addInput("x", "num");
			this.addInput("y", "num");
			this.addInput("z", "num");
			this.addOutput("v", "vec");

			this.addProperty("x", 0);
			this.addProperty("y", 0);
			this.addProperty("z", 0);

			this.addWidget("number", "x", 0, "x");
			this.addWidget("number", "y", 0, "y");
			this.addWidget("number", "z", 0, "z");
		}
		node.title = "Compose (vec)";
		LiteGraph.registerNodeType("vec/compose", node);
	}
	{
		function node() {
			this.addInput("v", "vec");
			this.addOutput("x", "num");
			this.addOutput("y", "num");
			this.addOutput("z", "num");
		}
		node.title = "Decompose (vec)";
		LiteGraph.registerNodeType("vec/decompose", node);
	}

	{
		function node() {
			this.addOutput("v", "vec");
			this.addInput("a", "vec");
			this.addInput("b", "vec");
			this.addInput("t", "num");

			this.addProperty("t", 0);

			this.addWidget("number", "t", 0, "t");
		}
		node.title = "Mix (vec)";
		LiteGraph.registerNodeType("vec/mix", node);
	}

	registerBinaryNode("add", "vec", 0, 0);
	registerBinaryNode("sub", "vec", 0, 0);

	registerUnaryNode("normalize", "vec");
}

// qn
{
	registerInputNode("qn", "time");
	registerOutputNode("qn", "");

	{
		function node() {
			this.addInput("vec", "vec");
			this.addInput("scal", "num");
			this.addOutput("v", "qn");

			this.addProperty("scal", 0);

			this.addWidget("number", "scal", 0, "scal");
		}
		node.title = "Compose (qn)";
		LiteGraph.registerNodeType("qn/compose", node);
	}
	{
		function node() {
			this.addInput("angles", "vec");
			this.addOutput("v", "qn");
		}
		node.title = "From angles (qn)";
		LiteGraph.registerNodeType("qn/fromEulerAngles", node);
	}
	{
		function node() {
			this.addInput("dir", "vec");
			this.addInput("up", "vec");
			this.addOutput("v", "qn");
		}
		node.title = "From dir (qn)";
		LiteGraph.registerNodeType("qn/fromDirection", node);
	}
	{
		function node() {
			this.addInput("srcDir", "vec");
			this.addInput("srcUp", "vec");
			this.addInput("tgtDir", "vec");
			this.addInput("tgtUp", "vec");
			this.addOutput("v", "qn");
		}
		node.title = "From dir ext (qn)";
		LiteGraph.registerNodeType("qn/fromDirectionExt", node);
	}

	registerBinaryNode("add", "qn");
	registerBinaryNode("sub", "qn");
	registerBinaryNode("mult", "qn");

	registerUnaryNode("normalize", "qn");
	registerUnaryNode("invert", "qn");

	{
		function node() {
			this.addOutput("v", "qn");
			this.addInput("a", "qn");
			this.addInput("b", "num");

			this.addProperty("b", 0);

			this.addWidget("number", "b", 0, "b");
		}
		node.title = "MultN (qn)";
		LiteGraph.registerNodeType("qn/multn", node);
	}

	{
		function node() {
			this.addOutput("v", "qn");
			this.addInput("a", "qn");
			this.addInput("b", "qn");
			this.addInput("t", "num");

			this.addProperty("t", 0);

			this.addWidget("number", "t", 0, "t");
		}
		node.title = "Mix (qn)";
		LiteGraph.registerNodeType("qn/mix", node);
	}


	{
		function node() {
			this.addOutput("childRot", "qn");
			this.addOutput("parentRot", "qn");

			this.addInput("inRot", "qn");
			this.addInput("pitchLimit", "num");
			this.addInput("yawLimit", "num");

			this.addProperty("pitchLimit", 180);
			this.addProperty("yawLimit", 180);

			this.addWidget("number", "pitchLimit", 180, "pitchLimit");
			this.addWidget("number", "yawLimit", 180, "yawLimit");
		}
		node.title = "Parented constrained rotation";
		node.description = "outRotation = rot - parentRotation; parent rotation changes if the outRotation would be out of bounds";
		LiteGraph.registerNodeType("qn/parentedConstrainedRotation", node);
	}
}

// pose
{
	registerInputNode("pose", "pose:default");
	registerOutputNode("pose", "pose");

	{
		function node() {
			this.addOutput("v", "pose");
			this.addInput("a", "pose");
			this.addInput("b", "pose");
			this.addInput("t", "num");

			this.addProperty("t", 0);
			this.addProperty("boneFilter", "");
			this.addProperty("ipol", "linear");

			this.addWidget("number", "t", 0, "t");
			this.addWidget("text", "boneFilter", "", "boneFilter");

			this.addWidget("combo", "ipol", "linear", "ipol", { values: ["linear", "smoothstep"] });
		}
		node.title = "Mix (pose)";
		node.desc = "Linearly mixes two poses. Bone filter: only use selected bones from 'b'. Bones should be separated by ',', the 'bone:' prefix is added automatically.";
		LiteGraph.registerNodeType("pose/mix", node);
	}

	{
		function node() {
			this.addOutput("v", "pose");
			this.addInput("pose", "pose");
			this.addInput("offset", "vec");
			this.addInput("rotation", "qn");

			this.addProperty("bone", "bone:");

			this.addWidget("text", "bone", "bone:", "bone");
		}
		node.title = "Adjust bone (pose)";
		node.desc = "Adds offset/rotation to a given bone";
		LiteGraph.registerNodeType("pose/adjustBone", node);
	}

	{
		function node() {
			this.addOutput("v", "pose");
			this.addInput("pose", "pose");

			this.addInput("enable", "num");

			const def = "armLeft=armRight";
			this.addProperty("swap", def);
			this.addProperty("mirrorH", true);

			this.addWidget("text", "swap", def, "swap");
			this.addWidget("toggle", "mirrorH", true, "mirrorH");
			this.addWidget("toggle", "enable", true, "enable");
		}
		node.title = "Swap bone transforms (pose)";
		node.desc = "Swap is in format 'b1=b2,b3=b4'. The 'bone:' prefix is automatically added.";
		LiteGraph.registerNodeType("pose/swapBoneTransforms", node);
	}

}

// Animation
{
	{
		function node() {
			this.addOutput("v", "num");
			this.addInput("target", "num");
			this.addInput("speed", "num");
			this.addInput("time", "num");

			this.addProperty("speed", 1);

			this.addWidget("number", "speed", 1, "speed");
		}
		node.title = "Smoothen (num)";
		LiteGraph.registerNodeType("anim/smoothen", node);
	}

	{
		function node() {
			this.addOutput("v", "vec");
			this.addInput("target", "vec");
			this.addInput("speed", "num");
			this.addInput("time", "num");

			this.addProperty("speed", 1);

			this.addWidget("number", "speed", 1, "speed");
		}
		node.title = "Smoothen (vec)";
		LiteGraph.registerNodeType("anim/smoothenVec", node);
	}


	{
		function node() {
			this.addOutput("v", "num");
			this.addInput("target", "num");
			this.addInput("time", "num");

			this.addProperty("strength", 1);
			this.addProperty("damping", 0);

			this.addWidget("number", "strength", 1, "strength");
			this.addWidget("number", "damping", 0, "damping");
		}
		node.title = "Spring";
		LiteGraph.registerNodeType("anim/spring", node);
	}

	{
		function node() {
			this.addOutput("progress", "num");
			this.addOutput("isRunning", "num");

			this.addInput("startTime", "num");
			this.addInput("duration", "num");
			this.addInput("time", "num");

			this.addProperty("duration", 1);
			this.addProperty("repeat", false);

			this.addWidget("number", "duration", 1, "duration");
			this.addWidget("toggle", "repeat", false, "repeat");
		}
		node.title = "Animation";
		LiteGraph.registerNodeType("anim/single", node);
	}

	{
		function node() {
			this.addInput("startTime", "num")
			this.addInput("time", "num")

			this.addOutput("isRunning", "num");

			this.addProperty("count", 2);

			this.addWidget("number", "count", 2, "count", { min: 1, max: 20, step: 10 });

			this.updateIO();
		}

		node.prototype.updateIO = function() {
			let inputList = ["startTime", "time"];
			let outputList = ["isRunning"];
			for (let i = 0; i < this.properties["count"]; i++) {
				inputList.push("duration" + i);
				outputList.push("progress" + i);
			}

			for (i of inputList) {
				if (this.findInputSlot(i) == -1)
					this.addInput(i, "");
			}
			for (let i = 0; i < this.inputs.length; i++) {
				let n = this.inputs[i].name;
				if (!inputList.includes(n)) {
					this.removeInput(i);
					i--;
				}
			}

			for (i of outputList) {
				if (this.findOutputSlot(i) == -1)
					this.addOutput(i, "");
			}
			for (let i = 0; i < this.outputs.length; i++) {
				let n = this.outputs[i].name;
				if (!outputList.includes(n)) {
					this.removeOutput(i);
					i--;
				}
			}
		}

		node.prototype.onPropertyChanged = function (name) {
			if (name == "count")
				this.updateIO();
		}

		node.title = "Animation sequence";

		LiteGraph.registerNodeType("anim/sequence", node);
	}

	{
		function node() {
			this.addInput("progress", "num")
			this.addInput("pose0", "pose");
			this.addInput("pose1", "pose");
			this.addOutput("pose", "pose");

			this.addProperty("keys", "0,1");
			this.addProperty("ipol", "smoothstep");

			this.addWidget("text", "keys", "0,1", "keys");
			this.addWidget("combo", "ipol", "smoothstep", "ipol", { values: ["linear", "smoothstep"] });
		}

		node.prototype.onPropertyChanged = function (name) {
			if (name == "keys") {
				let lst = this.properties["keys"].split(",").map(x => x.trim()).filter(x => x.length > 0).map((e, i) => "pose" + i);
				for (i of lst) {
					if (this.findInputSlot(i) == -1)
						this.addInput(i, "");
				}
				for (let i = 0; i < this.inputs.length; i++) {
					let n = this.inputs[i].name;
					if (n != "progress" && !lst.includes(n)) {
						this.removeInput(i);
						i--;
					}
				}
			}
		}

		node.title = "Pose sequence";

		LiteGraph.registerNodeType("anim/poseSequence", node);
	}
}

// Graph
{
	{
		function node() {
			this.addInput("v", "");
			this.addProperty("name", "");
			this.addWidget("text", "name", "", "name");
		}
		node.title = "Relay input";
		LiteGraph.registerNodeType("graph/relayInput", node);
	}

	{
		function node() {
			this.addOutput("v", "");
			this.addProperty("name", "");
			this.addWidget("text", "name", "", "name");
		}
		node.title = "Relay output";
		LiteGraph.registerNodeType("graph/relayOutput", node);
	}

	{
		function node() {
			this.addInput("a", "");
			this.addInput("b", "");
			this.addInput("sel", "num");
			this.addOutput("v", "");
		}
		node.title = "Select";
		LiteGraph.registerNodeType("util/select", node);
	}

	{
		function node() {
			this.addInput("a", "");
			this.addInput("store", "num");
			this.addOutput("v", "");
		}
		node.title = "D Latch";
		LiteGraph.registerNodeType("util/dLatch", node);
	}

	{
		function node() {

			this.addProperty("name", "graph:");
			this.addProperty("inputs", "");
			this.addProperty("outputs", "");
			this.addProperty("inheritInputs", true);

			this.addWidget("text", "name", "graph:", "name");
			this.addWidget("text", "inputs", "", "inputs");
			this.addWidget("text", "outputs", "", "outputs");
			this.addWidget("toggle", "inheritInputs", true, "inheritInputs");
		}

		node.prototype.onPropertyChanged = function (name) {
			// Inputs
			if (name == "inputs") {
				let lst = this.properties["inputs"].split(",").map(x => x.trim()).filter(x => x.length > 0);
				for (i of lst) {
					if (this.findInputSlot(i) == -1)
						this.addInput(i, "");
				}
				for (let i = 0; i < this.inputs.length; i++) {
					if (!lst.includes(this.inputs[i].name)) {
						this.removeInput(i);
						i--;
					}
				}
			}

			// Outputs
			else if (name == "outputs") {
				let lst = this.properties["outputs"].split(",").map(x => x.trim()).filter(x => x.length > 0);
				for (i of lst) {
					if (this.findOutputSlot(i) == -1)
						this.addOutput(i, "");
				}
				for (let i = 0; i < this.outputs.length; i++) {
					if (!lst.includes(this.outputs[i].name)) {
						this.removeOutput(i);
						i--;
					}
				}
			}
		}

		node.title = "Property graph";

		LiteGraph.registerNodeType("graph/propertyGraph", node);
	}
}