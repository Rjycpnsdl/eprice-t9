function itemSearch() {
  localStorage.setItem("search", document.getElementById('search').value);
  console.log(document.getElementById('search').value);
}

if (window.location.pathname === '/items') {
  if (localStorage.getItem("search") === null||localStorage.getItem("search").indexOf(' ') >=0||localStorage.getItem("search") === 'null') {
    fetch('api/v1/item').then(function(res) {
      res.json().then(function(items) {
        console.log('items', items);
        var tbody = document.getElementById('table-body');
        items.forEach(function(item) {
          // tbody.insertAdjacentHTML('beforeend', '<tr> <td>  <input type="checkbox" id="' + contact._id + '" />  </td>  <td>  <a href="/contacts/#' + contact._id + '">' + contact.name + '</a></td> <td> ' + contact.nickname + '</td> <td>' + contact.email + ' </td> </tr>');
          // tbody.insertAdjacentHTML('beforeend', '<li class="list-group-item"><a href="/items/'+item._id+'">'+item.product+'<p>'+ item.price +' '+ item.shop+' | '+item.description+ '</p></li>');
          tbody.insertAdjacentHTML('beforebegin', '<tr> <td> <a href="/profile/' + item._id + '"><img src=" ' + item.image + ' " height="100%" width="150%"></a> </td>  <td> ' + item.product + ' </td> <td> ' + item.price + ' </td> <td>' + item.shop + ' </td> <td>' + item.description + ' </td> <td> <input type="checkbox", id='+item._id+'></td> <td><a href="/items/'+item._id+'"> Edit </a>  </td> </tr>');

        });
      })
    });
    fetch('api/v1/item/count').then(function(res) {
        res.json().then(function(items) { 
          console.log('items', items);
          var count = document.getElementById('count');
            count.insertAdjacentHTML('beforeend', '<h1>Total number of items: '+items.count+'</h1>');
        
        })
      });
  }
  else{
    fetch('api/v1/item?query={"product":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
      res.json().then(function(items){
        if (items.length === 0) {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>No items found.</h1>');
        }
        else if (items.length === 1) {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>Found ' + items.length + ' item.</h1>');
        }
        else {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>Found '+items.length+' items.</h1>');
        }
        items.forEach(function(item) {
          document.getElementById('table-body').insertAdjacentHTML('beforebegin', '<tr> <td> <a href="/profile/'+item._id+'""><img src="'+item.image+'" height="100%" width="150%"></a> </td>  <td> ' + item.product + ' </td> <td> ' + item.price + ' </td> <td>' + item.shop + ' </td> <td>' + item.description + ' </td> <td> <input type="checkbox", id='+item._id+'></td> <td> <a href="/items/'+item._id+'"> Edit </a> </td> </tr>');
        });
        
      });
    });
    localStorage.setItem("search", null);

  }
}