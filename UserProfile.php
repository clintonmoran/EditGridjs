<html>
    <head>
        <script type="text/javascript" src="EditGrid.js"></script>
        <script type="text/javascript" src="RequestGenerator.js"></script>
        <script type="text/javascript" src="jquery.js"></script>   
        <script type="text/javascript" src="UserProfile.js" ></script>
        <script type="text/javascript" src="json.js" ></script>
        <link rel="stylesheet" type="text/css" href="Site.css">
        <link rel="stylesheet" type="text/css" href="EditGrid.css">
        <title></title>
    </head>        
    <body onload="UserProfileLoaded();">   
        <div id="Title"></div>
        <div id="Menu" class="SideMenu">   
            <div id="dvEditPersonalInfo" class="MenuItem">Edit Personal Information</div>
            <div id="dvEditRoutes" class="MenuItem">Edit Routes</div>
            <div id="dvEditItems" class="MenuItem">Edit Items</div>
        </div>
        <div id="ContentEditPersonalInfo" class="Content Hidden">
            Edit Personal Info               
        </div>        
        <div id="ContentEditRoutes" class="Content Hidden">
            Edit Routes                   
            <div id="EditGridRoutes" class="EditGrid" headerVisible="true">                        
                <table>
                    <thead>
                        <tr>
                            <th id="EditGridRoutes_CH1" class="EditGridColumnHeader" editType="text" columnDataName="ProfileName" columnVisible="true" 
                                columnWidth="100px">
                                Route Name
                            </th>                            
                            <th id="EditGridRoutes_CH2" class="EditGridColumnHeader" editType="selection" columnDataName="StartLocation" dataSourceID="RouteLocations"
                                columnVisible="true" columnWidth="100px">
                                Start Location
                            </th>
                            <th id="EditGridRoutes_CH3" class="EditGridColumnHeader" editType="text" columnDataName="StartLocationBuffer" 
                                columnVisible="true" columnWidth="100px">
                                Start Radius
                            </th>
                            <th id="EditGridRoutes_CH4" class="EditGridColumnHeader" editType="time" columnDataName="ArriveTime" 
                                columnVisible="true" columnWidth="100px">
                                Arrive Time
                            </th>
                            <th id="EditGridRoutes_CH5" class="EditGridColumnHeader" editType="map" columnDataName="EndLocation" 
                                columnVisible="true" columnWidth="100px">
                                End Location
                            </th>
                            <th id="EditGridRoutes_CH6" class="EditGridColumnHeader" editType="text" columnDataName="EndLocationBuffer" 
                                columnVisible="true" columnWidth="100px">
                                End Radius
                            </th>
                            <th id="EditGridRoutes_CH7" class="EditGridColumnHeader" editType="time" columnDataName="ReturnTime" 
                                columnVisible="true" columnWidth="100px">
                                Return Time
                            </th>
                            <th id="EditGridRoutes_CH8" class="EditGridColumnHeader" editType="checkbox" noEditMode="true" 
                                columnDataName="CanDrive" columnVisible="true" columnWidth="40px">
                                Can Drive?
                            </th>
                            
                            <th id="EditGridRoutes_CH9" class="EditGridColumnHeader" editType="date" 
                                columnVisible="true" columnWidth="40px">
                                Date
                            </th>
                            
                            <th id="EditGridRoutes_CH10" class="EditGridColumnHeader" editType="ActionColumn" noEditMode="true" 
                                columnVisible="true" 
                                saveRow="true" deleteRow="true" cancelEdit="true" columnWidth="60px">                                
                            </th>
                            <th id="EditGridRoutes_CH10" style="display:none;" class="EditGridColumnHeader" editType="none" noEditMode="true" columnDataName="cmh_UserProfileID" columnVisible="false" columnWidth="100px">                                
                            </th>
                        </tr>
                    </thead>
                    <tbody class="EditGridBodyPlaceholder">                                                
                    </tbody>
                </table>
                <div id="DataSources">
                    <ol id="RouteLocations" style="display: none;">
                        <li value="Sweet Home" display="Sweet Home"/>
                        <li value="Lebanon" display="Lebanon"/>
                        <li value="Albany" display="Albany"/>
                        <li value="Brownsville" display="Brownsville"/>
                    </ol>
                </div>
            </div>
        </div>
        <div id="ContentEditItems" class="Content Hidden">       
            Edit Items
        </div>      
    </body>
</html>