var express = require("express");
const router = express.Router();
const { poolPromise_rpa } = require('../connection/server.pra');
const sql = require("mssql");
const { request } = require("express");
const path_file='http://rpa-apiprd.inet.co.th:443/rpa/download/files/'



async function iclaim_get_date (req, res) {
  var datetime_ = new Date();
            var month_ = datetime_.getMonth() + 1;
            var day_ = datetime_.getDate();
            var year_ = datetime_.getFullYear().toString();
            if (month_ < 10) {
                month_ = "0" + month_;
            }
            if (day_ < 10) {
                day_ = "0" + day_a
            }
            var time_ampm = (datetime_.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
            var Time_Create = year_ + "-" + month_ + "-" + day_ + " " + time_ampm;
            console.log(Time_Create)
    var date_on=req.param('date_on');
    if(date_on.includes('-')){
      console.log('- yes')
      var a = date_on.replace(/-/g,'')
      console.log(a)
      date_on=a
    }else if(date_on===undefined){
       date_on=year_+month_+day_
     }
    console.log(req.body)
    console.log(date_on)
   
  try {
   
    const rpa = await poolPromise_rpa ; 
    const result = await rpa 
   
    .request()
    result.query("SELECT doc.doc_id,doc.id_hospital,doc.img_6,doc.img_7,doc.date_on,id_h.hospital AS hospital_name,    'สรุปยอดเคลมประกันผ่าน iClaim '+id_h.hospital+'  ข้อมูล  ณ วันที่ '+FORMAT((CAST(doc.date_on AS DATETIME)),'dd/MM/yyyy') +' เวลา 23:59 น.'AS title FROM iClaim_document AS doc INNER JOIN iClaim_token AS id_h ON doc.id_hospital=id_h.id WHERE doc.date_on='"+date_on+"'",function(err,recordset){
              
      {   
        if (err)
          {console.log(err);}
            if (recordset.rowsAffected[0]==0) {
              res.send({message : "Not Data"});
          }else {             
              if(err) console.log("API: /recordset"+err);
              res.send(recordset.recordsets[0]);
          }  
            
          }})
    }
    catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
async function iclaim_insert_date (req, res) {
  var doc_id=req.body.doc_id;
  var doc_id_hospital=doc_id.substr(7,6);
  var doc_date_on=doc_id.substr(14,8);
  var doc_date_on_=doc_date_on.substr(6,2)+doc_date_on.substr(4,2)+doc_date_on.substr(0,4);
  console.log(doc_id)


  try {
         
    const rpa = await poolPromise_rpa ; 
    const result = await rpa 
    
.request()

result.query("SELECT * FROM iClaim_document WHERE doc_id = '" + doc_id + "' ",function(err,recordset){
            
  {   
    if (err)
      {console.log(err);}
        if (recordset.rowsAffected[0]==0) {
            result.query("SELECT * FROM iClaim_token WHERE id = '" +doc_id_hospital + "' ",function(err,data_token){
            const hospital_id=data_token.recordset[0].id
            const hospital_name=data_token.recordset[0].hospital
            console.log(hospital_id)
            console.log(hospital_name)
            const img6=path_file+'iclaim6_'+doc_date_on_+'_'+hospital_name
            const img7=path_file+'iclaim7_'+doc_date_on_+'_'+hospital_name
            console.log(img6)
            console.log(img7)
            var datetime_ = new Date();
            var month_ = datetime_.getMonth() + 1;
            var day_ = datetime_.getDate();
            var year_ = datetime_.getFullYear().toString();
            if (month_ < 10) {
                month_ = "0" + month_;
            }
            if (day_ < 10) {
                day_ = "0" + day_a
            }
            var time_ampm = (datetime_.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }))
            var Time_Create = year_ + "-" + month_ + "-" + day_ + " " + time_ampm;
            {   
              if (err)
                {console.log(err);}
                result.query("INSERT INTO iClaim_document (doc_id,id_hospital,img_6,img_7,insert_time,date_on) VALUES ('"+doc_id+"','"+hospital_id+"','"+img6+"','"+img7+"','"+Time_Create+"','"+doc_date_on+"')",function(err,recordset){
                    
                  {   
                    if (err)
                     {console.log(err);}
                     else {
                      var setdata = { message: "Insert Success" }
                      res.status(200);
                      res.send(setdata)
                         } 
                        
                      }}) 
                  
                }
              }
                )
      }else {             
          if(err) console.log("API: /recordset"+err);
          var setdata = { message: "duplicate : doc_id" }
                res.status(200);
                res.send(setdata)
      }  
        
      }
    }
      )

    }
    catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
async function iclaim_insert_log (req, res) {
  var doc_name=req.body.doc_name;
  var status=req.body.status;
  var user_name=req.body.user_name;
  var remark=req.body.remark;
  var datetime_ = new Date();
  var month_ = datetime_.getMonth() + 1;
  var day_ = datetime_.getDate();
  var year_ = datetime_.getFullYear().toString();
  if (month_ < 10) {
      month_ = "0" + month_;
  }
  if (day_ < 10) {
      day_ = "0" + day_a
  }
  var time_ampm = (datetime_.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }))
  var Time_Create = year_ + "-" + month_ + "-" + day_ + " " + time_ampm;
  try {
         
    const rpa = await poolPromise_rpa ; 
    const result = await rpa 
    
.request()

result.query("INSERT INTO iClaim_log (Date_on,List,Status,User_name,Remark) VALUES ('"+Time_Create+"','"+doc_name+"','"+status+"','"+user_name+"','"+remark+"')",function(err,recordset){
                    
  {   
    if (err)
     {console.log(err);}
     else {
      var setdata = { message: "Insert Success" }
      res.status(200);
      res.send(setdata)
         } 
        
      }}) 

    }
    catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
async function iclaim_get_log (req, res) {

  try {
   
    const rpa = await poolPromise_rpa ; 
    const result = await rpa 
   
    .request()
    result.query("SELECT * FROM iClaim_log",function(err,recordset){
              
      {   
        if (err)
          {console.log(err);}
            if (recordset.rowsAffected[0]==0) {
              res.send({message : "Not Data"});
          }else {             
              if(err) console.log("API: /recordset"+err);
              res.send(recordset.recordsets[0]);
          }  
            
          }})
    }
    catch (err) {
    res.status(500);
    res.send(err.message);
  }
};
async function iClaim_get_name_hospital (req, res) {
  try {
    const rpa = await poolPromise_rpa ; 
    const result = await rpa 
   
    .request()
    result.query("SELECT * FROM iClaim_token",function(err,recordset){
              
      {   
        if (err)
          {console.log(err);}
            if (recordset.rowsAffected[0]==0) {
              res.send({message : "Not Data"});
          }else {             
              if(err) console.log("API: /recordset"+err);
              res.send(recordset.recordsets[0]);
          }  
            
          }})
    }
    catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

module.exports = { 
  iclaim_get_date,iclaim_insert_date,iclaim_get_log,iclaim_insert_log,iClaim_get_name_hospital
 };
