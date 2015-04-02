var egUserProfile = new EditGrid("EditGridRoutes"); 

function UserProfileLoaded(){   
    //LoadUserData();
    
    LoadUserData2();
    //PopulateDataGrid("EditGridRoutes", null);
    $("#Title").text("Title Don't ya Know");
    
    //Setup event handlers for the menu
    $("#dvEditPersonalInfo").click(MenuClick);   
    $("#dvEditRoutes").click(MenuClick);   
    $("#dvEditItems").click(MenuClick);            
    $("#ContentEditRoutes").addClass("Visible");
    $("#ContentEditRoutes").removeClass("Hidden");    
}

 function MenuClick(event){
     
     //clear content and load editing section
     HideAllContent();
     switch(this.id){         
         case "dvEditPersonalInfo":                       
             $("#ContentEditPersonalInfo").addClass("Visible");               
         break;
         case "dvEditRoutes":             
             $("#ContentEditRoutes").addClass("Visible");
         break;
         case "dvEditItems":             
             $("#ContentEditItems").addClass("Visible");
         break;
     }       
}

function HideAllContent(){
    $(".Content").removeClass("Visible");
    $(".Content").addClass("Hidden");
}

function LoadUserData2(){
    GenerateRequest("RequestHandler.php", "Cmd=GetUserProfiles&UserName=Clint Moran", 
        function(responseText){        
            var profiles = JSON.parse(responseText);                                              
            egUserProfile.PopulateDataGrid(profiles);
        }
    );
}


function EditGridRoutes_OnSave(rowNum){          
    alert(rowNum);
    
    //saving row 'rowNum' to the database
}
function EditGridRoutes_OnDelete(rowNum){    
    //deleting this row from the database
    egUserProfile.DeleteRow(rowNum);
}
function EditGridRoutes_OnCancel(rowNum){    
    egUserProfile.CancelRowEdits(rowNum);    
}