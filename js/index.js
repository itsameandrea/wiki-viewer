$(document).ready(function(){
    
    var articles;

    
    $("#search-term").autocomplete({
        //Fires the change event when something is selected
        select: function(event,ui) { 
            this.value=ui.item.value; 
            $(this).trigger('change'); 
            return false; 
        },
        //feteches the list of results from wiki api using the user insterted keyword
        source: function(request, response) {
            $.ajax({
                url: "https://en.wikipedia.org/w/api.php",
                dataType: "jsonp",
                data: {
                    'action': "opensearch",
                    'format': "json",
                    'search': request.term
                },
                success: function(data) {
                    console.log(data);
                    response(data[1]);
                }
            })
        
        }
    });
    
    
    
    //Lists all the articles matching the keyword used by the user
    $("#search-term").change(function(){
        
        $('#articles-container').html(null);
        
        $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="+$("#search-term").val()+"&callback=?",function(data){
        
            articles = data.query.search;
            console.log (articles);
            
            for (var i = 0; i<articles.length;i++){
                var article_title= articles[i].title;
                
                var article_snippet = articles[i].snippet;
                
                var html = "<a href='https://en.wikipedia.org/wiki/"+encodeURIComponent(article_title)+"'><div class= 'col-lg-8 col-lg-offset-2 col-xs-8 col-xs-offset-2 well article'> <h3>"+article_title+"</h3> <p>"+article_snippet+"</p> </div><a>"
            
                $('#articles-container').append(html);
            }
        });
        
    })


})