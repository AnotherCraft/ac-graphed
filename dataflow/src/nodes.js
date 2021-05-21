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
		LiteGraph.registerNodeType("num/smoothen", node);
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
	registerInputNode("pose", "default");
	registerOutputNode("pose", "pose");

	{
		function node() {
			this.addOutput("v", "pose");
			this.addInput("a", "pose");
			this.addInput("b", "pose");
			this.addInput("t", "num");

			this.addProperty("t", 0);

			this.addWidget("number", "t", 0, "t");
		}
		node.title = "Mix (pose)";
		node.desc = "Linearly mixes two poses";
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

}