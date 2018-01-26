var clicks = 1;

function scrapePages() {
    //alert('hi');
  // var urls = document.forms["FetchThis"]["thisurl"].value;
  //  var urls = document.getElementById("this-url").value;
 
   // var urls = document.getElementById("thisurl").value; dziala    
    
    var urls = document.forms["FetchThis"]["thisurl"].value;
    var npages = document.forms["FetchThis"]["npages"].value;
    var nselector = document.forms["FetchThis"]["nselector"].value;    
    //console.log(urls+npages);
    
    if(isNaN(npages) || npages < 0 ){
       alert("Wprowadź Liczbę");
        return false;
       }
    
    for(var i=1; i<=npages; i++) {
        console.log(urls+i);
        checkgood(urls+i, nselector);
    }
    
   // checkgood(urls, nselector);
  // return false;
}

function checkgood(urls, nselector) {


    clicks++;
    
    function scrapeit(url,selector,callback){
                        
  fetch(url, {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credential': 'true' , 'crossDomain': 'true' , 'dataType': 'html' } )
  .then(function(response) {
  	return response.text();
	})
  .then(function(text){
      var allEllements = [];
    
      allEllements = $( "div", text).filter(selector);
       // console.log( allEllements );
      //console.log(text);
     callback(allEllements);
      if(clicks>1){ 
          
          $('button').prop('disabled', true);
          $('button').addClass('hideit');
                            
                  }
  })
}

    
// with the data
function collectData(data){
  
    for(var i=0; i<=data.length-1; i++) {
        
        //console.log(data[i].innerText);
        console.log( i + ' ' + checkAndSlice(data[i].innerText) );
        $('#write').append('<p>' + (i+1) + checkAndSlice(data[i].innerText) + '</p>');
    }
}

//remove scripts text from quotes here
function checkAndSlice(text) {
    var yesOrNo;
    yesOrNo = text.indexOf('//<![CDATA');
    
    if (yesOrNo < 0) {
    return text;    
    }
    else return sliceThis(text, yesOrNo);
    
}
    
function sliceThis(text, yesOrNo) {
    return text.slice(0,yesOrNo-1);
}

// example
    /*
scrapeit('https://www.goodreadsd.com/quotes',
       '.quoteText',
       collectData
      )
      */
    
    scrapeit(urls, nselector,collectData);
    

   // return false;
}