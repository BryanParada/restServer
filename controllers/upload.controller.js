
const { response } = require("express");
const { uploadFile } = require("../helpers");


const loadFile = async(req, res = response) => {

    //console.log(req.files);
 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.fileUp) {
      res.status(400).json({ msg: 'No files were uploaded.'});
      return;
    }
  
    try {
      //txt-md
      //const fileName = await uploadFile(req.files, ['txt', 'md'], 'textFiles');
      const fileName = await uploadFile(req.files, undefined, 'imgs');
      res.json({
        fileName
      })
      
    } catch (msg) {
      res.status(400).json({msg});
    }





}


module.exports = {
    loadFile
}