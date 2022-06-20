function showReview(value, movId) {
    let str = "";
    for (let i = 1; i <= 5; i++) {
        str += `<a href="/rating/${movId}/${i}">`;
        if (value >= i) {
            str += "&#9733";
        } else {
            str += "&#9734";
        }
        str += "</a>";
    }
    return str;
}


export function render(movies) {     
    return ` 
    <!DOCTYPE html>
    <html lang="en">
    <head>  
        <meta charset="UTF-8">     
        <title>Movie list</title>  
        <link rel="stylesheet" href="style.css" />
    </head>
    <body>  
        <table>    
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>    
            <tbody>      
                ${ movies        
                    .map  (           
                        function(movie){ 
                                return (
                                    `<tr>    
                                        <td>${ movie.id }</td>          
                                        <td>${ movie.title }</td>
                                        <td>${ movie.year }</td>
                                        <td>${ showReview(movie.userRating, movie.id) }</td> 
                                        <td>${ movie.rating }</td>         
                                        <td><a href="/movie/delete/${ movie.id  }">löschen</a></td>          
                                        <td><a href="/movie/form/${ movie.id  }">bearbeiten</a></td> 
                                    </tr>`
                                )    
                        })         
                .join('')}     
            </tbody>  
        </table>  
        <a href="/movie/form">neu</a>
        <a href="/logout">abmelden</a>
    </body>
    </html>  
    `; 
} 