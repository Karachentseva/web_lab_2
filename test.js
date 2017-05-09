function Triangle(a, b, c) {
	this.a = a == undefined ? 0.0 : a;
	this.b = b == undefined ? 0.0 : b;
	this.c = c == undefined ? 0.0 : c;


	this.perimeter = function() 
	{
		return 2*(this.a + this.b);
	};
	this.area = function() 
	{
		return Math.abs(this.a*this.b*Math.sin(this.c*180/3.14159265));
	};
	
	this.resizing = function(rowIndex)
	{
		var k = document.getElementById("resize"+rowIndex).value;
		this.a=this.a*k;
		this.b=this.b*k;
	}; 
	this.first_height = function()
	{
	return Math.abs(this.b*Math.sin(this.c*180/3.14159265));
	};
	this.second_height = function()
	{
	return Math.abs(this.a*Math.sin(this.c*180/3.14159265));
	};
 	this.first_diagonal = function()
	{
	return Math.abs(Math.sqrt(this.a*this.a + this.b*this.b - 2 * this.b*this.a*Math.cos(this.c*180/3.14159265)));
	};
	this.second_diagonal= function()
	{
	return Math.abs(Math.sqrt(this.a*this.a + this.b*this.b + 2 * this.b*this.a*Math.cos(this.c*180/3.14159265)));
	};
	
}
function TriangleView(a, b, c) {
	Triangle.call(this, a, b, c);

	this.createOperationView = function(rowIndex) {
		
		var view = document.createDocumentFragment();
		var deleteButton = document.createElement("button");
		var sup=this;
		var input = document.createElement("input");
		 input.id ="resize"+rowIndex;
		 input.addEventListener("change", function(){
		 	sup.resizing(rowIndex);
		 });
		 input.addEventListener("focus", function()
		 {
		 	keyBox.style.borderColor="blue";
		 });
		deleteButton.appendChild(document.createTextNode("Delete"));
		deleteButton.addEventListener("click", function() {
			data.deleteTriangle(rowIndex);
		});
		view.appendChild(deleteButton);	
		view.appendChild(input);
		return view;
	}

	this.createRow = function(rowIndex) {
	    var tr = document.createElement('tr');
	    tr.id = "row_" + rowIndex;

	    var td1 = document.createElement('td');
	    td1.appendChild(document.createTextNode('#' + rowIndex));
		tr.appendChild(td1);

	    var td2 = document.createElement('td');
	    td2.appendChild(document.createTextNode(this.a));
	    tr.appendChild(td2);
	    
	    var td3 = document.createElement('td');
	    td3.appendChild(document.createTextNode(this.b));
		tr.appendChild(td3);

		var td4 = document.createElement('td');
	    td4.appendChild(document.createTextNode(this.c));
		tr.appendChild(td4);

		var td5 = document.createElement('td');
	    td5.appendChild(document.createTextNode(this.perimeter()));
		tr.appendChild(td5);

		var td6 = document.createElement('td');
	    td6.appendChild(document.createTextNode(this.area()));
		tr.appendChild(td6);

		var td7 = document.createElement('td');
	    td7.appendChild(document.createTextNode(this.first_diagonal()));
		tr.appendChild(td7);

		var td8 = document.createElement('td');
	    td8.appendChild(document.createTextNode(this.second_diagonal()));
		tr.appendChild(td8);

		var td9 = document.createElement('td');
		td9.appendChild(document.createTextNode(this.first_height()));
		tr.appendChild(td9);

		var td10 = document.createElement('td');
	    td10.appendChild(document.createTextNode(this.second_height()));
		tr.appendChild(td10);

		var td11= document.createElement('td');
	    td11.appendChild(this.createOperationView(rowIndex));
		tr.appendChild(td11);

		return tr;
	}

}

function getRandom() {
	return Math.round(Math.random()*100)+1;
}

var data = {
	triangles : [
		new TriangleView(1,2,30),
		new TriangleView(3,4,45),
		new TriangleView(10,10,60)
	],
	
	refreshTable : function() {
		var tableBody = document.getElementById('triangles');
		tableBody.innerHTML = '';
		for(var i = 0; i < this.triangles.length; ++i) {
			tableBody.appendChild(this.triangles[i].createRow(i));
		}
	},

	add : function(a, b, c) {
		this.triangles.push(new TriangleView(a, b, c));
		this.refreshTable();
	},

	addRandom : function() {
		this.add(getRandom(), getRandom(), getRandom());
	},

	addCustom : function () {
		var a = parseInt(document.getElementById('a').value);
		var b = parseInt(document.getElementById('b').value);
		var c = parseInt(document.getElementById('c').value);
		if(a>0&&b>0&&c>0)
			this.add(a, b, c);
		this.refreshTable();
	},
	deleteTriangle : function(index) {
		this.triangles.splice(index, 1);
		this.refreshTable();
	},

	clear : function() {
		this.triangles = [];
		this.refreshTable();
	}
}
