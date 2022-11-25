const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { response } = require("express");


const loadFile = (req, res = response) => {

    //console.log(req.files);
 
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.fileUp) {
      res.status(400).json({ msg: 'No files were uploaded.'});
      return;
    }
  
    const { fileUp } = req.files; 
    const nameCut = fileUp.name.split('.');
    const extension = nameCut[ nameCut.length - 1];

    // Validar extensiones
    const validExtension = ['png', 'jpg','jpeg', 'gif'];
    if (!validExtension.includes( extension )) {
      return res.status(400).json({
        msg: `Extension ${ extension } is not allowed. Use the next extensions: ${ validExtension }`
      })
    }

    const tempName = uuidv4() + '.' + extension;
    
    const uploadPath = path.join(__dirname, '../uploads/', tempName);
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