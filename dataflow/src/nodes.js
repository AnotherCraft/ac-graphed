{
	{
		function ImportPose() {
			this.addOutput("", "pose");
			this.addProperty("pose", "default");
			this.widget = this.addWidget("text", "pose", "default", "pose");
			this.widgets_up = true;
		}

		ImportPose.title = "Import pose";
		ImportPose.desc = "";

		LiteGraph.registerNodeType("pose/import", ImportPose);
	}

}