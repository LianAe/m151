export function render(movie) {     
    let checked = movie.isPublic==1?"checked":"";
    return `   
    <!DOCTYPE html>  
    <html lang="en">  
    <head>
        <meta charset="UTF-8">       
        <title>Movie list</title>    
        <link rel="stylesheet" href=" /style.css" />  
    </head>  
    <body>    
        <form action="/movie/save" method="post">      
            <input type="hidden" id="id" name="id" value="${ movie.id  }" />    
            <div>        
                <label for="title">Titel:</label>
                <input type="text" id="title" name="title" value="${ movie.title}" />    
            </div>      
            <div>        
                <label for="id">Jahr:</label>        
                <input type="text" id="year" name="year" value="${ movie.year}" />          
            </div>   
            <div>        
                <label for="id">Public:</label>        
                <input type="checkbox" id="isPublic" name="isPublic" value="1" ${checked}/>         
            </div>   
            <div>        
                <button type="submit">speichern</button>      
            </div>    
        </form>  
    </body>  
    </html>   
    `; } 