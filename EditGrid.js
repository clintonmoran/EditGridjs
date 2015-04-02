/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *  
 *  EditGrid features
 *  
 *  To create a grid first the column definitions must be defined in HTML along 
 *  with their editable types (text, selection, none). Everything that will be
 *  defined in the html is:
 *      - Column name (needs to match name of data being passed when populated)
 *      - EditType (text, selection, date, checkbox(boolean), time, map, none)
 *      - Visible (if hidden fields are need to hold data like ID's*      
 *  
 *  function PopulateDataGrid(data)
 *  To populate the grid the grid populate function will need to be called 
 *  passing the data in json array format. The populate function will loop through 
 *  each row will be built and added dynamically to the html
 *  
 *  UpdateRow(row) //delegate that will call a provided function passing the updated rows data
 *                  //The update will be triggered by user interaction
 *  To update a row after the user has edited it the grid the user will need
 *  to provide a function that will trigger the sql to be written. This function 
 *  will take as a parameter a json object of that rows data (including hidden 
 *  fields) and update their sources (local source or by xmlhttprequest).
 *  
 */
function EditGrid (GridIDIn){
    this.GridID = GridIDIn; 
    this.GridData = null; 
    this.PopulateDataGrid = function PopulateDataGrid(data){
        this.GridData = data; 
        var tableBody = "";       

        var jqueryResult = $("#" + this.GridID + " .EditGridColumnHeader"); 
        var columnHeaders = $.makeArray(jqueryResult);
        var tableBody = $("#" + this.GridID + " .EditGridBodyPlaceholder")[0];
        tableBody.innerHTML = "";

        for(var rowIndex = 0; rowIndex < data.length; ++rowIndex){
            //row = "<tr>";
            var row = document.createElement("tr");
            row.setAttribute("row", rowIndex + 1);
            
            for(var columnIndex = 0; columnIndex < columnHeaders.length; ++columnIndex){            
                var editType = columnHeaders[columnIndex]["attributes"]["editType"]["value"];
                var cellID = this.GridID + "_r" + (rowIndex + 1) + "_c" + (columnIndex + 1) + "_";
                var cellValue = "";
                if(columnHeaders[columnIndex]["attributes"]["columnDataName"] != null){
                    cellValue = data[rowIndex][columnHeaders[columnIndex]["attributes"]["columnDataName"]["value"]];
                }
                var columnVisible = $("#" + columnHeaders[columnIndex]["id"]).attr("columnVisible");
                var noEditMode = $("#" + columnHeaders[columnIndex]["id"]).attr("noEditMode");

                var tableData = document.createElement("td"); 
                tableData.setAttribute("class","EditGridTD");
                tableData.setAttribute("row", rowIndex + 1); 
                tableData.setAttribute("column", columnIndex + 1); 
                
                var div = document.createElement("div");

                div.setAttribute("id", cellID);
                div.setAttribute("class", "GridCell");
                div.setAttribute("editing","false");            
                
                if(editType.toLowerCase() != "none" && noEditMode != "true"){
                    div.setAttribute("onclick", "EditGridCellClick(this, '" + this.GridID + "')");
                }
                if (columnVisible.toLowerCase() == "false"){
                    div.setAttribute("style", "display:none;");
                }                
                div.setAttribute("editing", "false");
                div.setAttribute("class", "EditGridCell");

                switch(editType){                
                    case "text":
                    case "time":
                    case "date":
                    case "selection":              
                        var label = document.createElement("label");
                        label.setAttribute("class","EditGridValueDisplay");
                        label.innerHTML = cellValue;                    
                        div.appendChild(label);                     
                        break;
                    case "map":
                        //row += "<img border=\"0\" src=\"/images/maplogo.png\" alt=\"Map Logo\" location=\"" + cellValue + "\">";
                        break;               
                    case "checkbox":
                        var checkBox = document.createElement("input");
                        checkBox.setAttribute("type","checkbox");                   
                        if(cellValue == 1 || cellValue == true)
                            cellValue = "\'true\'";
                        else if (cellValue == 0 || cellValue == false)
                            cellValue = "\'false\'";  
                        checkBox.setAttribute("checked",cellValue);
                        div.appendChild(checkBox); 
                        break;
                    case "none":     
                        var labelNoEdit = document.createElement("label");
                        labelNoEdit.setAttribute("class","EditGridValueDisplay");
                        if (columnVisible.toLowerCase() == "false"){                                                    
                             labelNoEdit.setAttribute("style","display:none");
                        }
                        div.appendChild(labelNoEdit);                    
                        break;
                    case "ActionColumn":
                        var saveButton = document.createElement("button");                    
                        //saveButton.setAttribute("id", this.GridID + "_Save_r" + (rowIndex + 1)); 
                        saveButton.setAttribute("type", "button"); 
                        saveButton.setAttribute("class", "EditGridSaveButton");                                        
                        saveButton.setAttribute("onClick", this.GridID + "_OnSave(this.parentNode.parentNode.attributes['row'].value)"); 

                        var cancelButton = document.createElement("button");
                        //cancelButton.setAttribute("id", this.GridID + "_Cancel_r" + (rowIndex + 1)); 
                        cancelButton.setAttribute("type", "button"); 
                        cancelButton.setAttribute("class", "EditGridCancelButton");                                        
                        cancelButton.setAttribute("onClick", this.GridID + "_OnCancel(this.parentNode.parentNode.attributes['row'].value)"); 

                        var deleteButton = document.createElement("button");
                        //deleteButton.setAttribute("id", this.GridID + "_Delete_r" + (rowIndex + 1)); 
                        deleteButton.setAttribute("type", "button"); 
                        deleteButton.setAttribute("class", "EditGridDeleteButton");                                                            
                        deleteButton.setAttribute("onClick", this.GridID + "_OnDelete(this.parentNode.parentNode.attributes['row'].value)");                                         

                        div.setAttribute("class", "EditGridCell EditGridActionColumn");

                        div.appendChild(saveButton);
                        div.appendChild(deleteButton);                
                        div.appendChild(cancelButton);
                        break; 
                }               
                tableData.appendChild(div);
                row.appendChild(tableData);
            }            
            tableBody.appendChild(row);
        }    
    };

    this.CancelRowEdits = function (rowNum){
        ClearAnyEditing(this.GridID); //this needs to be replaced by only canceling the editing on the row that was clicked
        
        //rebuild the row that was being edited
        //set the value of the child element of the cell to the value that exists in the this.GridData variable associated row
        //loop to the row that is being canceld on (rowNum)
            //for each cell in that row
                //replace the cell div's child value with that in the data at row rowNum
                
        var jqueryResult = $("[id*=_r" + rowNum + "_][id*=" + this.GridID + "]");//$("#" + this.GridID + " .EditGridCell");
        var gridRow = $.makeArray(jqueryResult);
        var row = $("#" + this.GridID + " tr [row=" + rowNum + "] div");

        jqueryResult = $("#" + this.GridID + " .EditGridColumnHeader"); 
        var columnHeaders = $.makeArray(jqueryResult);
        
        var cellValue = null;
        for(var columnIndex = 0; columnIndex < columnHeaders.length; ++columnIndex){
            if(columnHeaders[columnIndex]["attributes"]["columnDataName"] != null){
                cellValue = this.GridData[(rowNum - 1)][columnHeaders[columnIndex]["attributes"]["columnDataName"]["value"]];
            }
            //get column number to match with row column
            var columnNum = columnHeaders[columnIndex]["id"].split("_CH")[1]; 
            
            jqueryResult = $("[id*=_r" + rowNum + "_][id*=_c" + columnNum + "_][id*=" + this.GridID + "]");                                    
            var editType = GetColumnAttribute(this.GridID, columnIndex + 1, "editType");//(jqueryResult[0].id, "editType"); //gridID, column, attribute
            switch(editType){
                case "time":           
                case "text":        
                case "date":                
                case "selection":                    
                    jqueryResult[0].innerHTML = "<label class=\"EditGridValueDisplay\">" + cellValue + "</label>"; 
                break;
                case "map":
                    jqueryResult[0].innerHTML = "<img border=\"0\" src=\"/images/maplogo.png\" alt=\"Map Logo\" location=\"" + cellValue + "\">";
                break;               
                case "checkbox":
                    jqueryResult[0].innerHTML = $("#" + jqueryResult[0].id).html();
                break;                
            }             
        }
    };
    
    this.DeleteRow = function (rowNum){                                
        var tstTable = $("#" + this.GridID + " table")[0]; 
        
	tstTable.deleteRow(rowNum);
	
	//Renumber all the rows that remain to be correct
	var rows = $("#" + this.GridID + " tr"); 
        var newRowNum = 1; 
	for(var i = 0; i < rows.length; ++i){
            if(rows[i].attributes["row"] != null){
                rows[i].attributes["row"].value = newRowNum; 
                for(var j = 0; j < rows[i].children.length; ++j){
                    rows[i].children[j].attributes["row"].value = newRowNum; 			
                }
                ++newRowNum;
            }
	}        
    };
}


//*********************Static Functions*********************//s
function EditGridCellClick(cellDiv, gridID){      
    if(cellDiv.attributes["editing"].value == "false"){        
        ClearAnyEditing(gridID);            

        cellDiv.innerHTML = BuildEditControl(cellDiv, gridID, cellDiv.parentNode.attributes["column"].value).outerHTML;           
        cellDiv.setAttribute("editing","true");         
    }
}

function ClearAnyEditing(gridID){
    var jqueryResult = $("#" + gridID + " [editing='true']");
    var editingCells = $.makeArray(jqueryResult);

    for(var i = 0; i < editingCells.length; ++i){
        SetCellToViewState(gridID, editingCells[i]); 
    }
} 

function GetColumnAttribute(gridID, column, attribute){        
    var attributeValue = "";     
    var columnID = gridID + "_CH" + column;                    
    attributeValue = $("#" + columnID).attr(attribute);
    return attributeValue;
}

function BuildEditControl(cellDiv, gridID, column){
    var editControl;      
    var cellValue = cellDiv.children[0].innerText;
    var editType = GetColumnAttribute(gridID, column, "editType");    
    switch(editType){                
        case "text":
            editControl = document.createElement("textarea");
            editControl.setAttribute("class","GridTextEditControl"); 
            editControl.innerHTML = cellValue;
        break;
        case "map"://need to pop a map here
            editControl = document.createElement("img");
            editControl.setAttribute("border","0");
            editControl.setAttribute("src","/images/maplogo.png");
            editControl.setAttribute("alt","Map Logo");
            editControl.setAttribute("location",cellValue);            
        break;
        case "time":                         
            editControl = document.createElement("input");
            editControl.setAttribute("type","time");
            editControl.setAttribute("class","GridTimeEditControl");
            editControl.setAttribute("value",cellValue);            
        break;
        case "checkbox":
            editControl = cellDiv.innerHTML;
        break;
        case "date":                            
            editControl = document.createElement("input");
            editControl.setAttribute("type","date");
            editControl.setAttribute("class","GridDateEditControl");
            editControl.innerHTML = cellValue;
        break;
        case "selection":         
           editControl = BuildSelectControl(gridID, column, cellValue);
        break;
    }    
    return editControl; 
}

function BuildSelectControl(gridID, column, cellValue){
    var select = document.createElement("select");

    var dataSourceId = GetColumnAttribute(gridID, column, "dataSourceID");     
    //Get list items
    var jqueryResult = $("#" + dataSourceId + " li");
    var listItems = $.makeArray(jqueryResult);

    for(var i = 0; i < listItems.length; ++i){
        var option = document.createElement("option");
        var display = listItems[i].getAttribute("display");
        option.setAttribute("value", listItems[i].getAttribute("value"));
        option.innerHTML = display;
        if(display == cellValue)
            option.setAttribute("selected","true");
        select.appendChild(option);
    }
    return select;
}

function BuildViewControl(cellDiv, gridID, column){
    var control;      
    var cellValue = cellDiv.children[0].value;
    var editType = GetColumnAttribute(gridID, column, "editType");
    switch(editType){
        case "time":           
        case "text":        
        case "date":                
        case "selection":                    
            control = "<label class=\"EditGridValueDisplay\">" + cellValue + "</label>"; 
        break;
        case "map":
            control = "<img border=\"0\" src=\"/images/maplogo.png\" alt=\"Map Logo\" location=\"" + cellValue + "\">";
        break;               
        case "checkbox":
            control = cellDiv.innerHTML;
        break;                
    }
    return control; 
}

function SetCellToViewState(gridID, cell){       
    cell.setAttribute("editing", "false");
    cell.innerHTML = BuildViewControl(cell, gridID, cell.parentNode.attributes["column"].value); 
}
