// Numbers
{
	{
		function node() {
			this.addOutput("v", "number");
			this.addProperty("name", "time");
			this.widget = this.addWidget("text", "name", "time", "name");
		}

		node.title = "Number input";
		node.desc = "";

		LiteGraph.registerNodeType("number/input", node);
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
		node.desc = "";

		LiteGraph.registerNodeType("pose/input", node);
	}

	{
		function node() {
			this.addInput("v", "pose");
			this.addProperty("name", "pose");
			this.widget = this.addWidget("text", "name", "pose", "name");
		}

		node.title = "Pose output";
		node.desc = "";

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
		node.desc = "";

		LiteGraph.registerNodeType("pose/mix", node);
	}

}