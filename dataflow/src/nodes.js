// Numbers
{
	{
		function node() {
			this.addOutput("v", "number");
			this.addProperty("name", "time");
			this.widget = this.addWidget("text", "name", "time", "name");
		}
		node.title = "Number input";
		LiteGraph.registerNodeType("number/input", node);
	}

	{
		function node() {
			this.addOutput("v", "number");
			this.addInput("a", "number");
		}
		node.title = "Zigzag";
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

// Poses
{
	{
		function node() {
			this.addOutput("v", "pose");
			this.addProperty("name", "pose:default");
			this.widget = this.addWidget("text", "name", "pose:default", "name");
		}
		node.title = "Pose input";
		LiteGraph.registerNodeType("pose/input", node);
	}

	{
		function node() {
			this.addInput("v", "pose");
			this.addProperty("name", "pose");
			this.widget = this.addWidget("text", "name", "pose", "name");
		}
		node.title = "Pose output";
		LiteGraph.registerNodeType("pose/output", node);
	}

	{
		function node() {
			this.addOutput("v", "pose");
			this.addInput("a", "pose");
			this.addInput("b", "pose");
			this.addInput("t", "number");
		}
		node.title = "Mix poses";
		node.desc = "Linearly mixes two poses";
		LiteGraph.registerNodeType("pose/mix", node);
	}

}