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
function registerBinaryNode(name, type, aDef, bDef, widgetType = null) {
	function node() {
		this.addOutput("v", type);
		this.addInput("a", type);
		this.addInput("b", type);

		if(widgetType) {
			this.addProperty("a", aDef);
			this.addProperty("b", bDef);

			this.addWidget(widgetType, "a", aDef, "a");
			this.addWidget(widgetType, "b", bDef, "b");
		}
	}
	node.title = name[0].toUpperCase() + name.slice(1) + " (" + type + ")";
	LiteGraph.registerNodeType(type + "/" + name, node);
}
function registerUnaryNode(name, type) {
	function node() {
		this.addOutput("v", type);
		this.addInput("a", type);
	}
	node.title = name[0].toUpperCase() + name.slice(1) + " (" + type + ")";
	LiteGraph.registerNodeType(type + "/" + name, node);
}

// number
{
	registerInputNode("number", "time");
	// registerOutputNode("number", "");
	registerConstantNode("number", 0, "number");

	registerBinaryNode("add", "number", 0, 0, "number");
	registerBinaryNode("sub", "number", 0, 0, "number");
	registerBinaryNode("mult", "number", 0, 1, "number");
	registerBinaryNode("div", "number", 0, 1, "number");

	registerUnaryNode("abs", "number");

	{
		function node() {
			this.addOutput("v", "number");
			this.addInput("a", "number");
			this.addInput("b", "number");
			this.addInput("t", "number");

			this.addProperty("a", 0);
			this.addProperty("b", 0);
			this.addProperty("t", 0);

			this.addWidget("number", "a", 0, "a");
			this.addWidget("number", "b", 0, "b");
			this.addWidget("number", "t", 0, "t");
		}
		node.title = "Mix (number)";
		LiteGraph.registerNodeType("number/mix", node);
	}

	{
		function node() {
			this.addOutput("v", "number");
			this.addInput("a", "number");
		}
		node.title = "Zig-zag";
		node.desc = "Similar to modulo 1, but goes to v=1 at a=0.5 and back to v=0 at a=1 (and repeating)";
		LiteGraph.registerNodeType("number/zigzag", node);
	}

	{
		function node() {
			this.addOutput("v", "number");
			this.addInput("a", "number");			
		}
		node.title = "Smoothstep";
		LiteGraph.registerNodeType("number/smoothstep", node);
	}
}

// vec3
{
	{
		function node() {
			this.addInput("x", "number");
			this.addInput("y", "number");
			this.addInput("z", "number");
			this.addOutput("v", "vec3");

			this.addProperty("x", 0);
			this.addProperty("y", 0);
			this.addProperty("z", 0);

			this.addWidget("number", "x", 0, "x");
			this.addWidget("number", "y", 0, "y");
			this.addWidget("number", "z", 0, "z");
		}
		node.title = "Compose (vec3)";
		LiteGraph.registerNodeType("vec3/compose", node);
	}

	registerBinaryNode("add", "vec3", 0, 0);
	registerBinaryNode("sub", "vec3", 0, 0);
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
			this.addInput("t", "number");

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
			this.addInput("offset", "vec3");

			this.addProperty("bone", "bone:");

			this.addWidget("text", "bone", "bone:", "bone");
		}
		node.title = "Offet bone (pose)";
		node.desc = "Adds offset to a given bone";
		LiteGraph.registerNodeType("pose/offsetBone", node);
	}

}