var db = require('./db');
var Request = require('./models/request');
var Case = require('./models/case');
const fs = require('fs');


var data = JSON.parse(fs.readFileSync('./data.json', 'utf-8', function(err, res) {
    console.log("Finished reading");
}));

var result = data.result;



/**
 * Add to DB
 */
result.forEach(function(item, index) {
    // Check Case
    Case.find({case_id: item.case_id}).exec((err, res) => {
        if (res.length == 0) {
            console.log("Zero for ", item.case_id, res);
            // // Create case
            // var c = new Case();
            // c.case_id = item.case_id;
            // c.resolved = false;
            // c.save(function(err, c) {
                
            //     var request = new Request();
            //     request.case_id = c._id;
            //     request.devide_id = 0;
            //     request.longitude = item.longitude;
            //     request.latitude = item.latitude;
                
            //     request.save(function(err, req) {
            //         if (err) {
            //             console.log(err);
            //             return err;
            //         }
            //     });
            // });
        } else {
            console.log(res[0]);
            // var request = new Request();
            // request.case_id = res[0]._id;
            // request.devide_id = 0;
            // request.longitude = item.longitude;
            // request.latitude = item.latitude;
            
            // request.save(function(err, req) {
            //     if (err) {
            //         console.log(err);
            //         return err;
            //     }

            //     console.log(req);
            // });
        }
    });
});

// result.forEach(element => {
//     Case.find({case_id: element.case_id}).exec((err, res) => {
//         if (res.length > 1) {
//             for (var i = 1; i < res.length; i++) {
//                 Case.deleteOne({ _id: res[i]._id}, function (err) {
//                     console.log(err);
//                     Case.find({_id: res[i]._id }).exec((err, r) => {
//                         console.log(r);
//                     })
//                 });
//             }
//         }
//     });
// });

