// PDF from CSV
//
// This script adds a command to Adobe Acrobat to create a PDF from a list of PDFs
// In a CSV text file.
//
// The format of the CSV file is:
// The first line contain a full path where all of the individual files will be found
// The remaining lines contain three fields seperated by commas: filename of
//   PDF, page number of PDF, duplicate count.

// Copyright tim lindner, 2015, all rights reserved.

app.addMenuItem({ 
		cName: "tlCompose", 
		cUser: "PDF from CSV...",
		cParent: "View", 
		cExec: "doCompose();",
});

var doCompose = app.trustedFunction( function ()
{
	//Read file data into stream
	var stmFileData = util.readFileIntoStream();

	// Convert data into a String
	var strTextData = util.stringFromStream(stmFileData);
	
	// Convert data to array
	var list = strTextData.split("\n");
	var listLength = list.length
	
	// First entry in list is the base path
	var path = list[0];

	var newDoc = app.newDoc();
	
	// for each line add PDF file
	for (var i = 1; i < listLength; i++) {
		
		if ( list[i].substring(0,1) != "#" ) {
			var comma_position = list[i].lastIndexOf(",");
			var count = parseInt(list[i].substring(comma_position+1));
			var temp_path = list[i].substring(0, comma_position);
			comma_position = temp_path.lastIndexOf(",");
			var page_number = parseInt(temp_path.substring(comma_position+1));
			var full_path = path + temp_path.substring(0, comma_position)
			//app.alert( full_path, 3 );
		
			// add 'count' number of copies
			for ( var j = 0; j < count; j++ ) {
				newDoc.insertPages({
					nPage: newDoc.numPages-1,
					cPath: full_path,
					nStart: page_number-1,
					});
				}
			}
		}
	
	// delete first page automatically created with document
	newDoc.deletePages({ nStart: 0,});

})