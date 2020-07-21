/**************************************************************************************
# Developer: Deiner Zapata Silva.
# Date: 21/07/2020
# Last update: 21/06/2020
# Description: GoogleAppScript by synchronization Drive and Repository Files.
# Notes: Just by one file
**************************************************************************************/
function findDirectory(list){
  // Set up the folderID Objects (dictionary)
  var folderID ={id:"None", error:"None"}
  
  //Iterate throught 'list' of folders
  for(i = 0; i < list.length; i++){
    //If not the first item in the 'list,'search then get the previous id
    if(i > 0){
      var parent = DriveApp.getFolderById(folderID.id)
      var folders = parent.getFolders();
      var count = 0;
      
      while(folders.hasNext()){
        var folder = folders.next();
        if(folder.getName() === list[i]){
          folderID.id = folder.getId();
          count++;
        };
      };
      //If the folder with the name selected in the list does not exists, then record the error. 
      if(count === 0){
        folderID.error = "No folder exists in the "+list[i-1]+" folder with the name: "+list[i]+"\n Please create the folder and try again.";
        folderID.id = "None";
        return folderID;
      };
    }else{ 
      // Search for Year folder in the root directory
      var root = DriveApp.getRootFolder();
      var folders = root.getFolders();
      var count = 0;
      
      while(folders.hasNext()){
        var folder = folders.next();
        if(folder.getName() === list[i]){
          folderID.id = folder.getId();
          count++;
        };         
      };
      // The folder with the name in list[0] does not exist in the root directory, then record the following Error. 
      if(count === 0){
        folderID.error = "No folder exists in the 'root' folder with the name: "+list[i]+"\n Please create the folder and try again.";
        folderID.id = "None";
        return folderID;
      };
    };
  };
  return folderID
};

function start(dirList){
  //var dirList = ["2018", "Q4","Unit 3 Report"]
  var dir = findDirectory(dirList);
  
  //Check for errors
  if(dir.id === "None"){
    Logger.log("ERROR!!!!: "+dir.error);
  }else{Logger.log("Directory Exists with ID:"+ dir.id)};
  Logger.log(dir);
};

function SearchFolderByName(folderName)
{      
  var folders = DriveApp.getFolders();     
 while (folders.hasNext()) {
   var folder = folders.next();
   if(folderName == folder.getName()) {         
     return folder;
   }
 }
  return null;
}

// https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
// https://riptutorial.com/google-apps-script/example/22010/create-a-new-text-file-in-google-root-drive-folder
function downloadFile( url ,namefolder='01_ProyectoARIA', nameFile='testgoogle.txt') {
  var response = UrlFetchApp.fetch(url);
  var text = response.getContentText()
  var dirList = [directory];
  var dir = findDirectory(dirList);
  var folder = SearchFolderByName(namefolder);
  var file = folder.createFile(nameFile, text ); // DriveApp.createFile
  //debugger;  // Stop to observe if in debugger
}

function GitHubSincronization(){
  var directory = "https://raw.githubusercontent.com/hoat23/VisionArtificialAndImageProcessing/master/bin/";
  var nameFile = "utils_imgprocessing.py";
  var url = directory + nameFile;
  downloadFile(url, nameFolder='01_ProyectoARIA', nameFile='testgoogle.txt');
}


//this is a function that fires when the webapp receives a GET request
function doGet(e) {
  return HtmlService.createHtmlOutput("request received");
}

//this is a function that fires when the webapp receives a POST request
function doPost(e) {
  var params = JSON.stringify(e.postData.contents);
  params = JSON.parse(params);
  var myData = JSON.parse(e.postData.contents);
  var testRunUrl = myData.test_run_url;
  var testRunName = myData.test_name;
  var testRunEnv = myData.environment_name;
  var testRunResult = myData.result;
  var timestamp = new Date();
  return HtmlService.createHtmlOutput("post request received");
}
