// ------------------------------------------Ali coded items BELOW --------------------------------//

$(document).ready(function() {
    Check_Web_Storage();
    console.log("ready!");
    $.ajaxSetup({
        url: 'db.php',
        type: 'post',
        cache: 'false',
        async: false,
        success: function(data) {
            //alert('Ajax sent');
            console.log(data);
        },
        complete: function() {},
        error: function() {
            alert('Ajax failed');
        }
    });
    /*   Call PHP DB Unit test
     DB_Unit_Test_Get_From_DB()
     DB_Unit_Test_Write_To_DB()
     DB_Unit_Test_Update_DB()
     DB_Unit_Test_Delete_From_DB()
     */
    //Get_States();
    Main();
});

function Main(){
    var States = new States_Manager();
    var States_Data = States.Get_From_DB;
    States.Start_User_Listener();




};

function States_Manager(){
    this.Get_From_DB = function(){
        var action = "Get_States";
        var Ajax_Data = {
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var States_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        //return States_Data;
        this.Clear_Form();
        this.Update_Drop_down(States_Data);
        //this.Start_Listener();
    };
    this.Update_Drop_down = function(States_Data){
        var select = document.getElementById("Select_States");
        var i;
        for (i = 0; i < States_Data.length; i++) {
            select.options[select.options.length] = new Option(States_Data[i].STATE_NAME, States_Data[i].STATE_ID);
        }
    };
    this.Clear_Form = function(){
        document.getElementById("Select_States").value = "";
    };
    this.Start_User_Listener = function(){
        var State_Drop_Down = document.getElementById("Select_States");
        State_Drop_Down.addEventListener("change", function () {
            var State_ID = State_Drop_Down.options[State_Drop_Down.selectedIndex].value;
            var District_Handler = new District_Manager();
            District_Handler.Get_From_DB(State_ID);
        });
    }
}


function District_Manager(){
    this.Get_From_DB = function(State_ID){
        var action = "Get_Districts";
        var Ajax_Data = {
            State_ID: State_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        // return Districts_Data;
        this.Clear_Form();
        this.Update_Drop_down(Districts_Data);
        this.Start_User_Listener();

    };
    this.Update_Drop_down = function(Districts_Data){
        var select = document.getElementById("Select_Districts");
        var i;
        for (i = 0; i < Districts_Data.length; i++) {
            select.options[select.options.length] = new Option(Districts_Data[i].DISTRICT_NAME, Districts_Data[i].DISTRICT_ID);
        }

    };
    this.Clear_Form = function(){
        document.getElementById("Select_Districts").value = "";
    };
    this.Start_User_Listener = function(){
        var Districts_Drop_Down = document.getElementById("Select_Districts");
        Districts_Drop_Down.addEventListener("change", function () {
            var District_ID = Districts_Drop_Down.options[Districts_Drop_Down.selectedIndex].value;
            var School_Handler = new School_Manager();
            School_Handler.Get_From_DB(District_ID);
        });
    }

}

function School_Manager(){
    this.Get_From_DB = function(District_ID){
        var action = "Get_Districts";
        var Ajax_Data = {
            State_ID: District_ID,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        var Schools_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        this.Clear_Form();
        this.Update_Drop_down(Schools_Data);
        this.Start_User_Listener();
    };
    this.Update_Drop_down = function(Schools_Data){
        var select = document.getElementById("Select_Schools");
        var i;
        for (i = 0; i < Schools_Data.length; i++) {
            select.options[select.options.length] = new Option(Schools_Data[i].DISTRICT_NAME, Schools_Data[i].DISTRICT_ID);
        }
    };
    this.Clear_Form = function(){
        document.getElementById("Select_Schools").value = "";
    };
    this.Start_User_Listener = function(){
        var Schools_Drop_Down = document.getElementById("Select_Schools");
        Schools_Drop_Down.addEventListener("change", function () {
            var School_ID = Schools_Drop_Down.options[Schools_Drop_Down.selectedIndex].value;
            alert(School_ID);
        });
    }

}






/*
 function Process_States(){


 }

 function State_Object(){
 this.Clear = function(){}
 this.Add = function() {}
 this.Delete = function(){}
 this.Update = function() {}
 this.Close_Form = function () {}

 }*/


function Clear_Create_State_Form(){
    document.getElementById("Create_State_Name").value = "";
}

function Clear_Display_Create_District_Form(){
    document.getElementById("Create_District_Name").value = "";
}

function Clear_Display_Create_School_Form(){
    document.getElementById("Create_School_Name").value = "";
    document.getElementById("Create_School_Address").value = "";
}

function Clear_Display_Create_Bus_Number_Form(){
    document.getElementById("Create_Bus_Number").value = "";
}

function Clear_Display_Create_Bus_Stop_Details_Form(){
    document.getElementById("Create_Bus_Stop_Time").value = "";
    document.getElementById("Create_Bus_Stop_Address").value = "";
}

function Grab_Selected_State_ID() {
    var State_ID = document.getElementById("Select_States").value;
    return State_ID;
}

function Grab_Selected_District_ID() {
    var District_ID = document.getElementById("Select_Districts").value;
    return District_ID;
}

function Grab_Selected_School_ID() {
    var School_ID = document.getElementById("Select_Schools").value;
    return School_ID;
}

function Grab_Selected_Bus_Stop_Number_ID() {
    var Bus_Stop_Number_ID = document.getElementById("Select_Bus_Stops").value;
    return Bus_Stop_Number_ID;
}

function Check_Update_Response(Update_Response_Data, Modal) {
    if (Update_Response_Data !== false) {
        $(Modal).modal('hide');
        Get_States();
    }
    else {
        alert("Cannot update, contact your system administrator");
    }
}

function Check_Login_Response(Email, Login_Data) {
    if (Login_Data !== '0') {
        localStorage.setItem("email", Email);
        window.location.href = 'dashboard.html';
    }
    else {
        alert('Incorrect login credentials');
    }
}

function Get_Login(Email, Encrypted_Password) {
    var action = "Get_Login";
    var Ajax_Data = {
        Email: Email,
        Encrypted_Password: Encrypted_Password,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    var Login_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    Check_Login_Response(Email, Login_Data);
}

function Outgoing_Ajax(Ajax_Data) {
    Incoming_Ajax_Data = $.ajax({
        data: Ajax_Data
    }).responseText;
    return Incoming_Ajax_Data;
}

function Get_States() {
    document.getElementById('Select_States').options.length = 1;
    document.getElementById('Select_Districts').options.length = 1;
    document.getElementById('Select_Schools').options.length = 1;
    // document.getElementById('Select_Bus_Stops').options.length = 1;
    //document.getElementById('Select_Bus_Stops_Address').options.length = 1;
    var action = "Get_States";
    var Ajax_Data = {
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    var States_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    Select_States(States_Data);
}

function Get_Districts(State_ID) {
    document.getElementById('Select_Districts').options.length = 1;
    document.getElementById('Select_Schools').options.length = 1;
    //document.getElementById('Select_Bus_Stops').options.length = 1;
    //document.getElementById('Select_Bus_Stops_Address').options.length = 1;
    var action = "Get_Districts";
    var Ajax_Data = {
        State_ID: State_ID,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    var Districts_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    Select_Districts(Districts_Data);
}

function Get_Schools(District_ID) {
    document.getElementById('Select_Schools').options.length = 1;
    // document.getElementById('Select_Bus_Stops').options.length = 1;
    //document.getElementById('Select_Bus_Stops_Address').options.length = 1;
    var action = "Get_Schools";
    var Ajax_Data = {
        District_ID: District_ID,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    var Schools_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    Select_Schools(Schools_Data);
}

function Get_Bus_Stop_Numbers(School_ID) {
    // document.getElementById('Select_Bus_Stops').options.length = 1;
    // document.getElementById('Select_Bus_Stops_Address').options.length = 1;
    var action = "Get_Bus_Stop_Numbers";
    var Ajax_Data = {
        School_ID: School_ID,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    var Bus_Stops_Number_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    Select_Bus_Stops(Bus_Stops_Number_Data);
    Get_Bus_Stop_Details(School_ID);
}

function Get_Bus_Stop_Details(Bus_Stop_Number_ID) {
    document.getElementById('Select_Bus_Stops_Address').options.length = 1;
    var action = "Get_Bus_Stop_Details";
    var Ajax_Data = {
        Bus_Stop_Number_ID: Bus_Stop_Number_ID,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    var Bus_Stop_Details_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    Select_Bus_Stops_Details(Bus_Stop_Details_Data);
    //Get_View_All_Bus_Stops(Bus_Stop_Number_ID)
}

function Get_View_All_Bus_Stops(Bus_Stop_Number_ID){
    var action = "Get_View_All_Bus_Stops";
    var Ajax_Data = {
        Bus_Stop_Number_ID: Bus_Stop_Number_ID,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    var Bus_Stop_Details_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    View_All_Bus_Stops(Bus_Stops_Number_And_Detail_Data)
}

function Select_States(States_Data) {
    var select = document.getElementById("Select_States");
    var i;
    for (i = 0; i < States_Data.length; i++) {
        select.options[select.options.length] = new Option(States_Data[i].STATE_NAME, States_Data[i].STATE_ID);
    }
}

function Select_Districts(Districts_Data) {
    var select = document.getElementById("Select_Districts");
    var i;
    for (i = 0; i < Districts_Data.length; i++) {
        select.options[select.options.length] = new Option(Districts_Data[i].DISTRICT_NAME, Districts_Data[i].DISTRICT_ID);
    }
}

function Select_Schools(Schools_Data) {
    var select = document.getElementById("Select_Schools");
    var i;
    for (i = 0; i < Schools_Data.length; i++) {
        select.options[select.options.length] = new Option(Schools_Data[i].SCHOOL_NAME, Schools_Data[i].SCHOOL_ID);
    }
}

function Select_Schools(Schools_Data) {
    var select = document.getElementById("Select_Schools");
    var i;
    for (i = 0; i < Schools_Data.length; i++) {
        select.options[select.options.length] = new Option(Schools_Data[i].SCHOOL_NAME, Schools_Data[i].SCHOOL_ID);
    }
}

function Select_Bus_Stops(Bus_Stops_Number_Data) {
    var select = document.getElementById("Select_Bus_Stops");
    var i;
    for (i = 0; i < Bus_Stops_Number_Data.length; i++) {
        select.options[select.options.length] = new Option(Bus_Stops_Number_Data[i].BUS_STOP_NUMBER, Bus_Stops_Number_Data[i].BUS_STOP_NUMBER_ID);
    }
}

function Select_Bus_Stops_Details(Bus_Stop_Details_Data) {
    var select = document.getElementById("Select_Bus_Stops_Address");
    var i;
    for (i = 0; i < Bus_Stop_Details_Data.length; i++) {
        select.options[select.options.length] = new Option(Bus_Stop_Details_Data[i].BUS_STOP_ADDRESS, Bus_Stop_Details_Data[i].BUS_STOP_DETAIL_ID);
    }
}

function View_All_Bus_Stops(Bus_Stops_Number_And_Detail_Data) {
    var View_All_Bus_Stops = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead><tbody>';
    var i;
    for (i = 0; i < Bus_Stop_Details_Data.length; i++) {
        j = Bus_Stop_Details_Data[i].BUS_STOP_NUMBER;
        View_All_Bus_Stops += '<tr>';
        var Row_Span = 0;
        var j;
        for (j = i; Bus_Stop_Details_Data[i].BUS_STOP_NUMBER !== Last_Bus && j < Bus_Stop_Details_Data.length && Bus_Stop_Details_Data[j].BUS_STOP_NUMBER == Bus_Stop_Details_Data[i].BUS_STOP_NUMBER; j++) {
            Row_Span++;
        }
        if (Row_Span > 0) {
            var Last_Bus = Bus_Stop_Details_Data[i].BUS_STOP_NUMBER;
            View_All_Bus_Stops += '<td rowspan="' + Row_Span + '">' + Last_Bus + '</td>';
        }
        View_All_Bus_Stops += '<td>' + Bus_Stop_Details_Data[i].BUS_STOP_TIME + '</td><td>' + Bus_Stop_Details_Data[i].BUS_STOP_ADDRESS + '</td></tr>';
    }
    View_All_Bus_Stops += '</tbody>';
    document.getElementById("View_All_Bus_Stops").innerHTML = View_All_Bus_Stops;
}

function Create_State(State_Name) {
    var Names = ["State Name"];
    var Values = [State_Name];
    if (Validate_Text_Fields(Names, Values) != false) {
        var action = "Create_State";
        var Ajax_Data = {
            State_Name: State_Name,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        var Modal = '#Create_State_Form';
        State_Response(Create_Response_Data, Modal);
    }
}

function State_Response(Create_Response_Data, Modal) {
    if (Create_Response_Data !== false) {
        $(Modal).modal('hide');
        Get_States();
    }
    else {
        alert('state creation failed, please try again');
    }
}

function Create_District(District_Name) {
    var State_ID = Grab_Selected_State_ID();
    var Names = ["District Name"];
    var Values = [District_Name];
    if (Validate_Text_Fields(Names, Values) != false) {
        var action = "Create_District";
        var Ajax_Data = {
            State_ID: State_ID,
            District_Name: District_Name,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        var Modal = '#Display_Create_District_Form';
        District_Response(Create_Response_Data, Modal, State_ID);
    }
}

function District_Response(Create_Response_Data, Modal, State_ID) {
    if (Create_Response_Data !== false) {
        $(Modal).modal('hide');
        Get_Districts(State_ID);
    }
    else {
        alert('district creation failed, please try again');
    }
}

function Create_School(School_Name, School_Address) {
    var District_ID = Grab_Selected_District_ID();
    var Names = ["School Name", "School Address"];
    var Values = [School_Name, School_Address];
    if (Validate_Text_Fields(Names, Values) != false) {
        var action = "Create_School";
        var Ajax_Data = {
            District_ID: District_ID,
            School_Name: School_Name,
            School_Address: School_Address,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        var Modal = '#Display_Create_School_Form';
        School_Response(Create_Response_Data, Modal, District_ID);
    }
}

function School_Response(Create_Response_Data, Modal, District_ID) {
    if (Create_Response_Data !== false) {
        $(Modal).modal('hide');
        Get_Schools(District_ID);
    }
    else {
        alert('district creation failed, please try again');
    }
}

function Create_Bus_Number(Bus_Number) {
    var School_ID = Grab_Selected_School_ID();
    alert(Bus_Number);
    var Names = ["Bus Number"];
    var Values = [Bus_Number];
    if (Validate_Text_Fields(Names, Values) != false) {
        var action = "Create_Bus_Number";
        var Ajax_Data = {
            School_ID: School_ID,
            Bus_Number: Bus_Number,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        var Modal = '#Display_Create_Bus_Number_Form';
        Bus_Stop_Number_Response(Create_Response_Data, Modal, School_ID);
    }
}

function Bus_Stop_Number_Response(Create_Response_Data, Modal, School_ID) {
    if (Create_Response_Data !== false) {
        $(Modal).modal('hide');
        Get_Bus_Stop_Numbers(School_ID);
    }
    else {
        alert('bus stop number creation failed, please try again');
    }
}

function Create_Bus_Stop_Detail(Bus_Stop_Time, Bus_Stop_Address) {
    var Bus_Stop_Number_ID = Grab_Selected_Bus_Stop_Number_ID();
    Bus_Stop_Latitude = "22"; //temp
    Bus_Stop_Longitude = "11"; //temp
    var Names = ["Bus Stop Time", "Bus Stop Address", "Bus Stop Latitude", "Bus Stop Longitude"];
    var Values = [Bus_Stop_Time, Bus_Stop_Address, Bus_Stop_Latitude, Bus_Stop_Longitude];
    if (Validate_Text_Fields(Names, Values) != false) {
        var action = "Create_Bus_Stop_Detail";
        var Ajax_Data = {
            Bus_Stop_Number_ID: Bus_Stop_Number_ID,
            Bus_Stop_Time: Bus_Stop_Time,
            Bus_Stop_Address: Bus_Stop_Address,
            Bus_Stop_Latitude: Bus_Stop_Latitude,
            Bus_Stop_Longitude: Bus_Stop_Longitude,
            action: action
        };
        Outgoing_Ajax(Ajax_Data);
        Create_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
        var Modal = '#Display_Create_Bus_Stop_Details_Form';
        Bus_Stop_Stop_Details_Response(Create_Response_Data, Modal, Bus_Stop_Number_ID);
    }
}

function Bus_Stop_Stop_Details_Response(Create_Response_Data, Modal, Bus_Stop_Number_ID) {
    if (Create_Response_Data !== false) {
        $(Modal).modal('hide');
        Get_Bus_Stop_Details(Bus_Stop_Number_ID);
    }
    else {
        alert('bus stop time and address creation failed, please try again');
    }
}

function Display_Update_State() {
    var State_ID = Grab_Selected_State_ID();
    var action = "Get_State_Data";
    var Ajax_Data = {
        State_ID: State_ID,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    State_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    document.getElementById("Update_State_Name").value = State_Data[0].STATE_NAME;
}

function Display_Update_District() {
    var District_ID = Grab_Selected_District_ID();
    var action = "Get_District_Data";
    var Ajax_Data = {
        District_ID: District_ID,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    District_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    document.getElementById("Update_District_Name").value = District_Data[0].DISTRICT_NAME;
}

function Display_Update_School() {
    var School_ID = Grab_Selected_School_ID();
    var action = "Get_School_Data";
    var Ajax_Data = {
        School_ID: School_ID,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    School_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    document.getElementById("Update_School_Name").value = School_Data[0].SCHOOL_NAME;
    document.getElementById("Update_School_Address").value = School_Data[0].SCHOOL_ADDRESS;
}

function Display_Update_Bus_Stop_Number() {
    var Bus_Stop_Number_ID = Grab_Selected_Bus_Stop_Number_ID();
    var action = "Display_Update_Bus_Stop_Number";
    var Ajax_Data = {
        Bus_Stop_Number_ID: Bus_Stop_Number_ID,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    Bus_Stop_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    document.getElementById("Update_Bus_Stop_Number").value = Bus_Stop_Data[0].BUS_STOP_NUMBER;
    document.getElementById("Update_Bus_Stop_Time").value = Bus_Stop_Data[0].BUS_STOP_TIME;
    document.getElementById("Update_Bus_Stop_Address").value = Bus_Stop_Data[0].BUS_STOP_ADDRESS;
}

function Display_Update_Bus_Stop_Details() {
    var Bus_Stop_Number_ID = Grab_Selected_Bus_Stop_Number_ID();
    var action = "Display_Update_Bus_Stop_Details";
    var Ajax_Data = {
        Bus_Stop_Number_ID: Bus_Stop_Number_ID,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    Bus_Stop_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    document.getElementById("Update_Bus_Stop_Number").value = Bus_Stop_Data[0].BUS_STOP_NUMBER;
    document.getElementById("Update_Bus_Stop_Time").value = Bus_Stop_Data[0].BUS_STOP_TIME;
    document.getElementById("Update_Bus_Stop_Address").value = Bus_Stop_Data[0].BUS_STOP_ADDRESS;
}

function Update_State() {
    var New_State_Name = document.getElementById("Update_State_Name").value;
    var State_ID = Grab_Selected_State_ID();
    var action = "Update_State";
    var Ajax_Data = {
        State_ID: State_ID,
        New_State_Name: New_State_Name,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    var Modal = '#UpdateStateModal';
    Check_Update_Response(Update_Response_Data, Modal);
}

function Update_District() {
    var New_District_Name = document.getElementById("Update_District_Name").value;
    var District_ID = Grab_Selected_District_ID();
    var action = "Update_District";
    var Ajax_Data = {
        District_ID: District_ID,
        New_District_Name: New_District_Name,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    var Modal = '#UpdateDistrictModal';
    Check_Update_Response(Update_Response_Data, Modal);
}

function Update_School() {
    var New_School_Name = document.getElementById("Update_School_Name").value;
    var New_School_Address = document.getElementById("Update_School_Address").value;
    var School_ID = Grab_Selected_School_ID();
    var action = "Update_School";
    var Ajax_Data = {
        School_ID: School_ID,
        New_School_Name: New_School_Name,
        New_School_Address: New_School_Address,
        action: action
    };
    Outgoing_Ajax(Ajax_Data);
    Update_Response_Data = jQuery.parseJSON(Incoming_Ajax_Data);
    var Modal = '#UpdateSchoolModal';
    Check_Update_Response(Update_Response_Data, Modal);
}

function Validate_Text_Fields(Names, Values) {
    var i;
    for (i = 0; i < Values.length; i++) {
        if (Values[i] == null || Values[i] == "") {
            alert("Invalid " + Names[i]);
            return false;
        }
    }
}

function Login() {
    var Email = document.getElementById("Email").value;
    var Password = document.getElementById("Password").value;
    Encryption(Email, Password);
}

function Encryption(Email, Password) {
    var Encrypted_Password = Password;
    Get_Login(Email, Encrypted_Password);
}

function Check_Web_Storage() {
    if (typeof(Storage) !== "undefined") {
        Start_Web_Storage();
    }
    else {
        alert('Sorry, your browser does not support Web Storage...');
    }
}

function Start_Web_Storage() {
    Storage_Email = localStorage.getItem("email");
    if (Storage_Email !== null) {
        Logged_In();
        document.getElementById("login_placeholder").innerHTML = '<p class="navbar-text">Signed in as ' + Storage_Email + '</p>';
    }
    else {
        Navigation_Right_Logged_Out();
    }
}

function Logout() {
    End_Web_Storage(Email);
    window.location.href = "index1.html";
}

function End_Web_Storage(Email) {
    localStorage.removeItem("email");
}

function Logged_In() {
    Navigation_Right_Logged_In();
}

function Navigation_Right_Logged_In() {
    document.getElementById("Account").style.display = "block";
    document.getElementById("Logout").style.display = "block";
}

function Navigation_Right_Logged_Out() {
    //document.getElementById("Login").style.display = "block";
}


// ------------------------------------------Ali coded items ABOVE --------------------------------//

/*
 function Table_Bus_Stops(Bus_Stops_Data){
 var Last_Bus;
 var Bus_Stops_Table = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead><tbody>';
 var i;
 var j;
 var Row_Span;
 for(i = 0; i < Bus_Stops_Data.length; i++) {
 j = Bus_Stops_Data[i].BUS_NUMBER;
 Bus_Stops_Table += '<tr>';
 Row_Span = 0;
 for(j = i; Bus_Stops_Data[i].BUS_NUMBER != Last_Bus && j < Bus_Stops_Data.length && Bus_Stops_Data[j].BUS_NUMBER == Bus_Stops_Data[i].BUS_NUMBER; j++) {
 Row_Span++;
 }
 if (Row_Span > 0){
 Last_Bus = Bus_Stops_Data[i].BUS_NUMBER;
 Bus_Stops_Table += '<td rowspan="' + Row_Span +'">' + j +'</td>';
 }
 Bus_Stops_Table += '<td>' + Bus_Stops_Data[i].BUS_STOP_TIME + '</td><td>' + Bus_Stops_Data[i].BUS_STOP_ADDRESS + '</td></tr>';
 }
 Bus_Stops_Table += '</tbody>';
 document.getElementById("Bus_Stops_Table").innerHTML = Bus_Stops_Table;
 }

 function Reset_Bus_Stops(){
 var Bus_Stops_Table = '<thead><tr><th>Bus #</th><th>Stop Time</th><th>Stop Address</th></tr></thead>';
 document.getElementById("Bus_Stops_Table").innerHTML = Bus_Stops_Table;
 }
 */


// ------------------------------------------Marlon coded items BELOW --------------------------------//

window.onload = function(){
    /*   Call PHP DB Unit test
     DB_Unit_Test_Read_From_DB()
     DB_Unit_Test_Write_To_DB()
     DB_Unit_Test_Update_DB()
     DB_Unit_Test_Delete_From_DB()
     */
    Get_States();

};


function Process_User_Address(User_Address){
    var School_ID = Get_School_ID();
    var Validated_User_Address = Validate_User_Address_and_School_ID(User_Address, School_ID);
    if(Validated_User_Address != false)
        Find_Closest_Bus_Stop(Validated_User_Address, School_ID);
}

function Process_User_Location(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var User_Address = new Address_Object();
            var Latitude = position.coords.latitude;
            var Longitude = position.coords.longitude;
            User_Address.Set_Latitude(Latitude);
            User_Address.Set_Longitude(Longitude);
            User_Address.Set_Lat_Long_Location();
            var School_ID = Get_School_ID();
            if(isSchoolIDValid(School_ID) == true)
                Find_Closest_Bus_Stop(User_Address, School_ID);
        }, function() {
            alert('Error: The Geolocation service failed. Please enter an address to find the closest Bus Stop');
            document.getElementById("User_Address").focus();
            document.getElementById("User_Address").style.backgroundColor="#FFFF85";
        });
    } else {
        alert('Error: Your browser doesn\'t support geolocation. Please enter an address to find the closest Bus Stop');
        document.getElementById("User_Address").focus();
        document.getElementById("User_Address").style.backgroundColor="#FFFF85";
    }
}

function Validate_User_Address_and_School_ID(User_Address, School_ID){ //UT
    var Attention_Field_Color = "#FF0000";
    var Valid_Field_Color = "#FFFFFF";
    var User_Address_Field = new Change_Element("User_Address");
    var School_Drop_Down = new Change_Element("Select_Schools");
    if (isUserAddressValid(User_Address) == false){
        alert("Please Enter a valid address!");
        User_Address_Field.SetColor(Attention_Field_Color);
        User_Address_Field.Select();
    }
    if (isUserAddressValid(User_Address) == true){
        User_Address_Field.SetColor(Valid_Field_Color);
    }
    if (isSchoolIDValid(School_ID) == false){
        alert("Please Select your School");
        School_Drop_Down.SetColor(Attention_Field_Color);
        School_Drop_Down.Select();
    }
    if (isSchoolIDValid(School_ID) == true){
        School_Drop_Down.SetColor(Valid_Field_Color);
    }
    if(isUserAddressValid(User_Address) == true && isSchoolIDValid(School_ID) == true && User_Address_Field.Element != null){
        var Validated_User_Address = Format_User_Address(User_Address);
        User_Address_Field.SetColor(Valid_Field_Color);
        School_Drop_Down.SetColor(Valid_Field_Color);
        return Validated_User_Address;
    }
    if(isUserAddressValid(User_Address) == true && isSchoolIDValid(School_ID) == true && User_Address_Field.Element == null){
        return "Element is null only during Jasmine Testing";
    }
    else
        return false;
}

function isSchoolIDValid(School_ID){ //UT
    if (School_ID == "")
        return false;
    else
        return true;
}

function isUserAddressValid(User_Address){ //UT
    var elements = 10;
    if((User_Address.length >= elements)&& typeof User_Address == 'string' ){
        var regex = /\d{1,3}.?\d{0,3}\s[a-zA-Z]{2,30}\s[a-zA-Z]{2,15}/;
        var valid_flag = regex.test(User_Address);
        return valid_flag;
    }
    else{
        return false;
    }
}

function Change_Element(Element_ID){ //UT
    this.Element = document.getElementById(Element_ID);
    this.SetColor = function(Color){
        if(this.Element != null)
            this.Element.style.backgroundColor = Color;
    };
    this.Select = function() {
        if(this.Element != null)
            this.Element.focus();}
}

function Address_Object (){ //UT
    this.Latitude;
    this.Longitude;
    this.Location;
    this.Lat_Long_Location;
    this.Set_Location = function(User_Address) {
        if(typeof User_Address != 'undefined' && User_Address != ""){
            this.Location = User_Address;
        }
        else {
            console.log("Cannot create Address location due to invalid input");
            alert("Cannot create Address location due to invalid input");
        }
    };
    this.Get_LatLong = function () {
        var action = "Geocode_PHP";
        var Read_Geocode_Data = {Address: this.Location, action: action};
        var Address_Coordinates = $.ajax({data: Read_Geocode_Data}).responseText;
        Address_Coordinates = jQuery.parseJSON(Address_Coordinates);
        console.log(Address_Coordinates);
        this.Latitude = Address_Coordinates.Latitude;
        this.Longitude = Address_Coordinates.Longitude;
    };
    this.Set_Lat_Long_Location = function(){
        if (typeof this.Latitude != 'number')
            alert("Error: Latitude is invalid, it is of type " + typeof this.Latitude);
        if (typeof this.Longitude != 'number')
            alert("Error: Longitude is invalid, it is of type " + typeof this.Longitude);
        if ( typeof this.Latitude == 'number' && typeof this.Longitude == 'number'){
            this.Lat_Long_Location = this.Latitude + "," + this.Longitude;
            return true;
        }
        else{
            return false;
        }
    };
    this.Set_Latitude = function (Latitude) {this.Latitude = Latitude};
    this.Set_Longitude = function (Longitude){this.Longitude = Longitude};
}

function Format_User_Address(User_Address){//UT
    var Validated_User_Address = new Address_Object();
    if (Validated_User_Address.Lat_Long_Location == null ){
        Validated_User_Address.Set_Location(User_Address);
        Validated_User_Address.Get_LatLong();
        Validated_User_Address.Set_Lat_Long_Location();
        return Validated_User_Address;
    }
    else
        return User_Address;
}


function Get_School_ID() {
    var School_Drop_Down = document.getElementById("Select_Schools");
    var School_ID = School_Drop_Down.options[School_Drop_Down.selectedIndex].value;
    return School_ID;
}


function Find_Closest_Bus_Stop(User_Address, School_ID){
    alert("Will Call DB for School_ID " +School_ID);
    var Bus_Stops = Get_Bus_Stops();
    var Walking_Distance = new Walking_Distance_To_Stops();
    var New_Shortest_Bus_Stop = new Shortest_Bus_Stop();
    Bus_Stops = Calculate_Distance_To_Stops_Haversine(User_Address, Bus_Stops);
    Bus_Stops = Sort_Distance_To_Stops(Bus_Stops);
    Bus_Stops =  Walking_Distance.Calculate(User_Address, Bus_Stops);
    Bus_Stops = Sort_Distance_To_Stops(Bus_Stops);
    New_Shortest_Bus_Stop.Map(User_Address, Bus_Stops[0]);
    Show_Button_Map_5_Closest_Stops(User_Address, Bus_Stops);
}

function Show_Button_Map_5_Closest_Stops(User_Address, Bus_Stops){
    var Map_Closest_5_Stops_Btn = document.getElementById("Map_Closest_5_Stops");
    var New_Bus_Stops_Group = new Bus_Stops_Group();
    Map_Closest_5_Stops_Btn.style.visibility="visible";
    Map_Closest_5_Stops_Btn.addEventListener("click", function () {New_Bus_Stops_Group.Map(User_Address, Bus_Stops)});
}

function Bus_Stop_Object (){ //UT
    this.Stop_Time;
    this.Stop_Address;
    this.Distance_to_Stop;
    this.Latitude;
    this.Longitude;
    this.Bus_Stop_Number;
    this.Stop_ID;
    this.New = function(Stop_Time, Stop_Address) {
        if(typeof Stop_Time != 'undefined' && typeof Stop_Address != 'undefined'){
            this.Stop_Time = Stop_Time;
            this.Stop_Address = Stop_Address;
        }
        else {
            console.log("Cannot create Bus Stop Object because it is missing data");
            alert("Cannot create Bus Stop Object because it is missing data");
        }
    };
    this.Set_Stop_ID = function (Stop_ID) { this.Stop_ID = Stop_ID};
    this.Set_Stop_Time = function (Stop_Time) {this.Stop_Time = Stop_Time};
    this.Set_Stop_Address = function (Stop_Address) {this.Stop_Address = Stop_Address};
    this.Set_Distance_to_User = function (Distance_to_User) {this.Distance_to_User = Distance_to_User};
    this.Set_Latitude = function (Latitude) {this.Latitude = Latitude};
    this.Set_Longitude = function (Longitude){this.Longitude = Longitude};
    this.Set_Bus_Stop_Number = function (Bus_Stop_Number){this.Bus_Stop_Number = Bus_Stop_Number};
    this.Get_Stop_ID = function () {return this.Stop_ID};
    this.Get_Stop_Time = function() {return this.Stop_Time};
    this.Get_Stop_Address = function () {return this.Stop_Address};
    this.Get_Distance_to_User = function() {return this.Distance_to_User};
    this.Get_Latitude = function () {return this.Latitude};
    this.Get_Longitude = function (){return this.Longitude};
    this.Get_Bus_Stop_Number = function (){return this.Bus_Stop_Number};
}

function isBusStopValid(Bus_Stop_Object){//UT
    if(typeof Bus_Stop_Object != 'undefined' && Bus_Stop_Object.Stop_Time != null && Bus_Stop_Object.Stop_Address != null){
        return true;
    }
    else {
        console.log("Bus Stop Object is invalid");
        return false;
    }
}

function Create_Bus_Stops_Array(JSON_Array){


}

function Get_Bus_Stops_for_School(School_ID){ //REPLACE
    //Bus_Stops = QueryDBfor(School_ID)
    var Bus_Stop_Objects = [];
    Bus_Stops = Get_Bus_Stops();
    console.log(Bus_Stops);
    return Bus_Stops;
}


function Get_Bus_Stops(){ //REPLACE
    var Bus_Stops =[];
    Bus_Stops[0]= {Stop_Time: "9:00", Stop_Address:"RIVERSIDE AV & HILL ST norwalk ct", Distance_to_Stop: 1, Latitude: 41.1215386, Longitude: -73.4238011};
    Bus_Stops[1]= {Stop_Time:null, Stop_Address:"PONUS AV & ELLS ST norwalk ct", Distance_to_Stop: 1.5, Latitude: 41.1257694, Longitude: -73.4373563};
    Bus_Stops[2]= {Stop_Time:null, Stop_Address:"PONUS AV & CORNWALL RD norwalk ct", Distance_to_Stop: 2.5, Latitude: 41.1258702, Longitude: -73.44233};
    Bus_Stops[3]= {Stop_Time:null, Stop_Address:"GLEN AV & SHORT ST norwalk ct", Distance_to_Stop: 0.5, Latitude: 41.1305955, Longitude: -73.449364};
    Bus_Stops[4]= {Stop_Time:null, Stop_Address:"LEDGEWOOD DR & STYLES LA norwalk ct", Distance_to_Stop: 2.5, Latitude: 41.1277236, Longitude: -73.4464775};
    Bus_Stops[5]= {Stop_Time:null, Stop_Address:"STYLES AV & PENNY LA norwalk ct", Distance_to_Stop: 0.65, Latitude: 41.126766, Longitude: -73.4504417};
    Bus_Stops[6]= {Stop_Time:null, Stop_Address:"PONUS AV & LANCASTER DR norwalk ct", Distance_to_Stop: 6, Latitude: 41.1249925, Longitude: -73.4469242};
    Bus_Stops[7]= {Stop_Time:null, Stop_Address:"MAHER DR & STEPPINGSTONE PL norwalk ct", Distance_to_Stop: 1.2, Latitude: 41.120276, Longitude: -73.438289};
    return Bus_Stops;
}

function Calculate_Distance_To_Stops_Haversine(User_Address, Bus_Stops) {
    for (var Bus_Stop = 0; Bus_Stop < Bus_Stops.length; Bus_Stop++) {
        var Distance = Get_Distance_Haversine(User_Address, Bus_Stops[Bus_Stop]);
        console.log("Distance to Bus Stop " + Bus_Stops[Bus_Stop].Stop_Address + " is " + Distance);
        Bus_Stops[Bus_Stop].Distance_to_Stop = Distance;
    }
    return Bus_Stops;
}

function Get_Distance_Haversine(User_Address, Bus_Stop) { //UT
    var EarthRadius = 3959;
    var Delta_Lat_Rads = Degrees_to_Radians(Bus_Stop.Latitude-User_Address.Latitude);
    var Delta_Lon_Rads = Degrees_to_Radians(Bus_Stop.Longitude-User_Address.Longitude);
    var a =
        Math.sin(Delta_Lat_Rads/2) * Math.sin(Delta_Lat_Rads/2) +
        Math.cos(Degrees_to_Radians(User_Address.Latitude)) *
        Math.cos(Degrees_to_Radians(Bus_Stop.Latitude)) *
        Math.sin(Delta_Lon_Rads/2) * Math.sin(Delta_Lon_Rads/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var Haversine_Distance = EarthRadius * c;
    return Haversine_Distance;
}

function Degrees_to_Radians(deg) { //UT
    return deg * (Math.PI/180)
}


function Walking_Distance_To_Stops() { //UT
    this.Calculate = function (User_Address, Bus_Stops) {
        var Number_of_Stops = 5;
        for (var Bus_Stop = 0; Bus_Stop < Number_of_Stops; Bus_Stop++) {
            var action = "Cal_Distance_PHP";
            var Read_Bus_Stops_Data = {User_Address: User_Address.Lat_Long_Location, Bus_Stop_Address: Bus_Stops[Bus_Stop].Stop_Address, action: action};
            var Raw_Distance = $.ajax({data: Read_Bus_Stops_Data}).responseText;
            var Distance =[];
            Distance = Raw_Distance.split();
            var Distance_to_User = Distance[0];
            if(Distance[1] == 'mi')
                Bus_Stops[Bus_Stop].Distance_to_Stop = Distance_to_User;
            if(Distance[1] == 'ft'){
                var feet_in_a_mile = 5280;
                var miles = Distance_to_User * (1/feet_in_a_mile);
                Bus_Stops[Bus_Stop].Distance_to_Stop = miles;
            }
            console.log("Distance to Bus Stop " + Bus_Stops[Bus_Stop].Stop_Address + " is " + Distance);
        }
        return Bus_Stops;
    };
}

function Sort_Distance_To_Stops(Bus_Stops){ //UT
    var swapped;
    var n = Bus_Stops.length-1;
    do {
        swapped = false;
        for (var Stop=0; Stop < n; Stop++) {
            if (Bus_Stops[Stop].Distance_to_Stop > Bus_Stops[Stop+1].Distance_to_Stop) {
                var temp = Bus_Stops[Stop];
                Bus_Stops[Stop] = Bus_Stops[Stop+1];
                Bus_Stops[Stop+1] = temp;
                swapped = true;
            }
        }
        n--;
    } while (swapped);
    return Bus_Stops;
}

function Bus_Stops_Group() { //UT
    this.Map = function (User_Address, Bus_Stops){
        var Max_Number_of_Stops = 5;
        var map = new google.maps.Map(document.getElementById('map-canvas'));
        var bounds = new google.maps.LatLngBounds();
        var New_Marker = new Marker();
        var latlng = new google.maps.LatLng(User_Address.Latitude, User_Address.Longitude);
        var icon = "http://maps.google.com/mapfiles/kml/pal2/icon2.png";
        New_Marker.Add(User_Address, icon, map);
        bounds.extend(latlng);
        map.fitBounds(bounds);
        for (var Bus_Stop = 0; Bus_Stop < Max_Number_of_Stops ; Bus_Stop++) {
            var icon_number = Bus_Stop+1;
            icon = "http://maps.google.com/mapfiles/kml/paddle/" + icon_number + ".png";
            New_Marker.Add(Bus_Stops[Bus_Stop], icon, map);
            latlng = new google.maps.LatLng(Bus_Stops[Bus_Stop].Latitude, Bus_Stops[Bus_Stop].Longitude);
            bounds.extend(latlng);
            map.fitBounds(bounds);
        }
    }
}

function Marker(){ //UT
    this.Add = function (Address, icon,  map){
        var title = Address.Stop_Address;
        var infowindow = new google.maps.InfoWindow();
        var latlng = new google.maps.LatLng(Address.Latitude, Address.Longitude);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: title,
            icon: new google.maps.MarkerImage(icon)
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(this.title);
            infowindow.open(map, this);
        });
    };
}

function Shortest_Bus_Stop(){ //UT
    this.Map = function (User_Address, Bus_Stop){
        alert("The Closest Bus_Stop is " + Bus_Stop.Stop_Address + " which is " + Bus_Stop.Distance_to_Stop +" miles away");
        var latitude= 41.117744;
        var longitude = -73.4081575;
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        directionsDisplay = new google.maps.DirectionsRenderer();
        var New_Map = new google.maps.LatLng(latitude, longitude);
        var element = document.getElementById("map-canvas");
        var mapOptions = {
            center: New_Map,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        };
        var request = {
            origin: User_Address.Lat_Long_Location,
            destination: Bus_Stop.Stop_Address,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                map = new google.maps.Map(element, mapOptions);
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(response);
            }
            else{
                alert("Something went wrong, could not map the address")
            }
        });
    }

}

function isTimeValid(Time){//UT
    var regex = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;
    var valid_flag = regex.test(Time);
    return valid_flag;
}



//google.maps.event.addDomListener(window, 'load', Initialize_Google_Maps_API);
// ------------------------------------------Marlon coded items ABOVE--------------------------------//