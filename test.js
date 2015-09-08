
var url = "http://www.bseindia.com/markets/debt/debt_instruments.aspx?expandable=3";
var http = require("http");

// Utility function that downloads a URL and invokes
// callback with the data.

function download(url, callback) {
    http.get(url, function(res) {
        var data = "";
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on("end", function() {
            callback(data);
        });
    }).on("error", function() {
        callback(null);
    });
}

var cheerio = require("cheerio");
var url = "http://www.bseindia.com/markets/debt/debt_instruments.aspx?expandable=3";
var elasticsearch= require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});
download(url, function(data) {
    if (data) {
        var $ = cheerio.load(data);
        var s=$("table");
        var table=s[4];  //  d array of tr
      console.log(table);
        var setoftr= table.children;
        var firsttr=setoftr[1];
        var setoftd=firsttr.children;
        var firsttd=setoftd[1];
     var value=firsttd.children;
        console.log(value);
        console.log(100);
        console.log(firsttd.children[0].data)
        console.log(value[0].data);
///   test for code
        var tdset=[];
        var indtd=new Array(setoftr.length);

        for(var i=1;i<setoftr.length;i++){
            tdset[i]=setoftr[i].children;
            indtd[i-1]=[];
            console.log(tdset[i]);
            console.log(707);
            for(j=0;j<tdset[i].length;j++){
               var value1=tdset[i][j].children;
                  console.log(value1);
                console.log(400);
                if("data" in value1[0] )
                {
                    console.log(value1[0].data)
                    indtd[i-1][j]=value1[0].data;
                    console.log(indtd[i-1][j])
                }
            }
        }

         var q={};
        var w={};
        for(var i=0;i<setoftr.length-2;i++){
            for(j=0;j<8;j++){
                 console.log(indtd[i][j])
                w[j]=indtd[i][j];
            }
            q[i]=w;
        }
        for(var i=0;i<setoftr.length-2;i++){
            client.index({
                index: 'blog',
                type: 'post',
                id: i,
                body: q[i],
            }, function (err, resp) {
                // ...
            });
        }
        console.log(indtd);
        console.log(indtd.length);
        console.log(q);
        console.log(indtd[1][4]);
    }
    else console.log("error");
});



////
    // ...
