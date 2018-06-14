var get = function (url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
 
            xhr.onreadystatechange = function () {
                if (xhr.readyState != xhr.DONE) return;
 
                var status = xhr.status;
                var headers = xhr.getAllResponseHeaders();
                var text = xhr.responseText;
 
                callback(status, headers, text);
            }
 
            xhr.send();
        }
 
        var appendImage = function (url) {
            var imgEl = document.createElement('img');
 
            imgEl.src = url;
 
            imgEl.onerror = function () {
                imgEl.remove();
            }
 
            document.getElementById('images').appendChild(imgEl);
        }

        var getImages = function (params) {
            var allowableLimit = 100;
            
            var limit = params && params.limit || allowableLimit;
            var url = 'https://www.reddit.com/r/pics/search.json?q=cats';
            url += `&limit=${params.limit}`;
              
            if (params.category){
               url += `&category=${params.category}`;
            } 
 
            get(url, function (status, headers, body) {
                var response = JSON.parse(body);
 
                _.each(response.data.children, function (child) {
                    var url = child.data.url;
 
                    appendImage(url);
 
                    console.log('ITEM!', child.data.url);
                });
 
            });
        }
     
        var limitElement = document.getElementById("getNumber");
        var categoryElement = document.getElementsByClassName("grouping")[0];
         
        document.getElementById("getImagesButton").addEventListener("click", function(){
          var category = categoryElement.options[categoryElement.selectedIndex].value;
          var limit = limitElement.value;
          
          getImages({limit: limit, category: category});
          
        });