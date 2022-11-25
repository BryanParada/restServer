const path = require('path');

const { response } = require("express");


const loadFile = (req, res = response) => {

    //console.log(req.files);
 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.fileUp) {
      res.status(400).json({ msg: 'No files were uploaded.'});
      return;
    }
  
    const { fileUp } = req.files; 
    
    const uploadPath = path.join(__dirname, '../uploads/', fileUp.name);
    console.log(uploadPath);
    
    fileUp.mv(uploadPath, (err) => {
      if (err) {
        console.log(err); 
        return res.status(500).json({err});
      }
  
      res.json({ msg: 'File uploaded to ' + uploadPath});
    });


}


module.exports = {
    loadFile
}