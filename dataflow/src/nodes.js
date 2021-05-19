// Numbers
{
	{
		function node() {
			this.addOutput("", "number");
			this.addProperty("name", "time");
			this.widget = this.addWidget("text", "name", "time", "name");
			this.widgets_up = true;
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
			this.addOutput("", "pose");
			this.addProperty("name", "default");
			this.widget = this.addWidget("text", "name", "default", "name");
			this.widgets_up = true;
		}

		node.title = "Pose input";
		node.desc = "";

		LiteGraph.registerNodeType("pose/input", node);
	}

	{
		function node() {
			this.addInput("", "pose");
			this.addProperty("name", "pose");
			this.widget = this.addWidget("text", "name", "pose", "name");
			this.widgets_up = true;
		}

		node.title = "Pose output";
		node.desc = "";

		LiteGraph.registerNodeType("pose/output", node);
	}

	{
		function node() {
			this.addOutput("", "pose");
			this.addInput("a", "pose");
			this.addInput("b", "pose");
			this.addInput("t", "number");
		}

		node.title = "Mix poses";
		node.desc = "";

		LiteGraph.registerNodeType("pose/mix", node);
	}

}